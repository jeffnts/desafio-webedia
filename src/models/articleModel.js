import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    subTitle:{
        type: String
    },
    permalink:{
        type: String,
        required: true,
        unique: true
    },
    publicationDate:{
        type: Date,
        default: Date.now()
    },
    updateDate:{
        type: Date,
        default: Date.now()
    },
    authors:[{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]    

})

articleSchema.plugin(mongoosePaginate)

export default  mongoose.model('Article', articleSchema) 