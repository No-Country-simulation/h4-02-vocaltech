import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/validateEnv";
import { RegisterUserDto, LoginUserDto } from "../dtos/authDtos";
import { AirtableResponse } from "../utils/airtableInterfaces"; 
import zxcvbn from "zxcvbn";
import { emailService } from "../services/emailService";

const fetch = require('node-fetch');

export const authService = {
  // Registro de usuario
  async registerUser(registerDto: RegisterUserDto): Promise<any> {
    const { AIRTABLE_API_KEY, usersTableUrl } = config;

    // Validamos la fortaleza de la contraseña
    const passwordStrength = zxcvbn(registerDto.password);
    if (passwordStrength.score < 3) {
      throw new Error("Password is too weak. Please choose a stronger password.");
    }

    // Comprobamos si el email ya está registrado
    const response = await fetch(usersTableUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch users from Airtable: ${errorText}`);
    }

    const data = (await response.json()) as AirtableResponse;

    const users = data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    const existingUser = users.find((user) => user.email === registerDto.email);
    if (existingUser) {
      throw new Error("Email is already registered.");
    }

    // Si no existe, procedemos a crear el nuevo usuario
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = {
      fields: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        phone: registerDto.phone,
        company: registerDto.company,
      },
    };

    const createResponse = await fetch(usersTableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Failed to register user in Airtable: ${errorText}`);
    }

    try {
      await emailService.sendWelcomeEmail(registerDto.email, registerDto.name);
      console.log(`Welcome email sent to ${registerDto.email}`);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error(`Failed to send welcome email: ${error}`);
    }    

    return await createResponse.json();
  },

  // Login de usuario
  async loginUser(loginDto: LoginUserDto): Promise<{ token: string; id: string }> {
    const { AIRTABLE_API_KEY, usersTableUrl, JWT_SECRET } = config;

    const response = await fetch(usersTableUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch users from Airtable: ${errorText}`);
    }

    const data = (await response.json()) as AirtableResponse;

    const users = data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    const user = users.find((u) => u.email === loginDto.email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, id: user.id };
  },
};






