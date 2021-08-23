# React概览

- React基础
  - jsx语法、表达式、条件渲染、列表渲染、样式处理、jsx本质是对象
  - 组件化开发：函数组件、类组件
  - 类组件：class
    + exrends ：继承基础组件
    + constructor ：构造函数，传递值props
    + super ：构造函数第一行必须是super，向基础类传递值
    + this.state ：类组件的私有状态，是响应式的；函数组件的私有状态不是响应式的，所以函数组件没有私有状态
    + render ：类组件模板必须通过render提供，render方法是固定的，提供渲染的模板
    + this.setState
- 脚手架: create-react-app
- 前端路由react-router
- 第三方UI组件库 ant-design
- 接口调用 axios
- 状态管理 redux
- 各种第三方组件
- 项目（移动端租房）


## 用到的方法

- babel ：javascript编译器，他把最新版的javascript编译成当下可以执行的版本
- webpack：打包处理，语法降级处理，以后再补充！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
- 虚拟DOM就是一个普通对象,他描述了真实的DOM
- 语法糖：意思是现有技术本可以实现，但是采用某种写法会更加简洁优雅
- 判断语句
  - if () else 
- 三元表达式
  - a ? 'b' : 'c'
- 短路表达式
  - && ：找假，都为真时取后面的
  - ||：找真，都为假时取后面的
  - ！！：如果作为条件表达式，不需要使用!!进行转换，Javascript会自动转换，!!就只应用于将类型转换为布尔值。
- 阻止渲染
  - 各种方式设置 return
- ES2015模块化开发：import 引入；export default 导出
- 函数由函数名和函数体两部分组成，他们是可以分离的，所以调用时只传参就可以了
- 箭头函数如果函数体没有花括号，自带返回值
- 组件化开发：函数组件、类组件
- map()：遍历数组，并返回一个经过函数处理的数组；
- find： 根据条件来查找满足条件的第一个值，不满足返回undefined
- findIndex：返回满足条件的第一项的索引，不满足返回-1；
- filter：数组过滤器，返回满足条件的新数组
- className：样式名称，是DOM属性
- event.persist()；阻止元素的默认行为
- event.preventDefault();阻止元素的默认行为
- one.bind(this, 10);改变one内部的this指向括号中的this，并传入参数10；call、apply用法相同；借用方法

##  React相关

- ReactDOM：是react-dom的软件包对象，它提供了可在应用顶层使用的DOM方法
- ReactDOM.render()：在提供的container中渲染一个React元素：1、需要渲染的React元素，2、提供的容器
- React脚手架：通过npx找到对应的webpack命令，脚手架内部依靠webpack实现功能
- 父组件的子组件jsx元素上，属性名必须是小驼峰命名法
- 父组件的子组件jsx元素上，绑定的都是传递的值；子组件中的jsx元素上绑定的是特性（className/onClick/key)

## React概述

React：用于构建用户界面的 JavaScript 库（框架）UI框架

