"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateEnv_1 = require("../config/validateEnv");
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const fetch = require('node-fetch');
exports.authService = {
    // Registro de usuario
    registerUser(registerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, usersTableUrl } = validateEnv_1.config;
            // Validamos la fortaleza de la contraseña
            const passwordStrength = (0, zxcvbn_1.default)(registerDto.password);
            if (passwordStrength.score < 3) {
                throw new Error("Password is too weak. Please choose a stronger password.");
            }
            // Comprobamos si el email ya está registrado
            const response = yield fetch(usersTableUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to fetch users from Airtable: ${errorText}`);
            }
            const data = (yield response.json());
            const users = data.records.map((record) => (Object.assign({ id: record.id }, record.fields)));
            const existingUser = users.find((user) => user.email === registerDto.email);
            if (existingUser) {
                throw new Error("Email is already registered.");
            }
            // Si no existe, procedemos a crear el nuevo usuario
            const hashedPassword = yield bcryptjs_1.default.hash(registerDto.password, 10);
            const newUser = {
                fields: {
                    name: registerDto.name,
                    email: registerDto.email,
                    password: hashedPassword,
                    phone: registerDto.phone,
                    company: registerDto.company,
                },
            };
            const createResponse = yield fetch(usersTableUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (!createResponse.ok) {
                const errorText = yield createResponse.text();
                throw new Error(`Failed to register user in Airtable: ${errorText}`);
            }
            return yield createResponse.json();
        });
    },
    // Login de usuario
    loginUser(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, usersTableUrl, JWT_SECRET } = validateEnv_1.config;
            const response = yield fetch(usersTableUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to fetch users from Airtable: ${errorText}`);
            }
            const data = (yield response.json());
            const users = data.records.map((record) => (Object.assign({ id: record.id }, record.fields)));
            const user = users.find((u) => u.email === loginDto.email);
            if (!user) {
                throw new Error("Invalid email or password.");
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid email or password.");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
            return token;
        });
    },
};
