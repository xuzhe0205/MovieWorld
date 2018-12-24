const Controller = require('egg').Controller;

class ContentController extends Controller {

  /**
   * @brief Bridge url from angular side and restapi side, convert url to ctx, and use async/await method to 
  * deal with funcitons chaining to the associated methods from service folder
  * 
  * @returns data: list of ccontent objects
  *          message: success
  *          code: 0
  *
   */

   /**
   * Create a new content and return a movie content JSON object
   * 
   * @param ctx: minimalist context resolver for Content
   * @param params: json data
   * 
   * @api {post} /api/admin/content/create create
   * @apiVersion 0.0.1
   * @apiGroup Content
   * @apiParamExample {json} Params:
      {
        "category_id": "5bfe651bc696aa6e6d428f11",
        "title": "test",
        "description": "test",
        "image": "test",
        "score":8.7,
        "type": 1
      }
   *@apiContentType application/json
   * @apiSampleRequest /api/admin/content/create
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
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    
    await ctx.service.content.create(params);

    ctx.helper.success();
  }


  /**
   * Returns a list of contents in JSON based on query
   * 
   * @param ctx: minimalist context resolver for Content
   * @param params: json data
   * @api {get} /api/admin/content/list list
   * @apiVersion 0.0.1
   * @apiGroup Content
   * @apiContentType application/json
   * @apiSampleRequest /api/admin/content/list
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
  async list() {
    const { ctx } = this;
    const params = ctx.request.query;
    let data = await ctx.service.content.list(params);

    ctx.helper.success({data});
  }

  /**
   * Returns a detail content in JSON based on query
   * 
   * @param ctx: minimalist context resolver for Content
   * @param params: json data
   * 
   */
  //Get selected item's id....
  async details(){
    const { ctx } = this;
    const params = ctx.request.query;
    let data = await ctx.service.content.details(params);
    ctx.helper.success({data});
  }

  /**
   * Returns a detail content in JSON based on search parameter
   * 
   * @param ctx: minimalist context resolver for Content
   * @param params: json data
   */
  async search(){
    const{ctx}=this;
    const params = ctx.request.query;
    let data = await ctx.service.content.search(params);
    ctx.helper.success({data});
  }
}

module.exports = ContentController;