// // response sucess message

module.exports={
    success ({  code = 0, data = null, message = 'success' } = {},extend) {
        const {ctx}=this
        
        ctx.body = {
            code,
            data,
            message,
            ...extend
        }
        ctx.status = 200
    }
}