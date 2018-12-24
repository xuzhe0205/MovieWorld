/**
 * Error handle for the server
 */

'use strict';

const errorHandle=(errorArray)=>{
  return errorArray.map(item=>{
    if(item.code==='invalid'){
      if(/empty/.test(item.message)){
        item.code='empty'
      }else if(/should be an/.test(item.message)){
        item.code='type'
        item.message=item.message.replace('should be an ','')
      }
    }
    return item
  })

}

module.exports = (option, app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // All exceptions fire an error event on the app, and the framework logs an error log.
      app.emit('error', err, this);
      const status = err.status || 500;
      // In the production environment, the 500 error details are not returned to the client because they may contain sensitive information.
      const error = status === 500 && app.config.env === 'prod' ?
        'Internal Server Error' :

        err.message;
      // Read each attribute from the error object and set it to the response.
      ctx.body = {
        code: err.code || status, // The server's own processing logic error (including frame error 500 and custom business logic error 533 starts) 
        //The client requests Params caused errors (starting at 4xx), setting different status codes
        message: error,
        data:null
      };
      if (status === 422) {
        ctx.body.code= 422
        ctx.body.errorData = errorHandle(err.errors);
        delete ctx.body.message
      }
      ctx.status = 200;
    }
  };
};
