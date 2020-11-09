# 命令行一键创建组件



<a name="n7WGI"></a>
### 命令格式：
<a name="NgrJe"></a>
### mkreact 组件名 组件路径 组件样式文件 组件格式要求 
<a name="qWLpU"></a>
### design：
命令名： mkreact<br />组件名： 保持react组件命名规则<br />组件路径： 默认为当前命令行所在目录为根目录<br />组件样式文件：<br />-s or --scss: 创建.scss样式文件；<br />-l or --less: 创建.scss样式文件；<br />默认为 .文件css<br />组件格式要求： <br />-p or --pure: 是否创建函数式组件；<br />-j or --jsx: 创建jsx的组件；<br />-t or --tsx: 创建tsx组件；<br />默认为 tsx，class组件。
<a name="QGxNm"></a>
### example:
安装：
```bash
npm install  flyvv-component-cli  -g
```
1、在项目src/component/layout目录下创建一个Test的函数式的ts组件,样式为less。
```bash
mkreact Test src/component/layout -l -p -t 
```
or
```bash
mkreact Test /src/component/layout -l -p -t 
```
个人经常会忘记第一个/，所以做了兼容<br />2、最简单的使用
```bash
mkreact Test
```