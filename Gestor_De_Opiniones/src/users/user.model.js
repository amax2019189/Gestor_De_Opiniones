import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "The name is required"],
    },
    email: {
        type: String,
        require: [true, "Email is mandatory"],
        unique: true,
    },
    password: {
        type:String,
        require: [true, "Password is required"],
    },
    state: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function(){
    const { _v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);