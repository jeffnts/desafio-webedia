import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'        
    },
    article:{
        type: Schema.Types.ObjectId,
        ref: 'Article',
        select: false
    }
})

commentsSchema.plugin(mongoosePaginate)

export default  mongoose.model('Comments', commentsSchema)