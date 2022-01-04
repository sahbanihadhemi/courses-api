const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:1234@db.mhbax.mongodb.net/test-p?retryWrites=true&w=majority', 
{ useNewUrlParser :true, useUnifiedTopology : true})
        .then(()=> console.log('Mongo is UP'))
        .catch((err)=> console.log(`Mongo is Down, raison : ${err.message}`))