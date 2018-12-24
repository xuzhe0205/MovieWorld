/**
 * Mongoose schema for content object.
 * 
 * @return mongoose model that provide effective schema for Content
 */


module.exports = app => {
  const mongoose = app.mongoose;
  
  const Schema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // seperate id
    title: { type: String }, 
    description: { type: String }, 
    image: { type: String }, 
    score:{ type: String }, 
    created_date: { type: Date, default: Date.now },
    type: { type: Number, default: 0 }, 
    status: { type: Number, default: 1 }, 
  });
  return mongoose.model('Content', Schema);
};


