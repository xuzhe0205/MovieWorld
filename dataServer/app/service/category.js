/**
 * Service for post and get operation for category.
 * 
 * @param ctx: minimalist context resolver for Category
 * @param params: json data
 */

const Service = require('egg').Service;


class CService extends Service {

    // create Category
    async create(params) {
        const { ctx } = this;
        await ctx.model.Category.create(params);
    }
    // Category list
    async list() {
        const { ctx } = this;
        return await ctx.model.Category.find();
    }

}

module.exports = CService;