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
exports.productService = void 0;
const validateEnv_1 = require("../config/validateEnv");
const fetch = require('node-fetch');
exports.productService = {
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, productsTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${productsTableUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to fetch product from Airtable: ${errorText}`);
            }
            // Explicitly cast the JSON response to `AirtableRecord`
            const product = (yield response.json());
            return product.fields || null;
        });
    },
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, productsTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${productsTableUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to delete product from Airtable: ${errorText}`);
            }
            return true;
        });
    },
    updateProductById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, productsTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${productsTableUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fields: data }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to update product in Airtable: ${errorText}`);
            }
            const updatedProduct = (yield response.json());
            return updatedProduct.fields;
        });
    },
    patchProductById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield this.findProductById(id);
            if (!existingProduct) {
                throw new Error(`Product with ID ${id} not found`);
            }
            const updatedData = Object.assign(Object.assign({}, existingProduct), data);
            return this.updateProductById(id, updatedData);
        });
    },
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, productsTableUrl } = validateEnv_1.config;
            const response = yield fetch(productsTableUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fields: data }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to create product in Airtable: ${errorText}`);
            }
            const newProduct = (yield response.json());
            return newProduct;
        });
    },
};
