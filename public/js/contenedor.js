
const fs= require('fs');


class Contenedor {
constructor(archivo)
{
this.filename=archivo
}

save= async (producto)=>{
  try { //esta porqueria se rompe
    if( fs.existsSync(this.filename)){
        let result= await this.getAll()
        let lastId= result.reduce((acc, item)=> item.id>acc? acc=item.id: acc,0 )
        let newProduct={
            id: lastId+1,
            ...producto
        }
        result.push(newProduct)

        await fs.promises.writeFile(this.filename, JSON.stringify(result,null,2));
       return lastId+1
        }else{

    let newProduct={
        id:1,
        ...producto
    }
   await fs.promises.writeFile(this.filename,JSON.stringify([newProduct],null,2))
   return 0
  }
    } catch (error) {
    console.log(error);
  }


}
async getRandom(id){
    try {//usar el math.random para seleccion al azar cuando se ejecuta el getall se activa getRandom 
        const random = await this.getAll() ; 
        return random[Math.floor(Math.random() * random.length)]; 
    } catch (error) {
        throw new Error(`No puedo elegir :${error}`);
    }
}
getAll= async()=>{
    try {
        if( fs.existsSync(this.filename)){
        let result= await fs.promises.readFile(this.filename)
        return JSON.parse(result)}else{
          throw "No se encontro el archivo"
        }
         } catch (error) {
      console.log(error);
         }

    }
   

}



let contenedor= new Contenedor("Producto.txt")
let producto ={
    title:"Papitas",
    price:100,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto2 ={
    title:"zanahoria",
    price:300,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto3 ={
    title:"Tomates",
    price:200,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto4 ={
    title:"Berenjena",
    price:200,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto5 ={
    title:"brocoli",
    price:200,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto6 ={
    title:"lechuga",
    price:200,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}

metodos= async()=>{
 console.log("-----------------------Productos-------------------------------")
 await contenedor.save(producto)
 await contenedor.save(producto2)
 await contenedor.save(producto3)
 await contenedor.save(producto4)
 await contenedor.save(producto5)
 await contenedor.save(producto6)
 console.log(await contenedor.getAll());
 console.log("------------------------Producto Random------------------------------")
 console.log(await contenedor.getRandom());
 

 };
 

metodos()

