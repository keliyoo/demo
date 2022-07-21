import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;

console.log('old');

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    root,
    () => {
        console.log('渲染完成');
    }
);