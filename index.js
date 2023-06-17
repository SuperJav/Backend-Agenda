const express =require("express")
const app= express()
const cours= require("cors")
require("dotenv").config()
const mongoose=require("mongoose")
const Person=require("./models/person")

app.use(express.json())
app.use(cours())
 app.use(express.static('build'))
// //app.use(morgan)


//funcion que retorna con todoslos contactos
app.get("/api/persons/",(request,response)=>{
    Person.find({}).then(result=>{
      response.json(result)
    }).catch(error=>{
      console.log(error);
    })
})

//funcion que retorna con un conctato en particular
app.get("/api/persons/:id",(request,response)=>{
    
  Person.findById(request.params.id).then(person=>{
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error=>{
    console.log(error);
    response.status(400).send({ error: 'malformatted id' })
  })
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
  
    Person.findByIdAndRemove(request.params.id).then(result=>{
      response.status(204).end()
    }).catch(error=>{
      console.log(error);
    })
})
//Funcion para subir contacto
app.post("/api/persons/",(request,response)=>{
    const body=request.body
  
    if (body.name == "" || body.number == "") {
        return response.status(400).json({ 
          error: 'tiene algunos datos vacios' 
        })
    }
 
    const newPersons=new Person({
        name: body.name,
        number: body.number,
    })
    newPersons.save().then(sadPerson=>{
     return response.json(sadPerson)
    }).catch(error=>console.log(error))

})
app.put("/api/persons/:id",(request,response)=>{
    const body=request.body
    const newPersons={
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id,newPersons,{new:true}).then(updatedperson=>{
      response.json(updatedperson)
    }).catch(error=>{
      console.log(error);
    })
  
})


 const PUERTO=process.env.PORT

app.listen(PUERTO,()=>{
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})
