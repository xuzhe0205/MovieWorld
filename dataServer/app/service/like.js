/**
 * Service for get, put, post and delete operations for like.
 * 
 * @param ctx: minimalist context resolver for Like
 * @param params: json data
 */

"use strict";

const Service = require("egg").Service;

class LikeService extends Service {
  async create(params) {
    const { ctx, app } = this;
    const _id = ctx.state._id;
    try {
      return await ctx.model.User.findOneAndUpdate(
        { _id },
        { $addToSet: { likes: app.mongoose.Types.ObjectId(params._id) } }
      );
    } catch (error) {
      ctx.throw(501, "error");
    }
  }
// Remove particular movie in user's like list
  async remove(params) {
    const { ctx, app } = this;
    
    const _id = ctx.state._id;
    console.log("remove in like service:"+_id)
    try {
      return await ctx.model.User.findOneAndUpdate(
      //Filter by id
        { _id },
        //Remove the movie in user's like list(Update operation)
        //In user's likes field, whose value equals this ObjectId, who will be removed
        { $pull: { likes: app.mongoose.Types.ObjectId(params._id) } }
      );
      //In case of the operation exceeds the time limit
    } catch (error) {
      ctx.throw(501, "error");
    }
  }
//Get user based on the user's id, and get this users' like list
async listIds() {
  const { ctx, app } = this;
  const _id = ctx.state._id;
  const user = await ctx.service.user.getUser(_id);
  const likes = user.likes;
  return likes;
}
  
}

module.exports = LikeService;
