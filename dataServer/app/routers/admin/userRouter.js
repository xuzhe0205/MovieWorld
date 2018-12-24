/**
 * Movie data endpoint routes definitions.
 */

module.exports = app => {
    const { router, controller } = app;
    //.checktoken: check for error, avoid error termination
    const checktoken = app.middleware.checktoken();
    router.post('/api/admin/user/register',controller.admin.user.register);
    router.post('/api/admin/login',controller.admin.user.login);
    router.post('/api/admin/category/create',controller.admin.category.create);
    router.get('/api/admin/content/list', controller.admin.content.list);
    router.post('/api/admin/content/create', controller.admin.content.create);
    router.get('/api/admin/category/list', controller.admin.category.list);
    router.get('/api/admin/user/collecList', controller.admin.user.collecList);
    router.get('/api/admin/content/details/:id', controller.admin.content.details);
    router.put('/api/admin/user/update/:id',  checktoken,controller.admin.user.update);
    router.put('/api/admin/user/updatePassowrd/:id',  checktoken,controller.admin.user.updatePassowrd);
    router.post('/api/admin/like/create',  checktoken,controller.admin.like.create)
    router.put('/api/admin/like/remove',  checktoken,controller.admin.like.remove)
    router.get('/api/admin/like/list',checktoken,controller.admin.like.list)
    router.get('/api/admin/like/listIds',checktoken,controller.admin.like.listIds)
    router.get('/api/admin/content/search',controller.admin.content.search)

  };
  
  
  