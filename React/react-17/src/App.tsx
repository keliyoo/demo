import { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const renderCount = useRef(0);

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('渲染完成');
    }, []);
    console.log('render');
    renderCount.current++;

    return (
        <div className='App'>
            <header className='App-header'>
                <p>Hello React18!</p>
                <p>渲染次数：{renderCount.current}</p>
                <p>
                    <button type='button' onClick={() => setCount(count => count + 1)}>
                        count is: {count}
                    </button>
                </p>
                <p>渲染次数：{renderCount.current}</p>
                <p>渲染次数：{renderCount.current}</p>
            </header>
        </div>
    );
}

export default App;
