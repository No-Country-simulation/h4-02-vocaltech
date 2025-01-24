import { Router } from "express";
import { productController } from "../controllers/productController";

const ProductRouter = Router();

// Route to get product by ID
ProductRouter.get("/:id", async (req, res) => {
  try {
    await productController.getProductById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in product route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to delete product by ID
ProductRouter.delete("/:id", async (req, res) => {
  try {
    await productController.deleteProductById(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error in product route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Route to edit product by ID
ProductRouter.put("/:id", async (req, res) => {
    try {
      await productController.editProductById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in product route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to patch product by ID (partial update)
ProductRouter.patch("/:id", async (req, res) => {
    try {
      await productController.patchProductById(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in product route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

// Route to create a new product
ProductRouter.post("/new", async (req, res) => {
    try {
      await productController.createProduct(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error in product route",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

export default ProductRouter;

