import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.render(<App />, root, () => {
    console.log('渲染完成');
});

// ReactDOM.unmountComponentAtNode(root);

// ReactDOM.hydrate(<App />, root);
