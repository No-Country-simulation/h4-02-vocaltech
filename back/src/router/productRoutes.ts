import { Router } from "express";
import { productController } from "../controllers/productController";

const ProductRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for product management
 */

/**
 * Error handling middleware for async routes
 */
const handleRouteError = (res: any, error: unknown) => {
    res.status(500).json({
      message: "Unexpected error in user route",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  };

// Route to get product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             NameProduct: "OPTIMIZACION DE RECURSOS Y CAPITAL test"
 *             Description: "Al desarrollar un MVP en vez de un producto terminado, las empresas pueden llevar a cabo su idea de negocio con una inversión de tiempo y capital mínima. Pudiendo identificar rápidamente mejoras y ajustes, si es necesario, antes de invertir grandes cantidades de recursos."
 *             Status: "ACTIVO"
 *             Category: ["TECH"]
 *             Question1: ["Insights e ideas alternativas","Developers junior calificados"]
 *             Question2: ["Identificar talento técnico y recursos de capital"]
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Partially update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             NameProduct: "OPTIMIZACION DE RECURSOS Y CAPITAL test"
 *             Description: "Al desarrollar un MVP en vez de un producto terminado, las empresas pueden llevar a cabo su idea de negocio con una inversión de tiempo y capital mínima. Pudiendo identificar rápidamente mejoras y ajustes, si es necesario, antes de invertir grandes cantidades de recursos."
 *             Status: "ACTIVO"
 *             Category: ["TECH"]
 *             Question1: ["Insights e ideas alternativas","Developers junior calificados"]
 *             Question2: ["Identificar talento técnico y recursos de capital"]
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /api/products/new:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             NameProduct: "OPTIMIZACION DE RECURSOS Y CAPITAL test"
 *             Description: "Al desarrollar un MVP en vez de un producto terminado, las empresas pueden llevar a cabo su idea de negocio con una inversión de tiempo y capital mínima. Pudiendo identificar rápidamente mejoras y ajustes, si es necesario, antes de invertir grandes cantidades de recursos."
 *             Status: "ACTIVO"
 *             Category: ["TECH"]
 *             Question1: ["Insights e ideas alternativas","Developers junior calificados"]
 *             Question2: ["Identificar talento técnico y recursos de capital"]
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
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

