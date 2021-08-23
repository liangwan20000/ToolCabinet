# Vue 进阶

## 访问组件 & 元素

### 访问根实例

- 小型应用中可以在 vue 根实例里存储共享数据
- 组件中可以通过 $root 访问根实例
  - `$root`

### 访问父组件

- 可以使用这种方式替换 prop 方式父给子传值
- 但是这种方式应该尽量避免使用，因为：如果值改变了，很难确认值是在哪里变化的
- 使用方式
  - `$parent`

### 访问子组件

- 获取子组件内的 DOM 元素
- 调用子组件内部的方法，例如：vant 中访问表单的方法
- 使用方式
  - `$refs`

### 依赖注入

- 如果组件嵌套比较深 (a=>b=>c=>d)，并且所有后代组件都依赖于 a 组件的数据或者方法

- 此时虽然通过 $parent 也可以实现，但是比较麻烦，此时可以使用依赖注入的方式

- 使用方式

  - 父组件中

    ```js
    // 组件的选项中添加
    provide: function () {
      return {
        getMap: this.getMap
      }
    }
    ```

  - 所有子组件中

    ```js
    // 组件的选项中添加
    inject: ['getMap']
    ```

- 注意：

  - 可以把依赖注入看成大范围的 prop
  - **这种方式的数据是非响应式的**
  - 负面影响：耦合变高，使重构变得更加困难

## 设置子组件的特性&事件

- 封装通用组件的时候使用
- 调用组件的时候给目标标签设置属性
- 调用组件的时候给组件内部的元素设置原生事件

### 设置属性

