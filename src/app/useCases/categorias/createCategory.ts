import { Request, Response } from 'express';
import { Categoria } from '../../models/Categoria';

export async function createCategory(req:Request, res: Response) {
  try {
    const { name } = req.body;

    const categoria = await Categoria.create({name});

  res.json(categoria);
  } catch {
    const { name } = req.body;
    console.log('ô porra')
    res.send(`O item ${name} já existe caraio`)
  }
}