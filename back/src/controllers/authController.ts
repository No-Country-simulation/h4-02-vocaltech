import { Request, Response } from "express";
import { authService } from "../services/authService";
import { RegisterUserDto, LoginUserDto } from "../dtos/authDtos";

export const authController = {
  // Controlador para registrar un usuario
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const registerDto: RegisterUserDto = req.body;
      const newUser = await authService.registerUser(registerDto);
      return res.status(201).json({
        message: "User registered successfully.",
        user: newUser,
      });
    } catch (error) {
      // Manejo explícito del tipo de error
      if (error instanceof Error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({
          message: "Failed to register user.",
          error: error.message,
        });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({
          message: "An unexpected error occurred.",
        });
      }
    }
  },

  // Controlador para loguear un usuario
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginDto: LoginUserDto = req.body;
      const token = await authService.loginUser(loginDto);
      return res.status(200).json({
        message: "Login successful.",
        token,
      });
    } catch (error) {
      // Manejo explícito del tipo de error
      if (error instanceof Error) {
        console.error("Error logging in user:", error.message);
        return res.status(401).json({
          message: "Invalid credentials.",
          error: error.message,
        });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({
          message: "An unexpected error occurred.",
        });
      }
    }
  },
};







