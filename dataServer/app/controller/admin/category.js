
const Controller = require('egg').Controller;

class CategoryController extends Controller {

  /**
 * @brief Bridge url from angular side and restapi side, convert url to ctx, and use async/await method to 
 * deal with funcitons chaining to the associated methods from service folder
 * 
 * @returns data: list of category objects
 *          message: success
 *          code: 0
 */

  /**
   * Creates a new category and return a JSON obejct
   * 
   * @param ctx: minimalist context resolver for Category
   * @param params: json data
   * @api {post} /api/admin/category/create create
   * @apiVersion 0.0.1
   * @apiGroup Category
   * @apiHeader {String} mw-token
   * @apiParamExample {json} Params:
      {
        "category_name": "test"
      }
   *@apiContentType application/json
   * @apiSampleRequest /api/admin/category/create
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

    await ctx.service.category.create(params);

    ctx.helper.success();
  }


    /**
   * Returns a list of categories in JSON
   * 
   * @param ctx: minimalist context resolver for Category
   * 
   * @api {get} /api/admin/category/list list
   * @apiVersion 0.0.1
   * @apiGroup Category
   * @apiContentType application/json
   * @apiSampleRequest /api/admin/category/list
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


    let data = await ctx.service.category.list();
    
    ctx.helper.success({data});
  }
  
}

module.exports = CategoryController;
