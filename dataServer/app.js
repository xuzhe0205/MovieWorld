

const process = require('child_process');
const ip = require('ip')


module.exports = app => {
  app.beforeStart(async () => {

    if(app.config.env != 'prod'){
    const apiConfig=app.config.api
    for(let x in apiConfig){
      let config=apiConfig[x]
      const docsDefinition={
        info: { // API informations (required)
          title:config.title || x, // Title (required)
          version: config.version||'0.0.0', // Version (required)
          description: config.description||x, // Description (optional)
        },
        host: '0.0.0.0:7001', // Host (optional)
        basePath: '/', // Base path (optional)
        files:  config.files|| `app/controller/${x}`
      }
      process.exec(`apidoc -i ${docsDefinition.files} -o app/public/docs/${x} -t lib/apidoc/template/ --parse-parsers apicontenttype=lib/apidoc/api_content_type.js`,function (error, stdout, stderr) {
        if (error !== null) {
          console.log(`docs-${x} exec error:${error}`);
        }else{
          console.log(`${x}-docs http://${ip.address()}:7001/public/docs/${x}/index.html`)
        }
      });
    }
    }
    
  })
}
