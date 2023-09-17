import { model, Schema } from 'mongoose';

export const Bloco = model('Bloco', new Schema ({
  name: {
    type: String,
    required: true
  },
  poligono: {
    a: Number,
    b: Number,
    c: Number,
    d: Number
  }
}))