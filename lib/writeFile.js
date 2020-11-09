"use strict";

var path = require("path");

// 大驼峰转换横杠连接
function toLine(str) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return "-" + match.toLowerCase();
  });
  if (temp.slice(0, 1) === "-") {
    temp = temp.slice(1);
  }
  return temp;
}

function writeTsx(dirPath, dirName, fs, cssType, usePureComponent, whatSX,useStore) {
  let str = `\
import * as React from 'react'
import * as _ from 'lodash';
`;
if(useStore){
  str += `\
import { inject } from '@royjs/core';
import store from './store';
import './index.${cssType}'

@inject(store)
`
}else{
  str +=`\
import './index.${cssType}'
  `
}
  switch (whatSX) {
    case "jsx":
      if (usePureComponent) {
        str += `\
function ${dirName}(props){
    return (
        <div className="${toLine(dirName)}-container">${dirName}</div>
      )
    }  
        `;
      } else {
        str += `\
class ${dirName} extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return (
          <div className="${toLine(dirName)}-container">${dirName}</div>
        )
    }
}
        `;
      }
      break;
    case "tsx":
      if (usePureComponent) {
        str += `\
interface IProps {}
const ${dirName}: React.FC<IProps>= (props)=>{
    return (
         <div className="${toLine(dirName)}-container">${dirName}</div>
        )
}  
          `;
      } else {
        str += `\
interface ${dirName}Props{}
class ${dirName}State {}
class ${dirName} extends React.Component<${dirName}Props,${dirName}State>{
public state= new ${dirName}State();
render(){
    return (
        <div className="${toLine(dirName)}-container">${dirName}</div>
        )
    }
}
        `;
      }
      break;
    default:
      return;
  }

  str += `\
export default ${dirName}
`;
  str = new Buffer(str);
  fs.writeFile(path.join(dirPath, "index." + whatSX), str, catchErr);
}

function writeCss(dirPath, dirName, fs, cssType) {
  var str = `.${toLine(dirName)}-container {\n  \n}`;
  str = new Buffer(str);
  fs.writeFile(path.join(dirPath, "index" + "." + cssType), str, catchErr);
}
function writeStore (dirPath, dirName, fs){
  var str = `\
import { Store } from '@royjs/core';

const store = new Store({
  state: {
    name: "${dirName}"
  },
  actions: {
  
  }
});\n
export default store;
  `;
  str = new Buffer(str);
  fs.writeFile(path.join(dirPath, "store.js"), str, catchErr);
}


function catchErr(err) {
  if (err) {
    throw err;
  }
}
module.exports = {
  writeTsx: writeTsx,
  writeCss: writeCss,
  writeStore:writeStore,
};