[https://cn.vuejs.org/v2/guide/components-props.html#%E6%9B%BF%E6%8D%A2-%E5%90%88%E5%B9%B6%E5%B7%B2%E6%9C%89%E7%9A%84%E7%89%B9%E6%80%A7](https://cn.vuejs.org/v2/guide/components-props.html#替换-合并已有的特性)

#### 父组件的特性默认会传递给子组件内的根元素

- class 和 style 会合并

#### 如果子组件有 props 则不会设置元素的特性

- 父组件设置特性，并和子组件设置 props 重合，不会给元素设置特性，props: ['required']

- `inheritAttrs: false` 禁止子组件的根元素设置特性

- 子组件中通过 `$attrs` 给特定元素绑定父组件传过来的特性

  ```html
  <input type="text" v-bind="$attrs" class="color">
  ```

#### 注意

- 事件不会传递(自定义事件)
- props 中不能定义 class/style (class/style不会传递)

### 设置事件

```html
<moo placeholder="" required @focus="handleFocus" @blur="handleBlur"></moo>
```

- 父组件调用传入的是自定义事件，需要在子组件中触发事件

  ```html
  <input type="text" @focus="$emit('focus', $event)">
  <!-- $event 是触发事件的时候，把事件对象传入调用方法中 -->
  ```

- 上面的使用方式过于麻烦，可以类似 `$attrs` 的方式简化

  ```html
  <input type="text" v-on="$listeners">
  ```

- `$listeners` 和 `$attrs` 使用方式类似

  - `$attrs` 设置父组件传来的所有特性，不包含事件

  - `$listeners` 设置父组件传来的所有事件

    ```html
    <input type="text" v-on="$listeners" v-bind="$attrs">
    ```

## 插槽

- 可以制作更灵活的组件，例如：vant 中的 card 等组件

- 插槽，就是可以在使用子组件的时候，指定子组件内部的内容

### 匿名插槽

- 子组件中

  ```html
  <main>
    <slot></slot>
  </main>
  ```

- 父组件调用

  ```html
  <card>
    这是卡片中的内容
  </card>
  ```

### 命名插槽

- 子组件中

  ```html
  <header>
    <slot name="header"></slot>
  </header>
  <footer>
    <slot name="footer"></slot>
  </footer>
  ```

- 父组件中调用

  - vue 2.6.0 中使用的方式
  - v-slot:子组件中的插槽名称
  - 注意：名称没有引号

  ```html
  <card>
    <template v-slot:header>
      <h1>title</h1>
    </template>
    这是卡片中的内容
    <template v-slot:footer>
      <p>foot</p>
    </template>
  </card>
  ```

- 简写形式

  ```html
  <template #footer>
    <p>foot</p>
  </template>
  ```

- 废弃的形式

  <https://cn.vuejs.org/v2/guide/components-slots.html#%E5%BA%9F%E5%BC%83%E4%BA%86%E7%9A%84%E8%AF%AD%E6%B3%95>

### 作用域插槽

- 插槽的模板，和插槽的定义在不同的组件中，有不同的作用域

- 可以让插槽，放到到子组件中的数据
- 例如：vant 中的表格

#### 使用方式

- 子组件中

  ```html
  <main>
    <slot v-bind:abc="msg" v-bind:count="count"></slot>
  </main>
  ```

- 父组件中使用

  ```html
  <template #default="scope">
    这是卡片中的内容
    {{ scope }}
  </template>
  ```

- 废弃的形式

  <https://cn.vuejs.org/v2/guide/components-slots.html#%E5%B8%A6%E6%9C%89-slot-scope-%E7%89%B9%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD>

## 动态组件和异步组件

- 例如：登录和注册切换的时候

- 地址：

  https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive

### 动态组件

```html
<keep-alive>
   <component :is="component"></component>
</keep-alive>
```

- 使用 keep-alive 保存动态组件的状态

### 异步组件

- 当需要的时候再去加载组件
- 路由的懒加载，就是加载异步组件

```js
components: {
  Login: () => import('./components/Login'),
  Register: () => import('./components/Register')
}
```

## 模态框组件

<https://codepen.io/search/pens?q=vue%20modal&page=1&order=popularity&depth=everything>

### 普通组件

<iframe height="265" style="width: 100%;" scrolling="no" title="Vue.js模式组件（弹出一个窗口）" src="//codepen.io/chentianwei411/embed/KGwNXB/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chentianwei411/pen/KGwNXB/'>Vue.js模式组件（弹出一个窗口）</a> by chen
  (<a href='https://codepen.io/chentianwei411'>@chentianwei411</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### JavaScript 方式调用的组件

#### 在 Modal.vue 的同级目录创建 js 文件

```js
import Model from './Modal.vue'

// 导出 vue 的创建
export default {
  install (Vue, option) {
    // 使用 Vue.extend 基于组件，创建一个组件的构造器
    const MyModal = Vue.extend(Model)
		
    // 设置 vue 的全局方法
    Vue.prototype.$modal = ({
      show
    }) => {
      // 创建组件的实例
      const instance = new MyModal()
      instance.isShow = show
      // 获取组件编译的结果
      const element = instance.$mount().$el
      // 添加到页面
      document.body.append(element)
    }
  }
}
```

#### 在 main.js 中注册插件

```js
import Modal from './components/Modal'
Vue.use(Modal)
```

## 服务端渲染

### 介绍

- Server Side Render (服务端渲染 SSR)：服务器直接生成 HTML 文档返回给浏览器，但页面交互能力有限。适合于任何后端语言：PHP、Java、Python、Go 等。
  - 优点：响应速度快，有利于 SEO
  - 缺点：前后端代码混合在一起，难以开发和维护，不适合进行前后端分离开发
- Client Side Render (客户端渲染 CSR)：页面初始加载的 HTML 文档中无核心内容，需要下载执行 js 文件，由浏览器动态生成页面，并通过 JS 进行页面交互事件与状态管理
  - 优点：适合前后端分离开发，方便维护，单页应用中几乎都是客户端渲染
  - 缺点：首次加载慢，不利于 SEO
- SPA 单页应用

### Vue 的 SSR

<https://ssr.vuejs.org/zh/>

- 便于 ToC 项目的 SEO
- 提高首页渲染速度

#### Nuxt.js

[https://nuxtjs.org](https://nuxtjs.org/)

- 项目搭建
- 路由
  - 会根据 pages 目录结构，自动生成路由表
- 异步数据
  - 服务端渲染/路由跳转之前被调用
  - 数据会直接渲染到页面上，便于 SEO
  - 返回的对象，会和 data 混合在一起供页面使用
  - 没有 this
- Nuxt 生命周期，在服务端执行的钩子函数
  - asyncData
  - beforeCreate
  - created

### RealWorld 案例

- demo 演示

<https://demo.realworld.io/#/>

- 所需资源

<https://github.com/gothinkster/realworld-starter-kit>

#### 实现

- 搭建项目结构
- 创建页面 pages
- 搭建布局/视图
- 封装发送请求的库/api
- 获取文章列表
- 获取 tag 列表
- 处理导航，高亮显示
- 登录
- 记录登录状态
- 退出























