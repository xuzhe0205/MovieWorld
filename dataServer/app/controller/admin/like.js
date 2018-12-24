'use strict';

const Controller = require('egg').Controller;

class LikeController extends Controller {
  /** 
   * @brief Bridge url from angular side and restapi side, convert url to ctx, and use async/await method to 
   * deal with funcitons chaining to the associated methods from service folder
   * 
   * 
   * @returns data: list of like objects
   *          message: success
   *          code: 0
   */


   /**
   * Create a new like item and return a like JSON object
   * 
   * @param ctx: minimalist context resolver for Like
   * @param params: json data
   * 
   * @api {post} /api/admin/like/create like
   * @apiVersion 0.0.1
   * @apiGroup Like
   * @apiParamExample {json} Params:
      {
        "_id":"5bff5eae0463457b8f0afabb"
      }
   * @apiContentType application/json
   * @apiHeader {String} mw-token
   * @apiSampleRequest /api/admin/like/create
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
    const {ctx} = this
    let params = ctx.request.body;
    const data = await ctx.service.like.create(params);
    ctx.helper.success({data});
  }

 /** 
   * Deletes a like object
   * 
   * @param ctx: minimalist context resolver for Like
   * @param params: json data 
   * @api {post} /api/admin/like/remove remove-like
   * @apiVersion 0.0.1
   * @apiGroup Like
   * @apiParamExample {json} Params:
      {
        "_id":"5bff5eae0463457b8f0afabb"
      }
   * @apiContentType application/json
   * @apiHeader {String} mw-token
   * @apiSampleRequest /api/admin/like/remove
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
  async remove() {
    const {ctx} = this
    let params = ctx.request.body;
    const data = await ctx.service.like.remove(params);
    ctx.helper.success({data});
  }

  /** 
   * Returns a list of like JSON object 
   * 
   * @param ctx: minimalist context resolver for Like
   * 
   * @api {get} /api/admin/like/list list-like
   * @apiVersion 0.0.1
   * @apiGroup Like
   * @apiHeader {String} mw-token
   * @apiSampleRequest /api/admin/like/list
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
  //Get login user's like list array
  async list() {
    const {ctx} = this;
    //const params=ctx.request.body;
    console.log("likeContraol:"+ctx.state.header)
    const data = await ctx.service.content.likeList();
    ctx.helper.success({data});
  }

  /** 
   * Returns a list of like ids 
   * 
   * @param ctx: minimalist context resolver for Like
   * 
   * @api {get} /api/admin/like/listIds listIds
   * @apiVersion 0.0.1
   * @apiGroup Like
   * @apiHeader {String} mw-token
   * @apiSampleRequest /api/admin/like/listIds
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
  //Check each movie if is in this user's like list
  async listIds(){
    const {ctx} = this
    const data = await ctx.service.like.listIds();
    ctx.helper.success({data});
  }


}

module.exports = LikeController;
