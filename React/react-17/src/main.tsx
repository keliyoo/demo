import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
(window as any).react = React;
const root = document.getElementById('root')!;

const oldLog = console.log
window.console.log = function (...a) {
    oldLog('react-17', ...a)
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    root,
    () => {
        console.log('渲染完成');
    }
);

// ReactDOM.unmountComponentAtNode(root);

// ReactDOM.hydrate(<App />, root);
