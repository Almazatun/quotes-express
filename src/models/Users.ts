import mongoose, {Schema, Document} from 'mongoose'


export interface IUser extends Document{
    _id?: Schema.Types.ObjectId
    userName: string
    email: string
    password: string
    createdAt: string
    _doc?: object
}

const UserSchema: Schema = new Schema({
    userName: String,
    email: String,
    password: String,
    createdAt: String,
})

export default mongoose.model<IUser>("User", UserSchema)