import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/validateEnv";
import { RegisterUserDto, LoginUserDto } from "../dtos/authDtos";
import { AirtableResponse } from "../utils/airtableInterfaces"; 
const fetch = require('node-fetch');

export const authService = {
  async registerUser(registerDto: RegisterUserDto): Promise<any> {
    const { AIRTABLE_API_KEY, usersTableUrl } = config;

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

    const response = await fetch(usersTableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to register user in Airtable: ${errorText}`);
    }

    return await response.json();
  },

  async loginUser(loginDto: LoginUserDto): Promise<string> {
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

    return token;
  },
};






