import mongoose from 'mongoose';

//el nombre de la collection es message dentro de database ecommerce
const msgCollectionName = 'message';

const messageSchema = new mongoose.Schema({ //un mesaje va a estar definido asi
  author: {       //author va a tener definidas estas propiedades
    email: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
  },
  text: { type: String, required: true, max: 1000 },
});

export const messageModel = mongoose.model(msgCollectionName, messageSchema);
