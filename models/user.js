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
        required: true,
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
})

module.exports = model('User', userSchema);