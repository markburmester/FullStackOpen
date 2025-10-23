const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://mburmester:${password}@fullstackopen.krotwd.mongodb.net/agendaApp?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery',false)

mongoose.connect(url)
const noteSchema = new mongoose.Schema({
        name: String,
        number: String,
    })
const Person = mongoose.model('Person', noteSchema)

if (process.argv[3] && process.argv[4]){
    const personName = process.argv[3]
    const personNumber = process.argv[4]
    

    const person = new Person({
        name: personName,
        number: personNumber,
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()    
    })
  
}

else{
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
        })
}



