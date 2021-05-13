const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

const port = 3000

const app = express();
app.use(express.json());

//database connection with mongoose 

mongoose
.connect('mongodb://localhost/todos',{useNewUrlParser: true,
    useUnifiedTopology:true,})
.then(()=> console.log("connection successfull"))
.catch((err) => console.log(err));

//default error handling 
function errorHandler(err, req, res, next) {
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({error: err});
}
// routing 
app.use('/todo', todoHandler);

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`)
});