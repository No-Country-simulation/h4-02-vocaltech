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
exports.productController = void 0;
const productService_1 = require("../services/productService");
exports.productController = {
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield productService_1.productService.findProductById(id);
                if (!product) {
                    return res.status(404).json({
                        message: "Product not found",
                    });
                }
                return res.status(200).json({
                    message: "Product retrieved successfully",
                    product,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error fetching product by ID:", errorMessage);
                return res.status(500).json({
                    message: "Failed to fetch product",
                    error: errorMessage,
                });
            }
        });
    },
    deleteProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleted = yield productService_1.productService.deleteProductById(id);
                if (!deleted) {
                    return res.status(404).json({
                        message: "Product not found",
                    });
                }
                return res.status(200).json({
                    message: "Product deleted successfully",
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error deleting product:", errorMessage);
                return res.status(500).json({
                    message: "Failed to delete product",
                    error: errorMessage,
                });
            }
        });
    },
    editProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const productData = req.body;
                const updatedProduct = yield productService_1.productService.updateProductById(id, productData);
                return res.status(200).json({
                    message: "Product updated successfully",
                    product: updatedProduct,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error updating product:", errorMessage);
                return res.status(500).json({
                    message: "Failed to update product",
                    error: errorMessage,
                });
            }
        });
    },
    patchProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const productData = req.body;
                const updatedProduct = yield productService_1.productService.patchProductById(id, productData);
                return res.status(200).json({
                    message: "Product patched successfully",
                    product: updatedProduct,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error patching product:", errorMessage);
                return res.status(500).json({
                    message: "Failed to patch product",
                    error: errorMessage,
                });
            }
        });
    },
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                // Basic validation for required fields
                const requiredFields = [
                    "NameProduct",
                    "Description",
                    "Category",
                ];
                const missingFields = requiredFields.filter((field) => !productData[field]);
                if (missingFields.length > 0) {
                    return res.status(400).json({
                        message: `Missing required fields: ${missingFields.join(", ")}`,
                    });
                }
                // Create new product in Airtable
                const newProduct = yield productService_1.productService.createProduct(productData);
                return res.status(201).json({
                    message: "Product created successfully",
                    product: newProduct,
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unexpected error";
                console.error("Error creating product:", errorMessage);
                return res.status(500).json({
                    message: "Failed to create product",
                    error: errorMessage,
                });
            }
        });
    },
};
