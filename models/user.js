import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!']
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{1,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid, it should contain 6-16 alphanumeric letters and be unique!']
  },
  image: {
    type: String
  },
  superheroes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Superhero'
    }
  ],
  rank: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  totalBattle: {
    type: Number,
    default: 0
  },
  winsPercent: {
    type: Number,
    default: 0
  }
});

function arrayLimit(val) {
  return val.length <= 3;
}

UserSchema.methods.calcTotalBattle = function() {
  this.totalBattle = this.wins + this.losses;
  return this.totalBattle;
}

UserSchema.methods.caclWinsPercent = function() {
  this.winsPercent = ((this.wins / this.totalBattle) * 100).toFixed();
  return this.winsPercent;
}

// The "models" object is provided by the Mongoose library and stores all the registered models.
// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model
// The newly created model is then assigned to the user variable.

const User = models.User ||  model('User', UserSchema);

export default User;