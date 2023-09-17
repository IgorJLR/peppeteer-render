import { model, Schema } from 'mongoose';

export const Categoria = model('Categoria', new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDubs: true
  }

}))