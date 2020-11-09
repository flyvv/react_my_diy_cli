"use strict";

var fs = require("fs");
var path = require("path");
var _require = require("./writeFile.js"),
  writeCss = _require.writeCss,
  writeStore =_require.writeStore,
  writeTsx = _require.writeTsx;
module.exports = function createReactComponent(
  dirNames,
  cssType,
  usePureComponent,
  whatSX,
  diyPath,useStore
) {
  switch (dirNames.length) {
    case 0:
      throw Error("请输入组件名称");
    case 1:
      createOne(dirNames[0], cssType, usePureComponent, whatSX, diyPath,useStore);
      break;
    default:
      createMulti(dirNames, cssType, usePureComponent, whatSX, diyPath,useStore);
      break;
  }
};

function createOne(dirName, cssType, usePureComponent, whatSX, diyPath,useStore) {
  var dirPath = path.join(dirName);

  createFiles(dirPath, dirName, cssType, usePureComponent, whatSX, diyPath,useStore);
}

function createMulti(dirNames, cssType, usePureComponent, whatSX, diyPath,useStore) {
  dirNames.forEach(function (ele) {
    var dirPath = path.join(ele);
    createFiles(dirPath, ele, cssType, usePureComponent, whatSX, diyPath,useStore);
  });
}

function createFiles(
  dirPath,
  dirName,
  cssType,
  usePureComponent,
  whatSX,
  diyPath,useStore
) {
  var fliename = path.join(`${process.cwd()}/${diyPath}`, dirPath);
  fs.mkdirSync(fliename);
  writeTsx(fliename, dirName, fs, cssType, usePureComponent, whatSX,useStore);
  writeCss(fliename, dirName, fs, cssType);
  if(useStore){
    writeStore(fliename, dirName, fs);
  }
}