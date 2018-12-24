/**
 * Mongoose schema for user object.
 * 
 * @return mongoose model that provide effective schema for User
 */
module.exports = app => {
  const mongoose = app.mongoose;

  const Schema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String },
    name: { type: String }, 
    address: { type: String },
    phone: { type: String }, 
    created_date: { type: Date, default: Date.now },
    status: { type: Number, default: 1 },
    likes: { type: Array } 
  });
  return mongoose.model("User", Schema);
};
