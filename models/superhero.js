import { Schema, model, models } from 'mongoose';

const SuperheroSchema = new Schema({
  id: {
    type: String,
    unique: [true, 'ID needs to be unique!'],
    required: [true, 'ID is required!']
  },
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  image: {
    url: {
      type: String,
      required: [true, 'Image is required!']
    }
  },
  appearance: {
    race: String,
    gender: String,
    'hair-color': String,
    'eye-color': String,
    height: Array,
    weight: Array
  },
  biography: {
    'full-name': String,
    alliases: Array,
    alignment: String,
    'alter-egos': String,
    'first-appearance': String,
    'place-of-birth': String,
    publisher: String
  },
  powerstats: {
    combat: String,
    durability: String,
    intelligence: String,
    power: String,
    speed: String,
    strength: String
  },
  connections: {
    'group-affiliation': String,
    relatives: String
  },
  work: {
    base: String,
    occupation: String
  }
});

const Superhero = models.Superhero || model('Superhero', SuperheroSchema);

export default Superhero;