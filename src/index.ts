import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';


mongoose.connect('mongodb://localhost:27017')
.then(()=> {
        const app = express();        
        const porta=4000;
        
        app.use(express.json())
        app.use(router)
        app.listen(porta, ()=>{
            console.log(`funcionou porra no http://localhost:${porta}`);
        })

    })
    .catch(()=> console.log('ô carai...'));



