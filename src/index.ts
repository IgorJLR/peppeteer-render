import express from 'express';
import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017')
.then(()=> {
        const app = express();        
        const porta=3001;
        
        app.listen(porta, ()=>{
            console.log(`funcionou porra no http://localhost:${porta}`);
        })

    })
    .catch(()=> console.log('ô carai...'));



