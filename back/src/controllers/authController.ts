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
      // Manejo de errores específicos para las nuevas validaciones
      if (error instanceof Error) {
        if (error.message === "Password is too weak. Please choose a stronger password.") {
          return res.status(400).json({
            message: "Password is too weak.",
            error: error.message,
          });
        } else if (error.message === "Email is already registered.") {
          return res.status(400).json({
            message: "Email is already registered.",
            error: error.message,
          });
        }
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
      const { token, id } = await authService.loginUser(loginDto); // Desestructuramos el token y el id

      return res.status(200).json({
        message: "Login successful.",
        token,
        id, // Incluimos el id en la respuesta
      });
    } catch (error) {
      // Manejo de errores específicos para login
      if (error instanceof Error) {
        if (error.message === "Invalid email or password.") {
          return res.status(401).json({
            message: "Invalid credentials.",
            error: error.message,
          });
        }
        console.error("Error logging in user:", error.message);
        return res.status(500).json({
          message: "Failed to login.",
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








