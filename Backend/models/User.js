const { default: mongoose } = require("mongoose");
const bcrypt= require('bcrypt')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age : Number,
    password : String,
    role: String
});

//Hash password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try{
    const salt=await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt);
    next();
    } catch(err){
    next(err);
    }
})

//Compare password
userSchema.methods.comparePassword= async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);

