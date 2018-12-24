/**
 * Mongoose schema for category object.
 * 
 * @return mongoose model for effective schema for Category
 */

module.exports = app => {
    const mongoose = app.mongoose;

    const Schema = new mongoose.Schema({
        category_name: { type: String}, 
        created_date: { type: Date, default: Date.now },
        status: { type: Number, default: 1 }
    });
    return mongoose.model('Category', Schema);
};
