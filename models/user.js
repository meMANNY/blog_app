const {createHmac,randomBytes} = require('crypto');

const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
    
    },
    password:{
        type: String,
        required: true,
    
    },
    profileImage:{
        type: String,
        default: "default.jpg",
    },
    role:{
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    }

},{timestamps: true});

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return ;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
});

userSchema.static("matchPassword", async function(email,password){
    const user = await this.findOne({email});

    if(!user) return false;

    const salt = user.salt;
    const hashedPassword = user.password;

    const ProvidedhashedPassword = createHmac('sha256',salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== ProvidedhashedPassword) return false; 
    return {...user,password: undefined,salt: undefined};
})

module.exports = model('User', userSchema);