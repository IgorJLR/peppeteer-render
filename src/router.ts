import { Router } from "express";
import { listCategories } from "./app/useCases/categorias/listCategories";
import { createCategory } from "./app/useCases/categorias/createCategory";
import { deleteCategory } from "./app/useCases/categorias/deleteCategory";

export const router = Router();


// List Categories
router.get('/categorias', listCategories)

// Create Category
router.post('/categorias', createCategory)

// Ambientes Por Categoria
router.get('/categorias/:id/ambientes', (req, res) => {
  res.send('Listando ambientes a partir da categoria')
})

// Remover Categoria
router.delete('/categorias/:id', deleteCategory)