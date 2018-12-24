'use strict';
const path=require('path')
// had enabled by egg
// exports.static = true;
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

// general tool
exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt',
};

// cross domain
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
// exports.validate = {
//   enable: true,
//   path: path.join(__dirname, '../lib/plugin/egg-validate'),
// };
//
// validate
exports.validate = {
  enable: true,
  package: 'egg-validate'
};


exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}

// exports.i18n = {
//     enable: true,
//     package: 'egg-i18n',
// };

//request print
exports.console = {
    enable: true,
    package: 'egg-console',
};



exports.multipleStatic = {
  enable: true,
  package: 'egg-multiple-static',
};