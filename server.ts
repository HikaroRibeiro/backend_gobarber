import express from 'express';

import './database';

const app = express();
app.use(express.json());

app.listen(3333,()=>{
    console.log('>>Server listen on 3333 port');
})