//Datos que vamos a guardar en Mongo DB, estructura o tabla.
// CRUD/src/models/user.model.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: [cartItemSchema],
    default: []
  },
  //role administrador
  //role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Campo role añadido
  //admin
  //isAdmin: {
  //  type: Boolean,
  //  default: false // Campo para indicar si el usuario es administrador
  //}
});

const User = mongoose.model('User', userSchema);

export default User;