- [中文官网](https://react.docschina.org/)
- [英文官网](https://reactjs.org/)
- React特性
    + 声明式视图
        - 对于声明式组件，当数据变更的时候，React低层负责高效更新。这种方式代码更加可预见并且更容易调试。
    + 组件化
        - 封装管理数据的组件，通过组合的方式实现复杂的UI
        - 组件的逻辑采用js实现而不是模板，这样可以保持数据在DOM之外,与DOM解耦。
    + 一次学习，随处编写
        - React可以进行服务端渲染，也可以用于移动APP开发（React Native）

## React之HelloWorld
-   [案例模板Try React->download this HTML file](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)
-   基本步骤
    +   引入react库文件react和react-dom
        * react  核心
        * react-dom  提供了一些DOM操作相关的API，它依赖于上面的react库

    +   引入babel运行时（React代码浏览器不认识，需要通过babel把react代码转化为js代码）

* babel ：javascript编译器，他把最新版的javascript编译成当下可以执行的版本
  ​      
+   基于React语法进行开发

                        引入自己的代码，type类型必须是text/babel

```JavaScript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script type="text/javascript" src="./lib/react.development.js"></script>
  <script type="text/javascript" src="./lib/react-dom.development.js"></script>
  <script type="text/javascript" src="./lib/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  // type类型必须是text/babel
  <script type="text/babel" src="src/HelloWorld.js"></script>
</body>
</html>
```

- HelloWorld.js文件内容

```JavaScript
let info = <div>HelloWorld!</div>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

- 如果把React代码放到专门的js文件中运行，在浏览器中不能通过file的方式打开，这是跨域的问题，需要通过http方式访问

  sublime需要安装插件：sublimeServer,在sublime的Tools选项中，打开sublimeServer，然后右击html文件时选则view in sublimeServer

  vscold:live server

## JSX基础语法

- JSX是什么
- jsx是react对js的语法扩展：在js中写HTML标签
- jsx元素外可以包含一个小括号，小括号是可选的，看起来更具语义化
- vue中，所有的组件必须有根节点
- 每一个组件中的所有jsx元素必须在同一个的根节点中
- 差值表达式：{}一层花括号

```JavaScript
// js的语法扩展：在js中写HTML标签
const info = <div>Hello World!</div>;
```

- JSX元素中动态插入数据：差值表达式

```
let name = 'World'
const element = <h1>Hello, {name}</h1>;
```

-   JSX设置动态属性值
    + 小驼峰形式属性名（标准属性）
    + jsx元素中可以动态填充数据:差值表达式 {}，一层花括号
    + jsx元素添加属性，要使用 className 属性
    + 添加class属性也可以使用差值表达式，差值表达式外面不能添加引号
    + 添加行内样式：
      - 1、变量的方式，类似定义一个对象,使用逗号分隔，键名使用小驼峰命名法，值需要添加引号；
      - 2、直接写行内样式，需要两层花括号,使用逗号分隔，键名使用小驼峰命名法，值需要添加引号；

```
// 添加class属性
let cname = 'current'
let element = <div className={cname}>{msg}</div>
// 行内样式
let style = {
	backgroundColor: 'lime',
	color: 'red'
}；
// 定义jsx对象，并填充行内样式
let element = (
	<div>
		直接写行内样式，需要两层花括号,使用逗号分隔，键名使用小驼峰命名法，值需要添加引号；
		<div style={{backgroundColor: 'red', color: '#fff'}}>{name}</div>
		变量的方式，类似定义一个对象,使用逗号分隔，键名使用小驼峰命名法，值需要添加引号；
		<div style={style}>{message}</div>
	</div>
);
```

- JSX可以包含子元素
    + JSX元素必须包含一个跟元素
    + React.Fragment：只包裹不渲染

```
const element = (
  // 根元素
  <React.Fragment>
    // 子元素
    <h1>Hello!</h1>
    <h1>Nihao</h1>
  </React.Fragment>
);
```

## JSX表达式用法

- JSX可以赋值给变量
- 作为函数的参数
- 作为函数的返回值

```
// JSX元素本身就是表达式	
// let element = <div>你好</div>

function showInfo (info) {
	作为返回值
  // return info;
  return (
    <div>
      <div>作为参数的JSX元素</div>
      <div>{info}</div>
    </div>
  )
}
					// 2、JSX元素可以作为函数的参数
let element = showInfo(<div>Hello</div>)
```



## JSX的本质：就是对象

 JSX元素的本质不是DOM标签，而是普通的对象 {} (虚拟DOM VNode)

```JavaScript
// 函数原型
React.createElement(element, [props], [...children])
// ------------------------------------------------
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// 上述JSX本质上可以表示为如下形式：
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
/*
// 这个对象是一个虚拟DOM，虚拟DOM就是一个普通对象,他描述了真实的DOM
info = {
  // 标签名
  tagName: 'div',
  // 属性集合
  attrs: {className: 'active'},
  // 子节点
  children: 'nihao'
}
// 然后创建真实DOM
let div = document.createElement(info.tagName);
div.setAttribute('class', info.attrs.className);
div.innerHTML = info.children;
// 再添加到页面中
document.getElementById('root').appendChild(div);
*/
```

## JSX条件渲染

- js形式条件渲染

  - 元素变量：根据条件的不同，赋值不同的元素
    - 定义一个变量，操作这个变量。给变量赋值jsx元素，然后返回这个变量


- 判断语句
    - if () else 
- 三元表达式
    - a ? 'b' : 'c'
- 短路表达式
    - && 、||
    - !!：得到一个布尔值的结果
- 阻止渲染
    - 各种方式设置 return

```
function showForm (flag) {
  // 展示登录框或者注册框
  if(flag) {
    // 显示登录框
    return <div>登录框</div>
  } else {
    // 显示注册框
    return <div>注册框</div>
  }
}
```

- 元素变量

```
function showForm (flag) {
  // 展示登录框或者注册框
  let form = null;
  if(flag) {
    form = <div>登录</div>
  } else {
    form = <div>注册</div>
  }
  return form
}
```

- 行内条件渲染

```
function showForm (flag) {
  // 展示登录框或者注册框
  // return <div>{flag?<h1>登录</h1>:<h1>注册</h1>}</div>

  // 只有特定条件成立时才渲染，否则不渲染
  return <div>{flag && <div>条件成立时显示</div>}</div>
}
```

- 阻止渲染

```
function showForm (flag) {
  if(flag) {
    // 如果想阻止渲染的话，返回null即可
    return null
  }
  return <div>登录或者注册</div>
}
```

## JSX列表渲染

- jsx元素不是html标签，而是js代码，所以可以直接在循环中使用
- 渲染多个元素

```
let arr = ['apple', 'orange', 'lemon']
let list = arr.map(item => {
  return <li>{item}</li>
})
let element = <ul>{list}</ul>
```

- key只在数组上下文中有定义
  - 为了提高渲染性能
- key在兄弟节点之间必须唯一

```
let list = arr.map((item, index) => {
  return <li key={index}>{item}</li>
})
```

- JSX中可以嵌入map结构   箭头函数如果函数体没有花括号，自带返回值

```
// 行内嵌入列表渲染(不建议这样写，可读性较差)
let element = <ul>{arr.map((item, index)=><li key={index}>{item}</li>)}</ul>
```

## JSX样式处理

- class样式

  - 使用className类处理样式

  ```
  let element = <div className='active bg'>测试样式</div>
  ```

- style样式

  - 使用style属性处理样式

  ```
  // 行内样式不可以直接按照原始的方式来写，只能用如下的方式
  // let style = {
  //   color: 'blue',
  //   backgroundColor: '#eee'
  // }
  // let element = <div style={style}>测试样式</div>
  // 行内样式需要使用两层花括号
  let element = <div style={{color: 'orange', border: '1px solid yellow'}}>测试样式</div>
  ```

## 案例实践

- Tab效果：基于JSX实现

```
let tabData = [{
  id: 1,
  title: 'tom',
  content: 'catch jerry'
}, {
  id: 2,
  title: 'jerry',
  content: '调戏 tom'
}, {
  id: 3,
  title: 'spike',
  content: '被 tom and Jerry 调戏'
}]

// 当前选中的Tab的ID
let currentId = 2

// 根据数据动态生成标题和内容JSX元素列表
let btns = []
let divs = []
// 动态创建tab
tabData.forEach(item => {
  // 生成菜单
  btns.push(<button key={item.id}>{item.title}</button>)
  // 生成内容
  divs.push(<div className={currentId===item.id?'active': ''} key={item.id}>{item.content}</div>)
})
// 定义根节点
let element = (
  <div className='tab'>
    {btns}
    {divs}
  </div>
)
// 调用render接口，在container中渲染一个React元素：1、元素，2、容器
ReactDOM.render(element, document.getElementById('root'));
```

## 脚手架

- npx ： 用于自动查找本地安装的命令

- 新版本的Node.js自带npx命令

- 如果没有npx命令，也可以手动安装

  - npm install -g npx

    ```
    .\node_modules\.bin\webpack --version
    # 或者
    npx webpack --version
    ```

- 通过React脚手架创建项目

  - npx create-react-app mydemo
    - 创建项目
  - cd mydemo
    - 进入项目目录
  - yarn start
    - 运行项目

- 用传统方式创建项目

  - ```
    npm install create-react-app -g
    ```

  - ``` 
    create-react-app myReact
    ```

  - ``` 
    cd mydemo
    ```

  - ```
    npm start
    ```

  - ```
    打包
    npm run build
    ```


## 脚手架项目代码分析

- 入口文件 index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
// 导入全局样式
import './index.css';
// 导入入口组件
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
```

- 入口组件

```
// 必须导入react模块
import React from 'react';
// 导入组件样式
import './App.css';
// 定义了一个组件
function App() {
  return (
    <div>
      测试
    </div>
  );
}
export default App;
```

- 样式文件需要使用import方式进行导入

## 组件化开发(分而治之)

> 组件将UI分割为可以重用的单元（组件接收数据，呈现内容）
> 原则：高内聚，低耦合
>
> 每个组件中必须引入react.js文件

### 定义组件方式：组件必须首字母大写
- 函数组件中，如果直接修改变量的值不会引起页面的变化

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- 类组件：导出的组件不能使用变量表达式方式定义

```
class Welcome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 组件接收数据props

- 父组件向子组件传递数据
  - 单向数据流：只可以读取props中的数据，不可以修改props传递的数据

```
// 父组件
// 导入组件
import Welcome from './components/01'

let name = '张三'
<Welcome uname='zhangsan'></Welcome>
<Welcome uname='lisi'></Welcome>
<Welcome uname='wangwu'></Welcome>
<Welcome uname={name}></Welcome>
```

```
// 子组件
function Welcome (props) {
  return <h1 className='active'>欢迎[{props.uname}]访问</h1>
}
```

## 类与继承

- 类的说明

  - class 用来描述一个类；ES2015的class可以看作只是一个语法糖,而类本身可以看作一个构造函数
  - class：语法糖写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
  - 构造函数：通过new 创建实例，实例有prototype属性，prototype属性有constructor属性


- new 可以基于这个类创建实例
- extends 继承，后面是继承的基础类，React组件的基础类是React.Component
    - constructor 方法实质就是当前创建的类的构造函数；
    - js高级中，通过构造函数new一个实例，实例的prototype属性中有一个属性constructor，constructor需要回指自身的构造函数
    - Component.prototype.constructor.call(this,props)
    - super() 代表了父类构造函数，向父类传递props，
    - this.state： 类组件的私有状态写到这里
    - this.setState() 必须调用此方法进行状态修改，setState有state的所有数据，所以setState内部就不用给键写this了
    - render 当前类组件导出的内容必须通过render方法提供，这些导出内容会被渲染；render内 return  jsx元素

- 类的基本用法
    - constructor 方法实质就是构造方法，通过new生成实例会自动调用，如果类型没有定义constructor则会默认添加
    - constructor中必须调用 super方法，子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
    - 如果这个类是一个基础类，constructor 里面，如果使用this，则不必在this前面调用super方法
    - 如果这个类继承了其他类，constructor 里面，如果使用this，则必须在this前面调用super方法
    - 组合继承方式：借用继承和原型继承

```
    // 基于类的方式
    class Student {
      // 构造函数
      constructor(uname, age) {
        this.uname = uname;
        this.age = age;
      }
      // 构造函数以外定义的方法本质上就是原型方法
      showInfo () {
        console.log(this.uname + '的年龄是' + this.age)
      }
    }
    let stu = new Student('zhangsan', 13);
    console.log(stu.uname)
    console.log(stu.age)
    stu.showInfo()
```

- 类的继承
  - 构造函数中第一行代码必须是super()
  - extend：继承，后面是继承的基础类

```
class TypeStudent extends Student {
  // 构造函数中第一行代码必须是super()
  constructor(uname, age, type) {
    // super代表了父类构造函数
    super(uname, age);	
    // 在子类再添加一个属性
    this.type = type;
  }
}
let ts = new TypeStudent('lisi', 12, '三好学生');
ts.showInfo();
ts.showType();
```

## 类组件：导出的组件不能使用变量表达式方式定义

- 基于类定义组件
  - 当前类组件导出的内容必须通过render方法提供，这些导出内容会被渲染；render内 return  jsx元素

```
class Student extends React.Component {
  // 构造函数中第一行代码必须是super()
  constructor(props) {
    // super代表了父类构造函数
    super(props);
    // state中定义组件的私有状态，是响应式的；函数组件中的私有状态不是响应式的，所以说函数组件没有私有状态
	this.state = {
	  number: 1,
	  addnum: 1
	};
  }
  showType () {
    console.log(this.type)
  }
  // 当前类组件导出的内容必须通过render方法提供，这些导出内容会被渲染；render内 return  jsx元素
  render () {
    return (
      <div>学生信息</div>
    )
  }
}
```



### 组件状态state

> 状态是组件私有的并且完全被组件控制（只有类组件有状态，函数组件没有状态）

```
class Student extends React.Component {
  // 构造函数中第一行代码必须是super()
  constructor(props) {
    // super代表了父类构造函数
    super(props);
    // 类组件的状态写到state里，状态对象名称 state 固定
    this.state = {
      msg: 'hello'
    }
  }
  // 当前类组件导出的内容必须通过render方法提供，这些导出内容会被渲染；render内 return  jsx元素
  render () {
    // this.props表示父组件传递过来的所有数据
    let {uname} = this.props
    let {msg} = this.state
    return (
      <div>学生信息:{uname} {msg}</div>
    )
  }
}
```

### 组件的生命周期

- componentDidMount
  - 组件完成挂载之后触发，类似于Vue中mounted
- componentWillUnmount
  - 组件将要卸载时触发，一般用于销毁一些资源
  - 图灵中有关于如何清理变量之类的内容

```
componentDidMount () {
  // 这里一般用于调用后台接口获取数据
  console.log('组件挂载成功之后触发')
}
componentWillUnmount () {
  // 这里一般用于清理性工作：比如销毁一些资源（销毁定时任务，取消事件绑定）
  console.log('组件将要销毁时触发')
}
```

```
componentDidMount () {
  setTimeout(() => {
    // 3秒后把Student组件销毁：把state中的状态修改为false
    // 不可以使用如下的方式修改state
    // this.state.flag = false;
    // 必须调用this.setState()方法进行状态修改
    this.setState({
      flag: false
    })
  }, 3000)
}
```

### 组件状态的修改

- 必须使用setSate方法对组件状态进行修改
- 状态的修改是异步的
- setState不能保证调用多次就更新对应的次数； 为提高页面的更新性能，会把多次更新合并为一次；不要频繁调用setState

```
componentDidMount () {
  // setTimeout(() => {
  //   this.setState({
  //     num: 1
  //   })
  //   console.log(this.state.num)
  // }, 2000)

  // 状态的修改是异步的
  // this.setState({
  //   num: 1
  // }, () => {
  //   // 如果回调函数触发，表示状态已经完成更新
  //   console.log(this.state.num)
  // })
  // console.log(this.state.num)

  // -----------------------------
  // this.setState不能保证调用多次就更新对应的次数
  // 为了提高页面的更新性能，会把多次更新合并为一次
  // 不要频繁调用setState
  // this.setState({
  //   num: this.state.num + 1
  // })
  // this.setState({
  //   num: this.state.num + 1
  // })
  // this.setState({
  //   num: this.state.num + 1
  // })
}
```

## 事件处理

- 不能使用return false的方式阻止默认行为，必须使用preventDefault
- 事件对象event
- 直接打印event是有问题的，需要在方法内添加event.persist()；React出于性能的考虑，把event参数都设置为了空
- 事件绑定方式
  - 类的方式定义的事件都在原型上
  - 定义的事件需要改变事件函数的this指向，否则拿不到this
  - 复习call、bind、apply
  - 类对象中，为什么要在构造函数中改变方法中的this指向？他们什么关系？

```
  // handle为函数名称
  <button onClick={this.handle}>点击</button>
```

```
  handle = () => {
    // 需要使用箭头函数
    this.setState({
      num: this.state.num + 1
    })
  }
```

- 不能使用return false的方式阻止默认行为，必须使用preventDefault

```
function ActionLink() {
  function handle(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handle}>跳转</a>
  );
}
```

- React的事件对象event是合成对象，没有兼容问题

- 事件函数中的this问题

  - 在构造函数中绑定

    ```
    this.handleClick = this.handleClick.bind(this);
    handleClick = function () {}
    ```

  - 使用箭头函数

    ```
    handleClick = () => {
      console.log('this is:', this);
    }
    ```



- 事件传参

```
let tagList = this.state.list.map(item => {
  // return <li onClick={(e) => {this.showId(item.id, e)}} key={item.id}>{item.bname}</li>
  // 推荐这种
  return <li onClick={this.showId.bind(this, item.id)} key={item.id}>{item.bname}</li>
})
```

## 完善Tab案例效果

- 基于类进行代码重构
- 添加事件控制逻辑

```
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabData: [{
        id: 1,
        title: 'tom',
        content: 'catch jerry'
      }, {
        id: 2,
        title: 'jerry',
        content: '调戏 tom'
      }, {
        id: 3,
        title: 'spike',
        content: '被 tom and Jerry 调戏'
      }],
      currentId: 1
    }
  }
  
  changeTab = (id) => {
    // 控制Tab的切换操作
    this.setState({
      currentId: id
    })
  }

  render () {
    // 根据数据动态生成标题和内容JSX元素列表
    let btns = []
    let divs = []
    this.state.tabData && this.state.tabData.forEach(item => {
      // 生成菜单
      btns.push(<button onClick={this.changeTab.bind(this, item.id)} className={this.state.currentId===item.id?'active': ''} key={item.id}>{item.title}</button>)
      // 生成内容
      divs.push(<div className={this.state.currentId===item.id?'active': ''} key={item.id}>{item.content}</div>)
    })
    return (
      <div className='tab'>
        {btns}
        {divs}
      </div>
    )
  }
}
```

## 组件间数据传递

- 父组件向父子组件传值
  - 父组件中的子组件上绑定属性，属性会保存在props对象中；
  - 子组件通过this.props可以解构出需要的值
- 子组件向父组件传值
  - 对于Vue来说，使用了自定义事件
  - React不使用自定义事件，而是通过标签属性传递函数的方式
  - 总结：父组件需要通过子组件标签属性传递父组件定义的函数，该函数用于修改父组件数据，但是需要传递到子组件被调用，调用时，子组件可以向该函数传递实参，那么该参数就传递给了父组件
- 非父子组件之间的数据传递
  - let eventHub = new Vue();
  - 后续React会采用状态管理工具来做
    - Vue有一个组件：vuex
    - React有自己的组件：redux

```
子组件
class Children extends React.Component {
	// 构造函数
	constructor (props) {
		// 向基础类传递值
		super(props);
		// 构造函数中this前必须添加super
		// state中定义组件的私有状态，是响应式的；函数组件中的私有状态不是响应式的，所以说函数组件没有私有状态
		this.state = {
			number: 1,
			addnum: 1
		};
		// 向方法add中添加this
		this.add = this.add.bind(this);
	}
	// 点击时number加1
	add = function () {
		// 状态修改必须使用setState
		this.setState({
			number: this.state.number + 1
		});
		// 结构出需要的函数
		let { summation } = this.props;
		// 利用函数将值传递给父组件
		summation(this.state.addnum);
	}
	// 类组件模板必须通过render方法提供
	// render方法是固定写法，提供要渲染的模板
	render () {
		// 返回jsx元素
		return (
			<div>
				<div>{ this.state.number }</div>
				<button onClick={this.add}>加</button>
			</div>
		)
	}
}
```



```
父组件
class Father extends React.Component {
	// 构造函数
	constructor (props) {
		// 向基础类传递值
		super(props);
		// 构造函数中this前必须添加super
		// state中定义组件的私有状态，是响应式的，函数组件的私有状态不是响应式的，所以说函数组件中没有私有状态
		this.state = {
			total: 2
		};
		// 给方法添加this
		this.summation = this.summation.bind(this);
	}
	// 传递值
	summation = function (num) {
		// 把传递过来的值保存并累加
		this.setState({
			total: this.state.total + num
		})
	}
	// 类组件模板必须通过render方法提供
	// render方法是固定写法，提供渲染的模板
	render () {
		// 返回一个jsx元素
		return (
			<div>
				<div>{ this.state.total }</div>
				<Son summation={ this.summation }></Son>
				<Son summation={ this.summation }></Son>
			</div>
		)
	}
};
```



## 表单基本操作是 ：双向绑定

- 表单基本属性

  - readOnly：设置表单为只读
  - checked：单选多选默认选中
  - select：下拉框默认选中（好像不对）
  - .focus()：获取光标方法
  - 可以使用defaultValue指定表单的默认值（只在非受控元素中可用）

- 双向绑定

  - value={this.state.uname}
  - onChange={this.handleUname}

  ```
  当只绑定value时，输入框不能输入；需要在onChange绑定的事件中，设置私有状态等于输入框自带属性value的值
  <input type="text" id="uname" value={this.state.uname} onChange={this.handleUname}/>
  ```

  ```
  handleUname = (e) => {
    // 设置状态等于输入框的值
    this.setState({
      uname: e.target.value
    });
  }
  ```

## 综合案例

### 静态布局

- 实现表格基本布局
  - 通过组件方式实现表格布局效果
  - 数据临时填充假数据

### 表单值处理

- 表单组件受控处理

```
初始化状态
this.state = {
  bookId: '',
  bookName: ''
}
```

```
label中的htmlFor的值要与对应的input中的id的值一致
<label htmlFor="bookId">图书编号</label>
<input value={this.state.bookId} onChange={this.handleBookId} type="text" id="bookId"/>
<label htmlFor="bookId">图书名称</label>
<input value={this.state.bookName} onChange={this.handleBookName} type="text" id="bookName"/>
```

```
双向绑定之：私有状态等于输入框自带属性value的值
handleBookId = (e) => {
  this.setState({
    bookId: e.target.value
  })
}
handleBookName = (e) => {
  this.setState({
    bookName: e.target.value
  })
}
```

### 准备假数据并动态填充页面

- 模拟异步方式获取假数据

```
constructor(props) {
  super(props)
  this.state = {
    bookId: '',
    bookName: '',
    bookList: []
  }
}
```

```
componentDidMount () {
  // 一般用于获取后台接口数据，现在是模拟了一个假数据列表
  let list = [{
    id: 1,
    bname: '西游记'
  }, {
    id: 2,
    bname: '红楼梦'
  }, {
    id: 3,
    bname: '水浒传'
  }, {
    id: 4,
    bname: '三国演义'
  }]
  模拟异步获取数据
  setTimeout(() => {
    this.setState({
      bookList: list
    })
  }, 1000)
}
```

```
根据数据动态生成元素结构
let tagList = this.state.bookList.map(book => {
  // 其中一行标签布局
  return (
    <tr key={book.id}>
      <td>{book.id}</td>
      <td>{book.bname}</td>
      <td>
        <a href="#">编辑</a>
        <span>|</span>
        <a href="#">删除</a>
      </td>
    </tr>
  )
})
把tagList放到该放的位置
```

### 加载提示效果

- 加载提示效果

  - 数据在加载的过程中，应该进行提示；加载完数据之后再进行数据填充

  ```
  短路表达式  找假，都为真时取后面的
  { this.state.list.length === 0 && <tr><td colspan='3'>正在加载数据...</td></tr> }
  ```

### 添加图书

- 添加图书数据

  - 不要直接修改state中的原有数据，而是要复制一份再修改，然后整体更新

  ```
  jsx元素中提交编辑  和  添加
  <button onClick={ this.state.flag === false ? this.editBook : this.addBook }>提交</button>
  ```

  ```
  addBook = () => {
    // 实现图书添加：
    1、获取表单数据
    let {bookId, bookName} = this.state
    2、把表单数据组合成对象
    let book = {
      id: bookId,
      bname: bookName
    }
    // 3、复制原有的数据列表
    let list = [...this.state.bookList]
    4、添加到列表数组中
    list.push(book)
    5、更新原有列表
  this.setState({
      bookList: list,
      6、清空表单
      bookId: '',
      bookName: ''
    })
  }
  ```


### 表单非空判断与书名排重

- 添加图书表单非空判断

```
if(!this.state.bookId) {
  return alert('请输入图书编号')
}
if(!this.state.bookName) {
  return alert('请输入图书名称')
}
```

- id和书名排重

```
// 0、图书编号和图书名称的重复性验证
let index1 = this.state.bookList.findIndex(book => {
  return this.state.bookId == book.id
})
if (index1 != -1) {
  // 有重复的图书编号，终止添加的动作
  return alert('图书编号重复')
}
let index2 = this.state.bookList.findIndex(book => {
  return this.state.bookName == book.bname
})
if (index2 != -1) {
  // 有重复的图书编号，终止添加的动作
  return alert('图书名称重复')
}
```

- ID只能是数字

  ```
  // 验证ID必须为数字
  let Num = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
  let reg = new RegExp(Num);
  let id = Number(this.state.bookId);
  if (!reg.test(id)) {
  	return alert('请填写数字型编号');
  }
  ```


### 删除图书

- 根据id删除图书信息

  - 先获取要删除的图书的id
  - 根据id获取数据索引
  - 根据索引删除数组中数据

  ```
  jsx元素中，改变this指向和传入ID
  <a href="http://www.baidu.com" onClick={ this.deletebook.bind(this, item.id) }>删除</a>
  ```

  ```
  deleteBook = (id) => {
      // 删除图书
      // 1、获取删除的图书ID
      // 2、复制原始的数据列表
      let list = [...this.state.bookList]
      // 3、根据id查询数组中要删除的数据的索引
      let index = list.findIndex(book => {
        return book.id === id
      })
      // 4、根据索引删除数组中指定数据
      list.splice(index, 1)
      // 5、整体更新列表数据
      this.setState({
        bookList: list
      })
  }
  ```

### 编辑图书-查询信息

- 根据ID查询图书信息

  - 获取要编辑的图书的id
  - 根据id查询要编辑的图书信息
  - 把找到的图书信息更新到表单

  ```
  jsx元素的编辑按钮
  <a href="http://www.baidu.com" onClick={ this.toEdit.bind(this, item.id) }>编辑</a>
  ```

  ```
  toEdit = (id) => {
    // 编辑操作第一步：根据ID查询出图书信息填充表单
    // 1、获取id
    // 2、根据id查询图书信息
    let arr = this.state.bookList.filter(book => {
      return book.id === id
    })
    let book = arr[0]
    // 3、把图书信息填充表单
    this.setState({
      bookId: book.id,
      bookName: book.bname
    })
  }
  ```

### 编辑图书-提交信息

- 修改图书信息后再次提交

  - 先获取id
  - 根据id查询要编辑的图书
  - 找到后直接修改名称

  ```
  jsx元素中提交编辑  和  添加
  <button onClick={ this.state.flag === false ? this.editBook : this.addBook }>提交</button>
  ```

  ```
  // 编辑操作：先拷贝一份，先查找要编辑的图书信息，修改后，整体更新原有数组
  editBook = () => {
    // 编辑图书：根据表单填充的图书编号更新列表中对应的图书名称
    // 1、复制原有数据
    let list = [...this.state.bookList]
    // 2、根据ID查找要修改数据
    list.forEach(book => {
      if(book.id === this.state.bookId) {
        // 找到了，修改图书名称即可
        book.bname = this.state.bookName
      }
    })
    // 3、整体更新列表
    // 4、重置表单
    this.setState({
      bookList: list,
      bookId: '',
      bookName: '',
      // 重置状态位，用于保证可以继续添加图书
      flag: true
    })
  }
  ```

### 控制id不允许修改

- 可以使用readOnly属性进行控制

```
<input readOnly={!this.state.flag} type="text" id="id" value={this.state.id} onChange={this.idHandle} />
```

## 表单详解

- 不同的表单项数据处理（受控组件：双向绑定后，会实时更新的组件是受控组件）

  - input、select和textarea处理方式一样
  - input

  ```
  label标签通过htmlFor属性绑定input的ID来实现点击文字获取光标效果
  输入框的type类型是text
  输入框完成双向绑定，value需要设定为私有状态中的值，onChange绑定的事件中，要让私有状态中的值等于输入框输入的值
  <label htmlFor="uname">用户名：</label>
  <input type="text" id="uname" value={ this.state.uname } onChange={ this.handle }/>
  ```

  ```
  // 用户名双向绑定
  handleuname = function (event) {
  	this.setState({
  		uname: event.target.value
  	});
  }
  ```


- select

  ```
  下拉选项双向绑定，value需要设定为私有状态中的值，onChange绑定的事件中，要让私有状态中的值等于选中项的value，select的值自动等于选中项value的值
  <label htmlFor="job">职业</label>
  <select id="job" value={ this.state.job } onChange={ this.handle }>
  	<option value="code">程序员</option>
  	<option value="sportsman">运动员</option>
  	<option value="pilot">飞行员</option>
  </select>
  ```

  ```
  // 职业双向绑定
  handlejob = function (event) {
  	this.setState({
  		job: event.target.value
  	});
  }
  ```

- textarea

  ```
  多行输入框完成双向绑定，value需要设定为私有状态中的值，onChange绑定的事件中，要让私有状态中的值等于输入框输入的值
  <label htmlFor="synopsis">个人简介</label>
  <textarea value={ this.state.synopsis } onChange={ this.handle } id="synopsis" cols="30" rows="10"></textarea>
  ```

  ```
  handlesynopsis = function (event) {
  	this.setState({
  		synopsis: event.target.value
  	});
  }
  ```

- radio

  ```
  1.单选框的name属性值必须设置，并且要设置成同一个，表示他们是同一类，这样才能实现单选效果
  2.每一项的value值是固定的;同一类单选框，onChange事件要绑定同一个方法
  3.checked的选中状态，根据私有状态中的值做判断
  <input name="gender" id="male" value="male" onChange={ this.handlegender } checked={ this.state.gender === 'male' ? true : '' } type="radio"/>
  ```

  ```
  handlegender = function (event) {
  	// 这个event是合成的，包含原有的event
  	this.setState({
  		gender: event.target.value
  	}, () => {
  		console.log(this.state.gender);
  	});
  }
  ```

- checkbox

  ```
  handleFavour = function (event) {
  	// 控制多选
  	// 当点击多选选项时，每点击一次都会得到对应的value
  	// 需要判断数组中是否已存在该值，来进行下一步操作
  	// 1. 复制一份数据
  	let favourarr = [...this.state.favour];
  	// 2. 遍历查找数据中是否存在该值
  	let index = favourarr.findIndex(item => {
  		return item === event.target.value
  	});
  	// 判断
  	if (index !== -1) {
  		// 存在则从数组中删除该项
  		favourarr.splice(index, 1);
  	} else {
  		// 不存在则添加
  		favourarr.push(event.target.value);
  	};
  	// 调用setState改变状态
  	this.setState({
  		favour: [...favourarr]
  	}, () => {
  		console.log(this.state.favour);
  	});
  }
  ```

  ```
  多选框的name值相同，表示他们是同一类，提交时name值作为提交的数组名称，他并没有更多的作用了
  每一项的value值是固定的，同一类多选框，onChange事件要绑定同一个方法
  checked的选中状态，根据私有状态中的值做判断
  私有状态中是需要添加还是删除点击的值，需要作进一步处理
  <label htmlFor="sing">唱歌</label>
  <input type="checkbox" name="favour" id="sing" value="singing" onChange={ this.handleFavour }/>
  ```

- 表单值绑定方式简化

```
  <input value={this.state.uname} onChange={this.handleItem} type="text" id="uname"/>
