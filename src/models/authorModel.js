import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const authorSchema = new Schema({
    name:{
        type: String,
        required: true
    }
    
})

authorSchema.plugin(mongoosePaginate)

export default  mongoose.model('Author', authorSchema)