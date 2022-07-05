# React18

## 变化

- 放弃了对 ie11 的支持
- 组件props的 TypeScript 定义中不再包含children，需要显式的定义
- 去除了 卸载组件时的更新状态警告 [github讨论](https://github.com/reactwg/react-18/discussions/82)

```js
// 卸载组件时的更新状态警告
react_devtools_backend.js:4026 
       Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

## 新特性

### Render Api

```tsx
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.render(<App />, root);
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

- 18版本保留了对于旧的Render Api的支持