```

```
  // 通用的表单域值的绑定方式
  handleItem = (e) => {
    this.setState({
      ES6的新的规则：属性名称可以是动态值
      前提是私有状态中的特性名，等于输入框的id名，可以自己设置
      [e.target.id]: e.target.value
    })
  }
```

- 非受控组件（类似于Vue中ref，实际上就是直接操作DOM）

  - 通过ref实例对象current属性可以得到原生DOM对象
  - 非受控组件可以使用defaultValue指定表单的默认值

  ```
  // 1. 在构造函数中创建引用对象
  this.textInput = React.createRef();
  // 2. jsx元素中关联ref
  <input type="text" ref={this.textInput} />
  // 3. 在方法中使用
  this.textInput.current.focus();
  ```

- 文件上传应用

  ```
  // 1. 在构造函数中创建引用对象
  this.fileRef = React.createRef();
  // 2. 标签中关联ref
  <input type="file" id="file" ref={this.fileRef}/>
  // 3. 在方法中使用
  let fileInfo = this.fileRef.current.files[0];
  ```

## 组件化进阶

### 函数声明

```
function fn () {};
```

### 函数表达式

```
// 函数表达式
let Fn = function (name, age) {
	this.name = name;
	this.age = age;
};
Fn.prototype.seyhi = function () {
	alert(this.name + 'hello');
};
let hello = new Fn('张三', 20);
hello.seyhi();
```

### 类声明

```
class Parent {
	// constructor是prototype的一个属性，指向prototype的构造函数
	constructor (name, age) {
		this.name = name;
		this.age = age;
	}
	// 就是原型方法
	seyhi () {
		alert(this.name + '你好');
	}
}
let lisi = new Parent('李四', 20);
lisi.seyhi();
```

### 类表达式

```
let Student = class {
	// constructor是prototype的一个属性，指向prototype的构造函数
	constructor (name, age) {
		this.name = name;
		this.age = age;
	}
	// 除了constructor,其他都是原型方法
	seyhi () {
		alert(this.name + '今年' + this.age);
	}
}
new Student('王五', 20).seyhi();
```

- 类表达式的继承

```
class Student extends Person {
    constructor(age, score) {
        super(age);
        this.age = age;
        this.score = score;
    }
}
两种方式等效
let Student = class extends Parent {
	// constructor是prototype的一个属性，指向prototype的构造函数
	constructor (name, age) {
		// 表示父类的构造函数，并传递值
		super(name);
	}
}
new Student('wangwu', 20).seyhi();
```

- React.Component如何理解
  - 在React对象中定义了一个类表达式

```
// class Welcome extends React.Component {}
```

```
let React = {
	Webpack: function (name) {
		this.name = name;
		this.seyhi = function (name) {
			alert(this.name + '你好');
		}
	},
	Component: class {
		// constructor是prototype的一个属性，指向prototype的构造函数，所以constructor就是构造函数
		constructor (name) {
			this.name = name;
		}
		seyhi () {
			alert(this.name + '你好');
		}
	}
}
// 在React中的函数不能直接添加原型方法，对象内部不支持webpack.prototype这样写，必须在外部添加原型方法
React.Webpack.prototype.sayhi = function(){
	console.log('原型方法')
}
let Web = new React.Component('如花');
Web.seyhi()
let com = new React.Webpack('赵六');
com.sayhi()
```

### 点标记语法

- 在普通对象中定义类组件（类表达式的方式定义的类组件）

```
  let Area = {
    Header: class extends React.Component {
      render () {
        return (
          <div>
            <h1>Header内容</h1>
          </div>
        );
      }
    }
  }
