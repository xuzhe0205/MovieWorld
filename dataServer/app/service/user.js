/**
 * Service for get, put and post operations for user.
 * 
 * @param ctx: minimalist context resolver for User
 * @param params: json data
 */

const Service = require('egg').Service;


class UserService extends Service {

    // register
    async register(params) {
        const { ctx } = this;
        const { password } = params
        if (password) {
            params.password = await ctx.genHash(password);
        }
        await ctx.model.User.create(params);
    }

    // user login
    async login({ email, password }) {
        const { ctx } = this;
        const user = await ctx.model.User.findOne({ email });
        if (!user) {
            ctx.throw(404, 'Email Error');
        }
        const verifyPsw = await ctx.compare(password, user.password);
        if (!verifyPsw) {
            ctx.throw(404, 'EmailAndPassword Error');
        }
        // send token
        return {
            token: await ctx.service.actionTokenService.applyAdmin(user),
            user
        };

    }

    async collecList() {
        const { ctx } = this;
        const user=await ctx.model.User.findOne({"email":"test@email.com"});
        return user.collect
    }

    // // get user info
    // async getUserinfo({_id} = {}){
    //     const { ctx } = this;
    //     if(!_id){
    //         _id = ctx.state.user._id
    //     }
    //     // let userInfo = await ctx.model.ProxyUser.findById(_id)
    //     // return userInfo
    // }

    async updatePassowrd({ password }) {
        const { ctx } = this;
        let pas = await ctx.genHash(password);
        const _id = ctx.state._id
        try {
          return await ctx.model.User.findOneAndUpdate(
            { _id },
            { password: pas }
          );
        } catch (error) {
          ctx.throw(501, "error");
        }
    }

    async update(params) {
        const { ctx } = this;
        const _id = ctx.state._id
        try {
          return await ctx.model.User.findOneAndUpdate(
            { _id},
            params
          );
        } catch (error) {
          ctx.throw(501, "error");
        }
    }
    //Get user according to id
    async getUser(_id){
      const {ctx} = this
      return await ctx.model.User.findById(_id);
    }



}

module.exports = UserService;