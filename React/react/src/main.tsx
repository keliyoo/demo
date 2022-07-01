// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// const root = document.getElementById('root')!;

// ReactDOM.render(<App />, root, () => {
//     console.log('渲染完成');
// });

// ReactDOM.unmountComponentAtNode(root);

// ReactDOM.hydrate(<App />, root);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const oldLog = console.log
window.console.log = function (...a) {
    oldLog('react-18', ...a)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// root.unmount();

// ReactDOM.hydrateRoot(root, <App />);
