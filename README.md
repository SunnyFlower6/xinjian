# layout-ui 框架UI

## 目录

- [准备](#准备)
- [使用组件](#使用组件)
   - [导入框架UI组件](#导入框架ui组件)
   - [运行框架UI组件](#运行框架ui组件)
- [框架UI导出内容](#框架UI导出内容)
   - [axios](#axios)
   - [layout](#layout)
   - [IconsData](#iconsdata)
   - [LayoutLR](#layoutlr)
   - [TransitionEx](#transitionex)
- [框架UI集成内容](#框架UI集成内容)
   - [clickoutside命令](#clickoutside命令)
- [发布](#发布)

## 准备

在package.json中添加依赖

```bash
"@archser/layout-ui": "git+http://gitlab.archser.com/QingDaoPSB/layout-ui-develop.git"
```

### 导入框架UI组件

导入框架UI的入口函数和样式

```js
import { layout } from '@archser/layout-ui'
import '@archser/layout-ui/dist/layout-ui.css'
```

### 运行框架UI组件

```js
layout(routeConfig, storeConfig, appConfig)
```

- routeConfig 参考[这里](https://router.vuejs.org/zh/api/#router-构建选项)。顶层路由存在子路由时无需执行 `component` 属性，例：

```js
{
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home_index',
          meta: {
            title: '应用管理'
          },
          component: () => import('@/views/app/App.vue')
        },
        {
          path: 'setting',
          name: 'setting',
          meta: {
            title: '配置'
          },
          component: () => import('@/views/setting/Setting.vue')
        }
      ]
    }
  ]
}
```

- storeConfig 参考[这里](https://vuex.vuejs.org/zh/api/#vuex-store-构造器选项)

> 虽然storeConfig中的state、mutations、actions、modules会分别于框架内部对应的属性合并，但我们建议仅定义自己的modules，然后合并到框架内部，这样便于状态的模块化管理，更易于解耦，避免发生与 `rootState` 冲突。下面是 `rootState` 数据，包含用户信息、全局配置、应用菜单等信息：

```js
{
  state: {
    config: {}
    userInfo: {
      avatar：'',
      name: ''
    },
    apps: [],
    token: ''
  }
}
```

- appConfig

|配置项|说明|
|----|----|
|app|应用名称|
|logo|应用左上角logo|
|name|应用中文名称|
|cookieExpires|cookie超期时间, 默认1天|

``` js
{
  app: 'aserver',
  logo: '/logo.png',
  name: '目录',
  cookieExpires: 1
}
```

## 框架UI导出内容

```js
import {
  axios,
  layout,
  IconsData,
  LayoutLR,
  TransitionEx
} from '@archser/layout-ui'
```

### axios

HTTP 客户端，框架UI封装后的axios实例对象。
- 请求参数处理，参数采用 `application/x-www-form-urlencoded; charset=UTF-8` 标准头。
- 失败响应拦截器，统一拦截处理异常错误。

### layout

参见 [运行框架UI组件](#运行框架UI组件)

### IconsData

字体图标数据集，可以提供选择图标场景使用。使用 `Font Awesome` v4.7版本。具体图标示例参考 [官方网站](https://fontawesome.com/v4.7.0/icons/)，或者访问框架UI的图标示例路由 `/icons/index`。

示例：

```js
{
  icons: [
    {
      name: 'Glass',
      id: 'glass',
      unicode: 'f000',
      created: 1,
      filter: ['martini', 'drink', 'bar', 'alcohol', 'liquor'],
      categories: ['Web Application Icons']
    },
    {
      name: 'Music',
      id: 'music',
      unicode: 'f001',
      created: 1,
      filter: ['note', 'sound'],
      categories: ['Web Application Icons']
    },
    ...
  ]
}
```

### LayoutLR

比较常用的左右布局样式的Vue组件。

示例：

```html
<LayoutLR title="消息中心">
  <div slot="left">
    左侧内容
  </div>
  <div slot="right">
    右侧内容
  </div>
</LayoutLR>
```

- 属性

|属性名|类型|说明|
|-----|----|----|
|title|String|布局左上角显示内容，作为醒目的标题显示|

- 插槽

|插槽名|说明|
|-----|----|
|title|布局左上角显示内容，作为醒目的标题显示，替换同名 `title` 属性|
|left|左侧内容，可以放置菜单选项等|
|right|右侧内容，放置主要业务逻辑界面|

### TransitionEx

封装常用的过渡动画Vue组件。过渡动画使用 [Velocity.js](http://velocityjs.org)实现。

示例，内容显示时的样式从隐藏状态变为透明度0.3的样式，内容隐藏时则相反：

```html
<TransitionEx :show="showStyle" :hidden="hiddenStyle">
  <div>
    过渡动画应用内容
  </div>
</LayoutLR>
```

```js
export default {
  data () {
    return {
      showStyle: { opacity: 0.3 },
      hiddenStyle: { opacity: 0 }
    }
  }
}
```

- 属性

|属性名|类型|说明|
|-----|----|----|
|before|Object|进入过渡动画前的样式，可以为空|
|show|Object、String|内容显示时的样式，或者Velocity.js支持的动画指令|
|hidden|Object、String|内容隐藏时的样式，或者Velocity.js支持的动画指令|

- 插槽

默认插槽，过渡动画应用的内容

## 框架UI集成内容

### clickoutside命令

框架UI对Vue组件扩展了 `v-clickoutside` 命令，使用 `v-clickoutside` 命令可以处理元素外部点击事件。下面是示例：

```html
<template>
  <div v-clickoutside="handleOut">
    内容
  </div>
</template>
```

```js
handleOut () {
  console.log('点击了内容元素外部区域')
}
```

