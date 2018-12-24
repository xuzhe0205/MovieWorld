const Controller = require('egg').Controller;

class UserController extends Controller {

  /**
    * @brief Bridge url from angular side and restapi side, convert url to ctx, and use async/await method to 
    * deal with funcitons chaining to the associated methods from service folder
    * 
    * @returns data: list of user objects
    *          message: success
    *          code: 0
    */

  /** 
   * Create a new user and return a user JSON object
   * 
   * @param ctx: minimalist context resolver for User
   * @param params: json data
   * 
   * @api {post} /api/admin/user/register register
   * @apiVersion 0.0.1
   * @apiGroup User
   * @apiParamExample {json} Params:
      {
        "email":"test@email.com",
        "password":"test",
        "name":"testname",
        "address":"test",
        "phone":"1333333"
      }
   * @apiContentType application/json
   * @apiSampleRequest  /api/admin/user/register
   * @apiSuccess {Number} code
   * @apiSuccess {Object[]} data
   * @apiSuccess {String} message
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
      {
        "code": 0,
        "data": null,
        "message": "success"
    }

   */
  async register() {
    const { ctx } = this;
    const params = ctx.request.body
    const data = await ctx.service.user.register(params);

    ctx.helper.success({data});
  }

  /** 
   * Returns a list of like collection
   * 
   * @param ctx: minimalist context resolver for User
   */ 
  async collecList() {
    const { ctx } = this;

    let data = await ctx.service.user.collecList();

    ctx.helper.success({data});
  }

  /**
   * Generates a user obejct based on parameters of login
   * 
   * @param ctx: minimalist context resolver for User
   * @param params: json data
   *
   * @api {post} /api/admin/login login
   * @apiVersion 0.0.1
   * @apiGroup User
   * @apiParamExample {json} Params:
      {
        "email":"test@email.com",
        "password":"test"
      }
   * @apiContentType application/json
   * @apiSampleRequest  /api/admin/login
   * @apiSuccess {Number} code
   * @apiSuccess {Object[]} data
   * @apiSuccess {String} message
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
      {
        "code": 0,
        "data": {
            "token": "xxxx",
            "user": {
                "user_name": "wenquan",
            }
        },
        "message": "success"
    }

   */
  async login() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = await ctx.service.user.login(params);
    ctx.cookies.set('mw-token', data.token);
    ctx.helper.success({ data });
  }
  /** 
   * Updates and returns a user object in JSON
   * 
   * @param ctx: minimalist context resolver for User
   * @param params: json data
   */ 
  async update() {
    const { ctx } = this;
    let params = ctx.request.body;
    params._id = ctx.params._id;
    const data = await ctx.service.user.update(params);

    ctx.helper.success();
  }

 /**
   * Updates password for specific user by specific id and returns a user object in JSON
   * 
   * @param ctx: minimalist context resolver for User
   * @param params: json data
   * 
   * @api {post} /api/admin/user/updatePassowrd updatePassword
   * @apiVersion 0.0.1
   * @apiGroup User
   * @apiHeader {String} mw-token
   * @apiParamExample {json} Params:
      {
        "password":"123456"
      }
   *@apiContentType application/json
   * @apiSampleRequest /api/admin/user/updatePassowrd
   * @apiSuccess {Number} code
   * @apiSuccess {Object[]} data
   * @apiSuccess {String} message
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
      {
          "code": 0,
          "message": "success",
          "data": null
      }
   */
  async updatePassowrd() {
    const { ctx } = this;
    let params = ctx.request.body;
    params._id = ctx.params._id;
    const data = await ctx.service.user.updatePassowrd(params);

    ctx.helper.success({data});
  }
}

module.exports = UserController;