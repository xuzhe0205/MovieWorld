/**
 * Token check for passing values.
 */

module.exports = () => {

  /**
     * Parsing the background management system token
     */
  return async (ctx, next) => {
    if (ctx.request.header['mw-token']) {
      const token = ctx.request.header['mw-token'];
      // Decoding token
      try {
        const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secretAdmin);
        // Decoding successfully injected user information into state
        ctx.state._id = decoded.data;

      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          ctx.throw(401, 'token expired');

        } else {
          ctx.throw(402, 'token error');
          return;
        }
      }

      await next();
    };
  };
};


