const express =require("express")
const app= express()
const cours= require("cors")

app.use(express.static('build'))
app.use(express.json())
app.use(cours())

//app.use(morgan)



const persons={
    "persons": [
      {
        "name": "ramirez",
        "number": "333333",
        "id": 7
      },
      {
        "name": "javier",
        "number": "829-34-5432",
        "id": 8
      },
      {
        "name": "carlo",
        "number": "829-2344-4322",
        "id": 9
      }
    ]
  }
   //Metodo que crea un id 
   const generateId = () => {
    const maxId = persons.persons.length > 0
      ? Math.max(...persons.persons.map(n => n.id))
      : 0
    return maxId + 1
  }

// // funcion que retorna un saludo
// app.get("/",(request,response)=>{
//     response.send("<h1>Bienvenido</h1>")
// })
//funcion que retorna con todoslos contactos
app.get("/api/persons/",(request,response)=>{
    response.send(persons)
})

//funcion que retorna con un conctato en particular
app.get("/api/persons/:id",(request,response)=>{
    const id= Number(request.params.id)
   const result= persons.persons.find(index=> index.id == id)

   if (result) {
    response.json(result)
   }else{
    //response.send("<h1>No existe este contancto con ID</h1>")
    response.status(404).end()
   }
})

//funcion que tetorna informacion hacerca de cuantos contacto hay 
app.get("/info",(request,response)=>{
    const info={
        time:new Date(),
        total:`La agenda tiene información para ${persons.persons.length} personas`
    }
  response.send(`<h2>${info.total}</h2><h2>${info.time}</h2>`)
})

//funcion que elimina un contacto 
app.delete("/api/persons/:id",(request,response)=>{
    const id =Number(request.params.id)

    persons.persons= persons.persons.filter(person=>person.id!==id)
    response.status(204).end()
})
//Funcion para subir contacto
app.post("/api/persons/",(request,response)=>{
    const body=request.body
    const find= persons.persons.find(person=>person.name==body.name)

    if (!body.name && !body.number) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
    }
    if (typeof find === 'object') {
        return response.status(400).json({
            error: 'Este contacto ya existe!!'
        })
    }
    const newPersons={
        name: body.name,
        number: body.number,
        id: generateId()
    }
   persons.persons= persons.persons.concat(newPersons)
    response.json(newPersons)
})
app.put("/api/persons/:id",(request,response)=>{
    const body=request.body
    const filter= persons.persons.filter(index=>index.name!==request.body.name)
    const newPersons={
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons.persons=filter.concat(newPersons)
    // response.json({
    //     saludo:"actualizado",
    //     id:request.params.id,
    //     body:request.body
    // })
})








const PUERTO=process.env.PORT||3002

app.listen(PUERTO,()=>{
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})
