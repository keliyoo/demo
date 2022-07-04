import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'

const root = document.getElementById('root')!;

console.log('old');

ReactDOM.render(<App />, root, () => {
    console.log('渲染完成');
});

// ReactDOM.unmountComponentAtNode(root);

// ReactDOM.hydrate(<App />, root);
