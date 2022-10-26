
const http = require("http")
const express = require('express');
const productos = require('./public/js/contenedor.js');
const path = require("path");
const app = express();
const server = http.createServer(app)
app.set("port",process.env.PORT|| 8080);
app.listen(app.get("port"),()=> {
  console.log("Server Running in Port " + app.get("port") )
});
//-----------------------------------------------------------------

app.get("/", (req , res) =>{
  res.sendFile(__dirname + '/public/index.html');
});



app.get('./public/js/Producto', async (req, res) => {
  const prods = await productos.getAll()
  res.send(prods)
})

app.get('./public/js/productoRandom', async (req, res) => {
  const prods = await productos.getAll()
  const random = parseInt(Math.random() * prods.length)
  res.send(prods[random])
})



app.get('/public/js/producto.txt/:id', (req,res)=>{
  let id = req.params.id 
  
  id.findById(id,(error, id) => {
    if (error) return res.status(500).send;{message:`error al realizar la peticion:${error}`};
    if (!id) return res.status(404).send;{message:`El producto no existe`};

    res.status(200).send({id});

  });
});

app.post('/api/prodict',(req,res)=>{
  console.log('POST /api/id')
  console.log(req.body)

})
 






















