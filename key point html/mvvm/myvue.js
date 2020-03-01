function EventEmitter () {
  // { 'click': [fn1, fn2], 'over': [fn] }
  this.handlers = {}
  // {'click': [fn1]}
}

EventEmitter.prototype.$on = function (eventType, handler) {
  // 如果handlers里面没有内容的时候，需要初始化成数组
  // if (!this.handlers[eventType]) {
  //   this.handlers[eventType] = []
  // }
  // this.handlers[eventType].push(handler)

  this.handlers[eventType] = this.handlers[eventType] || []
  this.handlers[eventType].push(handler)
}


//  ...rest 剩余参数，把调用时候的参数，放到了 rest 数组中
EventEmitter.prototype.$emit = function (eventType, ...rest) {
  // 当没有注册事件，直接返回
  if (!this.handlers[eventType]) {
    return
  }
  console.log(this)
  this.handlers[eventType].forEach((handler) => {
    // 执行函数
    // handler()
    // handler(...rest)
    // 改变this
    handler.apply(this, rest)
  })
}

// -----------------------上面是实现事件机制--------------------

// 1. 创建 MyVue 的构造函数
function Vue (options) {
  // options { el: '#app', data: { msg: 'xx' } }
  this.$el = document.querySelector(options.el)
  this.$data = options.data || {}
  // 给 vue 实例增加 $emit  和 $on
  const em = new EventEmitter()
  // this.$on = em.$on
  // this.$emit = em.$emit
  for (let key in em) {
    this[key] = em[key]
  }


  // 2. 数据劫持
  //    当数据变化的时候，要去更新 dom
  for (let key in this.$data) {
    // 给 this （vue的实例） 挂载 set/get
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      get () {
        return this.$data[key]
      },
      set (value) {
        this.$data[key] = value
        // 当数据变化的时候，要去更新 dom
        // 通知“所有人”，数据变化了
        // 此处的事件名称使用的是 发生变化的属性名称
        this.$emit(key)
      }
    })
  }

  // 把 methods 里面的成员都 挂载到vue实例上
  for (let key in options.methods) {
    this[key] = options.methods[key]
  }


  // 3. 编译模板--Compiler
  //    找到模板中的差值表达式和指令，替换成响应的数据
  new Compiler(this)
  //    当视图中更新数据，data 中的数据也要更新
}

// --------------------------下面是实现编译模板-----------------------

function Compiler (vm) {
  this.vm = vm
  this.compile(vm.$el)
}

Compiler.prototype.compile = function (el) {
  // console.log(el.childNodes)
  // 遍历所有的node
  el.childNodes.forEach((node) => {
    // 判断是文本节点，元素节点
    if (node.nodeType === 1) {
      // 元素节点
      this.compileElement(node)
      // 递归调用
      this.compile(node)
    } else if (node.nodeType === 3) {
      // 文本节点
      this.compileText(node)
    }
  })
}

// 处理元素节点
Compiler.prototype.compileElement = function (node) {
  // console.dir(node.attributes)
  // node.attributes 是一个伪数组
  // console.log(Array.from(node.attributes))
  Array.from(node.attributes).forEach((attr) => {
    // attr 就是node中的每一个属性
    // name ---> v-model
    // value ---> message
    const { name, value } = attr
    // 判断当前属性是否是 vue 的指令
    if (!name.startsWith('v-')) {
      return
    }

    if (name === 'v-model') {
      node.value = this.vm[value]
      // value ---> message
      this.vm.$on(value, () => {
        node.value = this.vm[value]
      })
      // v-model 当视图变化，更新数据
      node.oninput = () => {
        this.vm[value] = node.value
      }
    } else if (name.startsWith('v-on:')) {
      // name ----> v-on:click
      // value -----> handleClick
      
      const eventType = name.replace('v-on:', '')
      node.addEventListener(eventType, () => {
        this.vm[value]()
      })
    }
    console.log(name)
  })
}
// 处理文本节点
Compiler.prototype.compileText = function (node) {
  // console.log(node)
  // {{ msg }}
  // 匹配差值表达式的样子
  // 正则表达式中的()还有一层含义，分组，()对应的数据中的内容就是分组的内容，可以通过RegExp.$1
  const reg = /\{\{(.+)\}\}/
  if (reg.test(node.nodeValue)) {
    // node.nodeValue  --> {{ message }}
    // key ---> message
    const key = RegExp.$1.trim()
    node.nodeValue = this.vm[key]
     // key ---> message
    this.vm.$on(key, () => {
      node.nodeValue = this.vm[key]
    })

    // console.log(node)
    // const key = 'message'
    // this.vm.$data.message
    // this.vm.$data[key]
    // this.vm[key]
  }
}