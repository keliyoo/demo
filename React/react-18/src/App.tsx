import { Button, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './App.css';

const InitView: React.FC = () => {
    const renderCount = useRef(0);
    function incrementRenderCount() {
        renderCount.current = renderCount.current + 1;
        console.log(Date.now(), renderCount.current);
        sessionStorage.setItem('InitView_renderCount', renderCount.current + '');
    }

    useEffect(() => {
        console.log('InitView useEffect');
        return () => {
            console.log('InitView unUseEffect');
            sessionStorage.removeItem('InitView_renderCount');
        };
    }, []);

    incrementRenderCount();
    return <p>渲染次数：{renderCount.current}</p>;
};

const ClickChange: React.FC = () => {
    const renderCount = useRef(0);
    function incrementRenderCount() {
        renderCount.current = renderCount.current + 1;
        console.log(Date.now(), renderCount.current);
        sessionStorage.setItem('ClickChange_renderCount', renderCount.current + '');
    }

    const [state1, setState1] = useState(0);
    const [state2, setState2] = useState(0);

    useEffect(() => {
        console.log('ClickChange useEffect');
        return () => {
            console.log('ClickChange unUseEffect');
            sessionStorage.removeItem('ClickChange_renderCount');
        };
    }, []);

    incrementRenderCount();
    return (
        <div>
            <p>渲染次数：{renderCount.current}</p>
            <p>state1：{state1}</p>
            <p>state2：{state2}</p>
            <Button
                onClick={() => {
                    setState1(val => val + 1);
                    setState2(val => val + 1);
                }}
            >
                批量更新 1 & 2
            </Button>
            <Button
                onClick={() => {
                    setTimeout(() => {
                        setState1(val => val + 1);
                        setState2(val => val + 1);
                    }, 0);
                }}
            >
                setTimeout中批量更新 1 & 2
            </Button>
            <Button
                onClick={() => {
                    flushSync(() => {
                        setState1(val => val + 1);
                    });
                    setState2(val => val + 1);
                }}
            >
                破坏批量更新 1 & 2
            </Button>
        </div>
    );
};

function App() {
    const [selectVal, setSelectVal] = useState('InitView');

    return (
        <div className='App'>
            <header className='App-header'>
                <p>Hello React-18!</p>

                <Select value={selectVal} onChange={val => setSelectVal(val)} style={{ width: 120 }}>
                    <Select.Option value='InitView'>InitView</Select.Option>
                    <Select.Option value='ClickChange'>ClickChange</Select.Option>
                    <Select.Option value='lucy3'>Lucy3</Select.Option>
                    <Select.Option value='lucy4'>Lucy4</Select.Option>
                </Select>

                <div style={{ minHeight: '50vh', padding: '20px' }}>
                    {selectVal === 'InitView' && <InitView />}
                    {selectVal === 'ClickChange' && <ClickChange />}
                </div>
            </header>
        </div>
    );
}

export default App;