```

- 也可以这样

```
// 注意表达式不会被提升，所以必须在对象之前定义
let Header = class extends React.Component {
	// 当前类组件导出的内容由render提供
	render () {
		return (
			<h1>头部</h1>
		)
	}
};
// 创建页面对象Html
let Html = {
	Header: Header
};
```

- 父组件中

```
<Html.Header></Html.Header>
```

### 属性延展操作

- 对象的延展操作

```
let info = {
  uname: 'lisi',
  age: 12
}
let obj = {
  ...info,
  gender: 'male'
}
for(let key in info) {
  obj[key] = info[key]
}
console.log(obj)
```

- 可变参数的用法

```
// 在函数参数中使用：可变参数
function fn(a, ...other) {
    // console.log(a)
    console.log(other)
}
fn(12,13,14,15);
```

- 属性的延展操作：用于组件传值

```
父组件
render () {
	let info = {
		name: '张三',
		age: 20,
		gender: '男',
		photo: 120
	};
	// 这样可以取出不需要的数据，只传递需要的数据
	let { name, ...other } = info;
	return (
		<div>
			{/*将info属性传到子组件*/}
			<Class { ...info }></Class>
			<Class { ...other }></Class>
		</div>
	);
}
子组件中
render () {
	let { age, photo, name } = this.props;
	return (
		<div>{ age }{ photo }{ name }</div>
	)
}
```

### children

- children属性基本用法

```
子组件
class TestChildren extends React.Component {
  render () {
    // children属性默认就存在
    // children表示组件标签中间的内容
    let {children} = this.props
    console.log(children)
    return (
      <div>
        <div>测试children</div>
        {children}
      </div>
    )
  }
}
```

```
父组件
<TestChildren>
  <div>
    <div>tom</div>
    <div>jerry</div>
  </div>
