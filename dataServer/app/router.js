/**
 * Serves to find designated data from urls in other routes.
 */

'use strict';
const fs = require('fs');
const dirList = fs.readdirSync('./app/routers');
const routeList = [];

dirList.forEach(item => {
  if(item!=='.DS_Store'){

  const subFileList = fs.readdirSync('./app/routers/' + item);
  subFileList.forEach(subItem => {
    if(subItem!=='.DS_Store'){
    routeList.push(require(`./routers/${item}/${subItem}`));
    }
  });
}
});


const asyncFile = app => {
  routeList.forEach(item => {
    item(app);
  });
};

module.exports = app => asyncFile(app);
