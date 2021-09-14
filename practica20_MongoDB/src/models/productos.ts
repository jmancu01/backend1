import mongoose from 'mongoose';
const { Schema } = mongoose;

const productosSchema = new Schema({
  nombre:  {type: String, required: true}, // String is shorthand for {type: String}
  precio: {type: Number, required: true}
});

export const producto = mongoose.model('productos', productosSchema);