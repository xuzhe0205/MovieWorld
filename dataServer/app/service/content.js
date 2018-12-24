/**
 * Service for post, get and put operations for content.
 * 
 * @param ctx: minimalist context resolver for Content
 * @param params: json data
 */

const Service = require('egg').Service;


class CService extends Service {

  // create content
  async create(params) {
      const { ctx } = this;
      await ctx.model.Content.create(params);
  }
  // content list
  async list({type = 1, category_id}) {
      let params = {
          type
      }
      if(category_id){
          params.category_id = category_id
      }
      const { ctx } = this;
      return await ctx.model.Content.find(params);
  }
  
//get selected item detail 
async details({type = 1, _id}){
  let params = {
    type
  }
  if(_id){
    params._id = _id
  }
  const { ctx } = this;
  return await ctx.model.Content.find(params);
}



    //Get login user's like list array
    async likeList(){
      const { ctx,app } = this;
      const _id = ctx.state._id
      console.log("likelist _id:"+_id)
      //Get user according to id
      const userLogin = await ctx.service.user.getUser(_id)
      //console.log("contentService:"+user)
      //Get this user's like list
      const likes = userLogin.likes
      //Get all movie items in user's like list
      //Find movies in content collection, which in this's users like list
      const result=await ctx.model.Content.find({_id:{ "$in": likes }});
      return result;

  }

  async search(title){
    const {ctx} = this
    return await ctx.model.Content.find(title);
  }


}

module.exports = CService;