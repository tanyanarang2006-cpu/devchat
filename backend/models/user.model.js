import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[6,'Email must be 6 char long'],
        maxlength:[50,'Email must not be longer than 50 char']
    },

    password:{
        type:String,
        required:true,
        minlength:[3,'Password must be at least 3 characters long'],
        maxlength:[100,'Password must not be longer than 100 char'],
        select:false
    }
});

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generatejwt = function(){
    return jwt.sign({email:this.email},
        process.env.JWT_SECRET,
    {expiresIn:'24h'});
}

const userModel = mongoose.model('User', userSchema);
export default userModel;


