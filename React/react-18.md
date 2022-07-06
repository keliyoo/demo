# React-18

## 兼容性

- 放弃了对 ie11 的支持

## TypeScript 类型定义

- 组件props的 TypeScript 定义中不再包含children，需要显式的定义

## 严格模式

- constructor函数运行2次
- getDerivedStateFromProps函数运行2次
- shouldComponentUpdate函数运行2次
- render函数第一次运行2次，update的时候运行2次
- 函数组件体
- hooks:传入useState,useMemo或useReducer的函数会运行2次

- React17会隐藏第二次打印的log, 18改为显示
- React18初始会对组件进行卸载安装一次

## Render Api

- 18版本保留了对于旧的Render Api的支持 但会报错提示

```js
react-dom.development.js:86 
       Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
```

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

### createRoot

- 新的Render Api去除了回调函数
- 只有createRoot创建的才会使用并发模式
- 只有使用并发特性才会开启并发更新
  - 并发更新会从同步不可中断更新变成了异步可中断更新

#### 自动批处理

- 批处理：将多个状态更新合并成一次更新
- React旧版本render方法只会在 React 事件处理函数中设置的多个状态才会合并
- 新版本任何情况都会自动执行批处理

### flushSync

- 用于破坏批处理
- flushSync内部的多个 setState 仍然为批量更新

``` tsx
flushSync(() => {
    setCount1(count => count + 1);
});
// 第一次更新
flushSync(() => {
    setCount2(count => count + 1);
});
```

### startTransition 和 useDeferredValue

- 延迟本次更新
- useTransition 包装方法 把更新任务变成了延迟更新任务
- useDeferredValue 包装值 产生一个新的值，这个值作为延时状态

```js
//startTransition有两种使用形式
import { startTransition, useTransition } from 'react';

const Demo: React.FC = () => {
    const [state1, setState1] = useState(0);
    const [state2, setState2] = useState(0);
    const [stateDeferred, setStateDeferred] = useState(0);
    const [stateDelayed, setStateDelayed] = useState(0);
    const [stateDelayed1, setStateDelayed1] = useState(0);
    const [isPending, startTransition1] = useTransition();
    useEffect(() => {
        setState2(state2 + 1);
    }, [state1]);

    const deferredState = useDeferredValue(stateDeferred);
    console.log(state1, state2, stateDelayed, stateDelayed1, isPending, stateDeferred, deferredState);
    return (
        <p
            onClick={() => {
                startTransition(() => {
                    setStateDelayed(state => state + 1);
                });
                startTransition1(() => {
                    setStateDelayed1(state => state + 1);
                });
                setState1(state => state + 1);
                setStateDeferred(state => state + 1);
            }}
        >
            state1: {state1}<br />
            state2: {state2}<br />
            stateDelayed: {stateDelayed}<br />
            stateDelayed1: {stateDelayed1}<br />
            stateDeferred: {stateDeferred}<br />
            deferredState: {deferredState}
        </p>
    );
};

```

## 其他新API

- useSyncExternalStore
  - useSyncExternalStore 能够通过强制同步更新数据让 React 组件在 并发模式 下安全地有效地读取外接数据源。 在 并发模式 下，React 一次渲染会分片执行（以 fiber 为单位），中间可能穿插优先级更高的更新。假如在高优先级的更新中改变了公共数据（比如 redux 中的数据），那之前低优先的渲染必须要重新开始执行，否则就会出现前后状态不一致的情况。
  - useSyncExternalStore 一般是三方状态管理库使用，日常业务中不需要关注
- useInsertionEffect
  - DOM 生成之后，useLayoutEffect 之前
  - 此时无法访问 DOM 节点的引用，一般用于提前注入 style 脚本
  - 只建议 css-in-js 库来使用

## 空组件

- 在 React 17 中，如果你需要返回一个空组件，React只允许返回null。如果你显式的返回了 undefined，控制台则会在运行时抛出一个错误。
- 在 React 18 中，不再检查因返回 undefined 而导致崩溃。既能返回 null，也能返回 undefined. 但是 React 18 类型定义还是只检查null, undefined会报错

## 其他

- 去除了 卸载组件时的更新状态警告

```js
// 卸载组件时的更新状态警告
react_devtools_backend.js:4026 
       Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

## 示例

- [React17开发模式](https://keliyoo.github.io/demo/React/react-17/dist-dev/)
- [React18开发模式](https://keliyoo.github.io/demo/React/react-18/dist-dev/)

- [React17生产模式](https://keliyoo.github.io/demo/React/react-17/dist/)
- [React18生产模式](https://keliyoo.github.io/demo/React/react-18/dist/)

## 相关资料

- react github
  - [去除卸载组件警告](https://github.com/reactwg/react-18/discussions/82)
  - [自动批处理](https://github.com/reactwg/react-18/discussions/21)
  - [startTransition](https://github.com/reactwg/react-18/discussions/100)
  - [useSyncExternalStore](https://github.com/reactwg/react-18/discussions/86)
