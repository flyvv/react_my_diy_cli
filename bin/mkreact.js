#!/usr/bin/env node
"use strict";
const createReactComponent = require("../lib/createReactComponent");
const program = require("commander");

function parseVal(val) {
  return val.split(",");
}

function log(name, componentStatus, style, whatSX) {
  console.log("starting...");
  console.log("name:", name, "style:", [style], "whatSX:", [whatSX]);
  console.log(
    `you will create ${componentStatus}component ${name} with ${style} and ${whatSX}`
  );
}

function getDirName(param) {
  return param[2].split(",");
}

function getDirPath(param) {
  if (param[3].slice(0, 1) === "-") {
    return "";
  } else if (param[3].slice(0, 1) !== "/") {
    return `/${param[3]}`;
  } else {
    return param[3];
  }
}

(function () {
  let usePureComponent = false;
  let componentStatus = "";
  let style = "css";
  let whatSX = "tsx";
  let name;
  let useStore = false

  program
    .version("1.1.2")
    .option("-s --scss [names]", "replace css to Scss", parseVal)
    .option("-l --less [names]", "replace css to Less", parseVal)
    .option("-p --pure [names]", "use pure component", parseVal)
    .option("-j --jsx [names]", "use jsx component", parseVal)
    .option("-t --tsx [names]", "use tsx component", parseVal)
    // 老婆使用的roy.js 为她特定了store.js的模版代码
    .option("-m --model [names]", "use store with component", parseVal)
    .parse(process.argv);

  name = getDirName(process.argv);
  let diyPath = getDirPath(process.argv);

  if (program.pure) {
    usePureComponent = true;
    componentStatus = "pure ";
  }
  if (program.scss) {
    style = "scss";
  } else if (program.less) {
    style = "less";
  }

  if (program.tsx) {
    whatSX = "tsx";
  } else if (program.jsx) {
    whatSX = "jsx";
  }
  if(program.model){
    useStore = true
  }
  log(name, componentStatus, style, whatSX);
  createReactComponent(name, style, usePureComponent, whatSX, diyPath,useStore);
  console.log(["done!"]);
})();