import { Request, Response } from "express";
import { productService } from "../services/productService";
import Product, { ProductFields } from "../models/Product";

export const productController = {
  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await productService.findProductById(id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      return res.status(200).json({
        message: "Product retrieved successfully",
        product,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error fetching product by ID:", errorMessage);

      return res.status(500).json({
        message: "Failed to fetch product",
        error: errorMessage,
      });
    }
  },

  async deleteProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await productService.deleteProductById(id);

      if (!deleted) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error deleting product:", errorMessage);

      return res.status(500).json({
        message: "Failed to delete product",
        error: errorMessage,
      });
    }
  },

  async editProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const productData = req.body;

      const updatedProduct = await productService.updateProductById(id, productData);

      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error updating product:", errorMessage);

      return res.status(500).json({
        message: "Failed to update product",
        error: errorMessage,
      });
    }
  },

  async patchProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const productData = req.body;

      const updatedProduct = await productService.patchProductById(id, productData);

      return res.status(200).json({
        message: "Product patched successfully",
        product: updatedProduct,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error patching product:", errorMessage);

      return res.status(500).json({
        message: "Failed to patch product",
        error: errorMessage,
      });
    }
  },

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productData: ProductFields = req.body;

      // Basic validation for required fields
      const requiredFields: (keyof ProductFields)[] = [
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
      const newProduct = await productService.createProduct(productData);

      return res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error";
      console.error("Error creating product:", errorMessage);

      return res.status(500).json({
        message: "Failed to create product",
        error: errorMessage,
      });
    }
  },


};
