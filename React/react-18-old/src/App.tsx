import { useEffect, useRef, useState } from 'react';
import './App.css';

// interface MyButtonProps {
//     color: string;
// }

// const MyButton: React.FC<MyButtonProps> = ({ children }) => {
//     // 在 React 18 的 FC 中，不存在 children 属性，需要手动申明
//     return <div>{children}</div>;
// };

function App() {
    const renderCount = useRef(0);

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('渲染完成');
        setCount(count => count + 1)
    }, []);
    console.log('render');
    renderCount.current++;

    return (
        <div className='App'>
            <header className='App-header'>
                <p>Hello React-18-old!</p>
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
