const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI

mongoose.connect(url)
const noteSchema = new mongoose.Schema({
        name: {
          type: String,
          minLength: 3,
          required: true
        },
        number: {
          type: String,
          required: true,
          minLength: 8,
          validate: {
            validator: function(v) {
              return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} no es un número de teléfono válido (debe ser del tipo XX-XXXXXXX o XXX-XXXXXXX)`
          }
        }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)