'use strict';
const  path =require('path')

module.exports = appInfo => {
  const config = exports = {};

  exports.logger = {
    dir: `${process.cwd()}/logs`,
  };
  

  config.bodyParser = {
    jsonLimit: '10mb',
  },

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1529808937984_5849213223232323232323';

  // add your config here
  config.middleware = ['error'];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
  };



  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.mongoose = {
    client: {
      url: 'mongodb+srv://test:test@cluster0-evn2w.azure.mongodb.net/test?retryWrites=true',
      options: {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
      },
    },
  };

  
  config.jwt = {
    secret: 'merculet-343434342322332233243',
    secretAdmin: 'merculet555555555555555555',
    enable: true, // default is false
    match: '/jwt', // optional
  };



  config.console = {
    // both default true in local env and false in prod env.
    debug: true,
    error: true,
  };
 


  // swagger setting
  config.api ={
    admin: {
      title: 'Demo-Api', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'A demo API', // Description (optional)
      // router:'admin', //The default is the name of the key, the access path  /swagger/admin
      // files:'/app/controller/admin/*.js' The folder corresponding to the default controller
    }
  };



  return config;
};

