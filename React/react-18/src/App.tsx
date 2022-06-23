import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    useEffect(() => {
        console.log('App 渲染完成');
    }, []);
    console.log('render');
    
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>Hello React18!</p>
            </header>
        </div>
    );
}

export default App;
