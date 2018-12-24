/**
 * Service for tokens operations done on data.
 */

'use strict';

const Service = require('egg').Service;


class ActionTokenService extends Service {

  // send token
  async applyAdmin({_id}) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: _id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secretAdmin);
  }
}

module.exports = ActionTokenService;
