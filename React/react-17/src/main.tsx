import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';

const root = document.getElementById('root')!;

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