</TestChildren>
```

- 类似于vue的插槽

- 组件标签中间的内容赋值给了children属性，实际上就是插槽的内容

  - 通过父组件向子组件传递一个状态位，来间接控制子组件的显示和隐藏

  ```
  父组件中
  class App extends React.Component {
  	// 构造函数
  	constructor (props) {
  		// 调用父类构造函数
  		super(props);
  		// 在state中设置状态位，控制模态窗口
  		this.state = {
  			switch: false
  		};
  		// 改变事件this指向
  		this.handleModal = this.handleModal.bind(this);
  		this.PropsFn = this.PropsFn.bind(this);
  	}
  	// 点击弹出模态窗口
  	handleModal = function () {
  		// 改变状态必须使用setState
  		this.setState({
  			switch: true
  		})
  	}
  	// 组件传值专用函数
  	PropsFn = function (state) {
  		this.setState({
  			switch: state
  		})
  	}
  	render () {
  		return (
  			<div>
  				<button onClick={ this.handleModal }>点击</button>
  				{this.state.switch && <ModalWindow method={ this.PropsFn } title="图书列表">
  					<div>你好</div>
  				</ModalWindow>}
  			</div>
  		);
  	}
  }
  ```

  ```
  子组件中
  let ModalWindow = class extends React.Component {
  	// 组件的构造函数
  	constructor (props) {
  		// 调用父组件的构造函数
  		super(props);
  		// 设置私有状态
  		this.state = {
  			switch: true
  		}
  		// 改变方法内的this
  		this.handleModal = this.handleModal.bind(this);
  	}
  	// 点击关闭模态窗口
  	handleModal = function () {
  		this.props.method(false);
  	}
  	// render方法提供渲染的模板
  	render () {
  		let display = {
  			block: {
  				display: 'block'
  			},
  			none: {
  				display: 'none'
  			}
  		}
  		// 解构出children
  		let { children, title } = this.props;
  		return (
  			<div>
  				<div className="modal-window">
  					<div className="modal-content">
  						<div className="modal-title">
  							<span>{ title }</span>
  							<span onClick={ this.handleModal }>x</span>
  						</div>
  						{ children }
  					</div>
  				</div>
  			</div>
  		)
  	}
  }
  ```

  ```
  样式
  .modal-window {
  	width: 100%;
  	height: 100%;
  	position: fixed;
  	left: 0;
  	top: 0;
  	background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-content {
  	width: 50%;
  	height: 50%;
  	transform: translate(50%, 50%);
  	background-color: #fff;
  }
  .modal-title {
  	width: 100%;
  	padding: 10px;
  	box-sizing: border-box;
  	background-color: #eee;
  	overflow: hidden;
  }
  .modal-title span:nth-child(1),.modal-title span:nth-child(2)  {
  	float: left;
  	display: block;
  	padding: 10px;
  	background-color: #fff;
  }
  .modal-title span:nth-child(2) {
  	float: right;
  }
  ```


## 虚拟DOM

- 为了尽可能少的更新页面的DOM元素（DOM元素的更新比较耗时）
- React的底层通过一种数据结构(虚拟DOM树)描述了真实的DOM树的信息
- 其实每一个虚拟节点VNode就是一个普通对象，用于描述真实的DOM元素
- 如果DOM元素对应的数据发生变化，那么虚拟DOM会进行对比（变化前后的对比）
- 更新后的DOM树会和更新前进行对比（diff算法）
- 对比的结果就是发生变化的虚拟节点VNode集合
- 把上述虚拟节点（普通对象）转化为真实的DOM元素
- 把生成的真实DOM更新到页面

```
var obj = {
  tagName : 'div',
  attrs: {className: 'active'},
  content: 'nihao'
}
let element = document.createElement(obj.tagName);
element.class = obj.attrs.className;
element.innerHTML = obj.content;
div.appendChild(element);
```

## 后台接口调用

- 异步编程
  - 同步与异步之间的差异
    - 同步：需要等响应结果返回再执行下一步
    - 异步：发送请求后必须等待响应结果，继续向下执行；响应结果回来后再执行；
  - postman 不识别中文，需要在浏览器地址栏请求，得到转码之后再在postman中使用
  - 原生Ajax：XMLHttpRequest 对象；默认异步请求
  - jQuery的$.ajax()
  - axios：是通过promise实现对ajax技术的一种封装，就像jQuery实现ajax封装一样。
    简单来说： ajax技术实现了网页的局部数据刷新，axios实现了对ajax的封装。
    - 用于浏览器和node.js的基于Promise的HTTP客户端
    - 1、从浏览器制作XMLHttpRequests
    - 2、从 node.js 创建 http 请求
    - 3、支持Promise API
    - 4、拦截请求和响应
    - 5、转换请求和响应数据
    - 6、取消请求
    - 7、自动转换为JSON数据
    - 8、客户端支持防止XSRF
  - fetch api（原生Ajax的升级版接口）
  - Promise：解决回调地狱
  - async/await：把异步请求变为同步请求

## 基于后台接口的案例

### 图书列表数据加载

- 调用后台接口获取数据，更新state中的数据

```
loadData = async () => {
    // 调用后台接口获取图书列表数据
    // axios.get('http://localhost:3000/books').then(res => {
    //   this.setState({
    //     bookList: res.data
    //   })
    // })
    let res = await axios.get('books')
    this.setState({
      bookList: res.data
    })
}
```

### 添加图书

- 调用后台接口添加图书信息，添加成功之后，刷新页面（后台接口）

```
addBook = async () => {
  // 0、非空验证
  if(!this.state.bookName) {
    alert('请输入图书名称')
    return
  }
  // 调用接口实现添加
  let ret = await axios.post('books', {
    name: this.state.bookName
  })
  if(ret.data.status === 200) {
    // 添加成功，刷新列表
    this.loadData()
    // 清空表单
    this.setState({
      bookId: '',
      bookName: ''
    })
  }
}
```

### 删除图书

- 更加图书的ID删除数据，调用后台接口，成功后刷新列表

```
deleteBook = async (id) => {
  // 删除图书
  let ret = await axios.delete('books/' + id)
  if(ret.data.status === 200) {
    // 删除成功，刷新列表
    this.loadData()
  }
}
```

### 编辑图书-根据ID查询图书

- 更加图书的id查询去图书的详细信息，填充表单

```
toEdit = async (id) => {
  // 编辑操作第一步：根据ID查询出图书信息填充表单
  let ret = await axios.get('books/' + id)
  // 填充表单
  this.setState({
    flag: false,
    bookId: ret.data.id,
    bookName: ret.data.name
  })
}
```

### 编辑图书-编辑提交

- 编辑表单内容之后，再次提交调用接口，成功之后刷新页面，修改添加或者编辑的状态位

```
editBook = async () => {
  // 编辑图书：根据表单填充的图书编号更新列表中对应的图书名称
  let ret = await axios.put('books/' + this.state.bookId, {
    name: this.state.bookName
  })
  if(ret.data.status === 200) {
    // 编辑成功，刷新列表
    this.loadData()
    // 清空表单
    this.setState({
      flag: true,
      bookId: '',
      bookName: ''
    })
  }
}
```

### 图书名称重复验证

- 先验证图书名称是否重复，然后在进行实际操作

```
// 0、图书名称的重复性验证
let flag = await axios.get('books/book/' + this.state.bookName)
if(flag.data.status === 1) {
  alert('图书名称已经存在')
  return 
}
```

### 项目代码优化

```
// axios响应拦截器
axios.interceptors.response.use(function(res) {
  // res是axios包装之后的对象
  return res.data
})
```

## 前端路由

### 路由概念

- 如何理解路由？
  - 路由器：负责分发消息
- 后端路由（MVC）
  - 根据不同的用户请求，响应不同的内容（早期多数都是网页；现在更多的是json数据）
- 前端路由
  - 根据不同的用户行为（事件）展示不同的页面效果（组件），组件中需要的数据可能来自于后端，也可能是前端写死的数据

### SPA（Single Page Application）

- 前端路由要解决的问题：SPA应用的局部更新问题，并且还要支持浏览器地址栏的回退功能
- 通过前端路由实现单页面应用（局部更新）
  - 页面的变化是通过局部更新来实现的
  - 可能会涉及到后台的接口调用：ajax
  - 支持浏览器地址栏回退功能
  - 前端渲染：动态的把服务器获取到的数据填充到HTML标签中

### 前端路由原理

- history api

- hash 哈希（锚点）
  - schema://host:port/path?query#fragment
    - schema：协议 http/https/ftp/files（双击打开时）
    - host: 域名或者IP地址
    - port: 端口，http协议的默认端口80
    - path: 路径  /a/b/c
    - query: 查询字符串  uname=lisi&age=12
    - fragment: 哈希 hash 锚点
  - http://www.baidu.com:80/a/b/c?uname=lisi&age=12#info
  - http://www.baidu.com:80/a/b/c?uname=lisi&age=12#msg
  - hash的变化不会导致浏览器发送请求到服务器
  - 当hash变化时，可以修改页面的内容

```
<div>
    <ul>
		<li>
			<a href="#home">主页</a>
		</li>
		<li>
			<a href="#tech">科技</a>
		</li>
		<li>
			<a href="#edu">教育</a>
		</li>
	</ul>
	<div></div>
</div>
```

```
// hash变化时触发该函数
window.onhashchange = function () {
  // 函数触发后，需要根据不同的hash值，进行页面的更新
  let hash = location.hash.substr(1)
  // 渲染的容器
  let div = document.querySelector('content')
  // 更新页面内容
  switch(hash){
    case 'home':
      info.innerHTML = '主页信息';
      break;
    case 'news':
      info.innerHTML = '新闻信息';
      break;
    case 'tech':
      info.innerHTML = '科技信息';
      break;
  }
}
```

## React-router

- [官网](https://reacttraining.com/react-router)

### 基本使用步骤：在哪里用，在哪里引入

- 路由使用的基本步骤

  - 安装依赖包 

    ```
    npm install react-router-dom -D
    yarn add react-router-dom --dev
    ```

  - 导入相关组件

    ```
    as表示起的别名
    import { BrowserRouter as Router, Route, Link } from "react-router-dom";
    ```

  - 配置路由的容器BrowserRouter（所有的路由相关配置必须包含在容器中）

    ```
    <BrowserRouter>
      react-router需要在BrowserRouter组件包裹下使用
      可以作为App入口组件的跟组件，这样其他组件就不用再引入此组件了
    </BrowserRouter>
    ```

  - 配置路由连接Link（用户点击的链接）

    ```
    Link组件表示跳转元素
    <Link to="/user">用户</Link>
    ```

  - 配置路由填充位置以及路径和组件的映射关系

    ```
    使用 Route 视图容器，把请求地址与响应组件对应;Route展示组件内容，它也会占用空间
    <Route path="/user" component={User} />
    ```

  - 路由组件

    ```
    let User class () {
      return <div>User</div>
    }
    ```

  - 导出组件

  ```
  导出提供渲染的组件
  ```


### 嵌套路由

- 子路由中不再需要BrowserRouter包裹
- 子路由 to、path 的地址必须加上父路由 to、path 的名字

```
// 父级路由
<BrowserRouter>
  <div>
    <div>基本路由</div>
    <ul>
      <li>
        <Link to='/home'>主页</Link>
      </li>
    </ul>
    <Route path='/home' component={Home}/>
  </div>
</BrowserRouter>
```

```
// 子路由配置
function Home() {
  return (
    <div>
      <div>子路由</div>
      <ul>
        <li>
          <Link to='/home/info'>子路由信息</Link>
        </li>
      </ul>
      <Route path='/home/info' component={Tech1}/>
    </div>
  );
}
```

### Switch组件与exact属性

- Switch组件要先引入，并首字母大写

- Switch作用：保证中间的路由映射仅仅匹配一个，如果有多个匹配，以最先匹配的为准
  如果Route组件没有path，会作为默认显示的组件
- Route组件中exact属性的作用：路径进行精确匹配，不会存在包含关系（比如：/about 路径不会匹配 / 路径）

```
<Switch>
  <Route path='/' exact component={Home}/>
  <Route path='/info' component={News}/>
  <Route path='/tech' component={Tech}/>
  <Route component={NoMatch}/>
</Switch>
```



### 重定向

- 在JSX中可以直接使用重定向组件实现跳转

```
function Login() {
  let flag = false;
  // 如果页面中渲染<Redirect to='/tologin'/> 那么就会重定向到to指定位置
  let info = flag? <div>主页信息</div> : <Redirect to='/tologin'/>;
  return info;
}
```

- 配置路由映射时，如果匹配到特定路由就进行跳转

```
<Switch>
  <Route path='/home' component={Home}/>
  <Redirect from='/abc' to='tech'/>
</Switch>
```

### 动态路由

- 路由的路径可以进行模糊匹配

  - 路由映射的path可以是模糊匹配

  - 获取路由参数

    ```
    this.props.match.params中含有所有动态id
    let id = this.props.match.params.id
    ```

  ```
  组件一
  let UserInfo = class extends React.Component {
  	constructor (props) {
  		super(props);
  		this.state = {
  			list: [{
  				id: 123,
  				name: '张三',
  				age: 18
  			}, {
  				id: 456,
  				name: '李四',
  				age: 19
  			}]
  		}
  	}
  	render () {
  		let id = this.props.match.params.id
  		let info = this.state.list.filter(item => {
  			return item.id === parseInt(id)
  		});
  		return (
  			<div>
  				<div>用户信息</div>
  				<div>用户名：{ info[0].name } </div>
  				<div>用户年龄：{ info[0].age }</div>
  			</div>
  		)
  	}
  };
  ```

  ```
  组件二
  let BookInfo = class extends React.Component {
  	render () {
  		let id = this.props.match.params.bid;
  		return (
  			<div>
  				图是信息：{ id }
  			</div>
  		)
  	}
  }
  ```

  ```
  return (
  	<div>
  		<Link to="/user/123">张三</Link>
  		<Link to="/user/456">李四</Link>
  		<Link to="/user/456/book/111">王五</Link>
  		<Link to="/user/456/book/222">赵六</Link>
  	{/*Switch只映射匹配到的第一个组件，不设置path的组件，自动成为默认显示的组件*/}
  		<Switch>
  			这里的exact要加上
  			<Route path='/user/:id' exact component={ UserInfo }></Route> 组件一
  			<Route path='/user/:id/book/:bid' component={ BookInfo }></Route> 组件二
  		</Switch>
  	</div>
  )
  ```

### 编程式导航

**编程式导航就是在函数方法中，通过props中的history对象进行跳转**

**跳转的组件需要是Route中指定的组件，如果没有在Route中指定，需要使用withRouter包裹**