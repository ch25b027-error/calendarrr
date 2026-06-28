import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter the email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  username: {
    type: String,
    required: [true, 'Please enter the username']
  },
  password: {
    type: String,
    required: [true, 'Please enter the password'],
    minlength: [6, 'Minimum length of a valid password is 6 char']
  }
});

// userSchema.pre('save', async function() {
//   // If the password hasn't been changed (like if they are just updating their username), skip hashing!
//   if (!this.isModified('password')) {
//     return ;
//   }

//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
  
}

export default mongoose.model('User', userSchema);