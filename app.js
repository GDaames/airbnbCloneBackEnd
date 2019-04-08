const express = require('express')

const app = express()

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const port = 3000 || process.env.port;

app.listen(port, () => console.log(`Server started on port ${port}`))


// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://root:B!tsplease@cluster0-pg4c8.mongodb.net/test?retryWrites=true', 
//     {useNewUrlParser: true },(err)=>
//     {
//         if(err) {
//             console.log('Some problem with the connection ' +err);
//         } else {
//             console.log('The Mongoose connection is ready');
//         }
//     });

// app.get('/', (req, res) => res.send('Hello World!'))
