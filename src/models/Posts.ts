import mongoose, {Schema, Document} from 'mongoose'

export interface IPost extends Document {
    _id: Schema.Types.ObjectId
    postTitle: string
    body: string
    userName: string
    createdAt: string
    user: string
}

const PostsSchema: Schema = new Schema({
    postTitle: String,
    body: String,
    userName: String,
    createdAt: String,
    user: String
})

export default mongoose.model<IPost>('Post', PostsSchema)