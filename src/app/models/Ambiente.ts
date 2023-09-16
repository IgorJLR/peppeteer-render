import { model, Schema } from 'mongoose';




export const Ambiente = model('Ambiente', new Schema({
    nome: {
        required: true,
        type: [{
            nomes: {
                required: true,
                type: String,
                nomes: []
            }
        }],
        latitude: {
            type: Number,
            required: false,
        },
        longitude: {
            type: Number,
            required: false,
        },
        descricao: {
            type: String,
            required: false,
        },
        categoria: {
            type: String,
            enum: ['sala', 'escritorio', 'auditorio', 'banheiro', 'bloco', 'sem categoria'],
        },
        andar: {
            type: String,
            enum: ['terreo', 'primeiro', 'segunda', 'terceiro'],
        },
        bloco: {
            type: String,
            enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'sem bloco'],
        },
        imagens: {
            required: false,
            type: String,
            nomes: []
        },
        turmas: {
            required: false,
            type: Array,
            turmas: [{
                turma: {
                    type: String,
                    required: false,
                },
                disciplinas: {
                    required: false,
                    type: String,
                    disciplinas: [{
                        nome: {
                            type: String,
                            required: true,
                        },
                        horario: {
                            type: String,
                            required: false,
                        },
                        diaSemana: {
                            type: String,
                            required: false,
                        },
                        professores: {
                            required: false,
                            type: String,
                            nomes: []
                        }
                    }]
                },
            }
            ]
        }
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


