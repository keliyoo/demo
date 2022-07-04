# React18

## 变化

- 放弃了对 ie11 的支持
- 组件props的 TypeScript 定义中不再包含children，需要显式的定义

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