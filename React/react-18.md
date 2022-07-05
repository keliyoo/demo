# React-18

## 兼容性

- 放弃了对 ie11 的支持

## TypeScript 类型定义

- 组件props的 TypeScript 定义中不再包含children，需要显式的定义

## 严格模式

- React 会对每个组件进行两次渲染
  - React17会隐藏第二次的log, 18显示
- 18初始会对组件进行卸载安装一次

## Render Api

- 18版本保留了对于旧的Render Api的支持

```tsx
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.render(<App />, root, () => {
  console.log('渲染完成')
});
// ssr服务端渲染
ReactDOM.hydrate(<App />, root);
// 卸载
ReactDOM.unmountComponentAtNode(root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(<App />);
// ssr服务端渲染
ReactDOM.hydrateRoot(root, <App />);
// 卸载
root.unmount();
```

### new Render Api

- 新的Render Api去除了回调函数

#### 自动批处理

- 批处理：将多个状态更新合并成一次更新
- React旧版本render方法只会在 React 事件处理函数中设置的多个状态才会合并
- 新版本任何情况都会自动执行批处理
