import { model, Schema } from 'mongoose';

export const Andar = model('Andar', new Schema({
  name: {
    type: String,
    required: true
  }
}))