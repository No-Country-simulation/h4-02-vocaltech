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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const validateEnv_1 = require("../config/validateEnv");
const fetch = require('node-fetch');
exports.userService = {
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, usersTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${usersTableUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to fetch user from Airtable: ${errorText}`);
            }
            // Explicitly cast the JSON response to `AirtableRecord`
            const user = (yield response.json());
            return user.fields || null;
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, usersTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${usersTableUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to delete user from Airtable: ${errorText}`);
            }
            return true;
        });
    },
    updateUserById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, usersTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${usersTableUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fields: data }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to update user in Airtable: ${errorText}`);
            }
            const updatedUser = (yield response.json());
            return updatedUser.fields;
        });
    },
    patchUserById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.findUserById(id);
            if (!existingUser) {
                throw new Error(`User with ID ${id} not found`);
            }
            const updatedData = Object.assign(Object.assign({}, existingUser), data);
            return this.updateUserById(id, updatedData);
        });
    },
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, usersTableUrl } = validateEnv_1.config;
            const response = yield fetch(usersTableUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fields: data }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to create user in Airtable: ${errorText}`);
            }
            const newUser = (yield response.json());
            return newUser;
        });
    },
};
