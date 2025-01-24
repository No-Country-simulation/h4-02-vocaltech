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
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const ProductRouter = (0, express_1.Router)();
// Route to get product by ID
ProductRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productController_1.productController.getProductById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in product route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to delete product by ID
ProductRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productController_1.productController.deleteProductById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in product route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to edit product by ID
ProductRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productController_1.productController.editProductById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in product route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to patch product by ID (partial update)
ProductRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productController_1.productController.patchProductById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in product route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
// Route to create a new product
ProductRouter.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productController_1.productController.createProduct(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error in product route",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
exports.default = ProductRouter;
