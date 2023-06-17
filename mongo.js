const mongoose=require("mongoose")

if (process.argv.length<3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password=process.argv[2]


//tube un gran problema y es que no me permitia enviar los datos a la base de dato, la unica forma de solucionar eso era cmbiado la version del node
const url=`mongodb://JaviSuper24:${password}@ac-xudxrok-shard-00-00.dyyqrvp.mongodb.net:27017,ac-xudxrok-shard-00-01.dyyqrvp.mongodb.net:27017,ac-xudxrok-shard-00-02.dyyqrvp.mongodb.net:27017/agenda?ssl=true&replicaSet=atlas-fztxbf-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(url) .then(() => {
  console.log("La conexión a la base de datos está activa");
  // Continuar con el resto de tu código
})
.catch((error) => {
  console.error("Error al conectar a la base de datos:", error);
});

//Condicion para agregar un contacto  
if (process.argv.length == 5) {
  
  const personSchema=new mongoose.Schema({
    name:String,
    number:String,
  })
  const Person=mongoose.model("Person",personSchema)

  const newPerson=new Person({
    name:process.argv[3],
    number:process.argv[4],
  })

  newPerson.save().then(result=>{
    console.log("added", result,"to Phonebook");
    mongoose.connection.close()
  }).catch(error=>
    console.log(error))
}


//Condicionn para devolver todos los contacto
if (process.argv.length == 3) {
  const personSchema=new mongoose.Schema({
    name:String,
    number:String,
  })
  const Person=mongoose.model("Person",personSchema)
  Person.find({}).then(result=>{
    result.forEach(index=>{
      console.log(index)
    })
    mongoose.connection.close()
  })
}