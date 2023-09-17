import { model, Schema } from 'mongoose';

export const Ambiente = model('Ambiente', new Schema({
    nome: {
        type: String,
        required: true
    },
    nomesAlt: [{
        nome: {
            type: String,
            required: true
        }
    }],
    latitude: {
        type: String,
        required: false,
    },
    longitude: {
        type: String,
        required: false,
    },
    descricao: {
        type: String,
        required: false,
    },
    imagens: [{
        path: {
            type: String,
            required: false
        }
    }],
    turmas: [{
        nome: {
            type: String,
            required: true
        },
        disciplinas: [{
            nome: String,
            horario: String,
            diaSemana: String,
            professores: [{
                nome: {
                    type: String,
                    required: true
                }
            }]
        }],
    }],
    bloco: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Bloco'
    },
    categoria: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Categoria'
    }
}))




// export const Ambiente = model('Ambiente', new Schema({
//     name:{
//         type: String,
//         required: true,
//     },
//     icon:{
//         type: String,
//         required: true,
//     },
//     turmas:{
//         required: true,
//         type:[{
//             name:{
//                 type: String,
//                 required: true,
//             },
//             aaaa:{
//                 type: String,
//                 required: true,
//             }
//         }]
//     },
//     status:{
//         type: String,
//         enum: ['Ô DEMORA', 'TA SAINDO CHEFIA', 'TA PRONTO VISSE'],
//     }


