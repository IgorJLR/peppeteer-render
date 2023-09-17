import { Request, Response } from 'express';
import { Categoria } from '../../models/Categoria';

export async function listCategories(req:Request, res: Response) {
  const categorias = await Categoria.find();

  res.json(categorias);
}