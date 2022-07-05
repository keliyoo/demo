import { Button, Col, Row, Select } from 'antd';
import { ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './App.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';

let initViewNum = 0;
const InitView: React.FC = () => {
    const renderCount = useRef(0);
    const useEffectrCount = useRef(0);
    const [state, setState] = useState(0);

    useEffect(() => {
        console.log('InitView useEffect');
        return () => {
            console.log('InitView unUseEffect');
        };
    }, []);
    useEffect(() => {
        console.log('useEffectrCount', new Date().toJSON(), ++useEffectrCount.current);
    });
    console.log(new Date().toJSON(), ++renderCount.current, ++initViewNum);
    sessionStorage.setItem('InitView_renderCount', renderCount.current + ' ' + initViewNum);

    return (
        <p>
            组件执行次数：{renderCount.current} {initViewNum}
            <br />
            <span>
                state: {state} <Button onClick={() => setState(state => state + 1)}>增加</Button>
            </span>
        </p>
    );
};
const initViewString = `let initViewNum = 0;
const InitView: React.FC = () => {
    const renderCount = useRef(0);
    const useEffectrCount = useRef(0);
    const [state, setState] = useState(0);

    useEffect(() => {
        console.log('InitView useEffect');
        return () => {
            console.log('InitView unUseEffect');
        };
    }, []);
    useEffect(() => {
        console.log('useEffectrCount', ++useEffectrCount.current);
    });
    console.log(Date.now(), ++renderCount.current, ++initViewNum);
    sessionStorage.setItem('InitView_renderCount', renderCount.current + ' ' + initViewNum);

    return (
        <p>
            组件执行次数：{renderCount.current} {initViewNum}
            <br />
            <span>
                state: {state} <Button onClick={() => setState(state => state + 1)}>增加</Button>
            </span>
        </p>
    );
};`;

const EffectChange: React.FC = () => {
    const renderCount = useRef(0);
    const [state, setState] = useState(0);
    const [state1, setState1] = useState(0);
    const [stateFun, setStateFun] = useState(0);
    useEffect(() => {
        console.log('EffectChange useEffect');
        return () => {
            console.log('EffectChange unUseEffect');
        };
    }, []);
    useEffect(() => {
        setState1(state1 + 1);
        setStateFun(state => state + 1);
    }, [state]);
    console.log(Date.now(), ++renderCount.current);
    sessionStorage.setItem('EffectChange_renderCount', renderCount.current + '');

    return (
        <p>
            <span>组件执行次数：{renderCount.current}</span>
            <br />
            <span>
                state: {state} <Button onClick={() => setState(state => state + 1)}>增加</Button>
            </span>
            <br />
            <span>state1: {state1}</span>
            <span>stateFun: {stateFun}</span>
        </p>
    );
};
const effectChangeString = `const EffectChange: React.FC = () => {
    const renderCount = useRef(0);
    const [state, setState] = useState(0);
    const [state1, setState1] = useState(0);
    const [stateFun, setStateFun] = useState(0);
    useEffect(() => {
        console.log('EffectChange useEffect');
        setState(state => state + 1);
        return () => {
            console.log('EffectChange unUseEffect');
        };
    }, []);
    useEffect(() => {
        setState1(state1 + 1);
        setStateFun(state => state + 1);
    }, [state]);
    console.log(Date.now(), ++renderCount.current);
    sessionStorage.setItem('EffectChange_renderCount', renderCount.current + '');

    return (
        <p>
            <span>组件执行次数：{renderCount.current}</span>
            <br />
            <span>
                state: {state} <Button onClick={() => setState(state => state + 1)}>增加</Button>
            </span>
            <br />
            <span>state1: {state1}</span>
            <span>stateFun: {stateFun}</span>
        </p>
    );
};`;

const ClickChange: React.FC = () => {
    const renderCount = useRef(0);
    const [state1, setState1] = useState(0);
    const [state2, setState2] = useState(0);
    useEffect(() => {
        console.log('ClickChange useEffect');
        return () => {
            console.log('ClickChange unUseEffect');
            sessionStorage.removeItem('ClickChange_renderCount');
        };
    }, []);
    console.log(Date.now(), ++renderCount.current);
    sessionStorage.setItem('ClickChange_renderCount', renderCount.current + '');

    return (
        <div>
            <p>组件执行次数：{renderCount.current}</p>
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
const clickChangeString = `const ClickChange: React.FC = () => {
    const renderCount = useRef(0);
    const [state1, setState1] = useState(0);
    const [state2, setState2] = useState(0);
    useEffect(() => {
        console.log('ClickChange useEffect');
        return () => {
            console.log('ClickChange unUseEffect');
            sessionStorage.removeItem('ClickChange_renderCount');
        };
    }, []);
    console.log(Date.now(), ++renderCount.current);
    sessionStorage.setItem('ClickChange_renderCount', renderCount.current + '');

    return (
        <div>
            <p>组件执行次数：{renderCount.current}</p>
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
};`;

const AsyncSetState: React.FC = () => {
    const renderCount = useRef(0);
    const [state, setState] = useState(0);
    useEffect(() => {
        console.log('AsyncSetState useEffect');
        return () => {
            console.log('AsyncSetState unUseEffect');
        };
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setState(state => state + 1);
        }, 1000);
    }, [state]);
    console.log(Date.now(), ++renderCount.current);
    sessionStorage.setItem('AsyncSetState_renderCount', renderCount.current + '');

    return (
        <p>
            组件执行次数：{renderCount.current}, 异步设置值：{state}
        </p>
    );
};
const asyncSetStateString = `const AsyncSetState: React.FC = () => {
    const renderCount = useRef(0);
    const [state, setState] = useState(0);
    useEffect(() => {
        console.log('AsyncSetState useEffect');
        return () => {
            console.log('AsyncSetState unUseEffect');
        };
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setState(state => state + 1)
        }, 1000);
    }, [state])
    console.log(Date.now(), ++renderCount.current);
    sessionStorage.setItem('AsyncSetState_renderCount', renderCount.current + '');

    return <p>组件执行次数：{renderCount.current}, 异步获取值：</p>;
};`;

// const SuspenseBoundary: React.FC = () => {
//     return (
//         <Suspense fallback={<div >aaa</div>}>
//           <Suspense>
//             {() => }
//           </Suspense>
//         </Suspense>
//       );
// }

type SelectItemArr = ['InitView', 'EffectChange', 'ClickChange', 'AsyncSetState'];
type SelectItem = typeof selectItemArr[number];
const selectItemArr: SelectItemArr = ['InitView', 'EffectChange', 'ClickChange', 'AsyncSetState'];
const selectItemLabelObj: Record<SelectItem, string> = {
    InitView: '测试初始化',
    EffectChange: '通过effect设置值',
    ClickChange: '点击事件设置多个状态',
    AsyncSetState: '异步设置状态',
};
const codeStringObj: Record<SelectItem, string> = {
    InitView: initViewString,
    EffectChange: effectChangeString,
    ClickChange: clickChangeString,
    AsyncSetState: asyncSetStateString,
};
const componentObj: Record<SelectItem, React.FC> = {
    InitView,
    EffectChange,
    ClickChange,
    AsyncSetState,
};

function App() {
    const [selectVal, setSelectVal] = useState<SelectItem>(selectItemArr[0]);
    const Aaaa = componentObj[selectVal];
    return (
        <div className='App'>
            <header className='App-header'>
                <p>Hello React-18!</p>

                <Select value={selectVal} onChange={val => setSelectVal(val)} style={{ width: 120 }}>
                    {selectItemArr.map(item => (
                        <Select.Option value={item} key={item}>
                            {selectItemLabelObj[item]}
                        </Select.Option>
                    ))}
                </Select>

                <Row style={{ minHeight: '50vh', padding: '20px', width: '100%' }}>
                    <Col style={{ overflow: 'auto', width: '70%', maxWidth: '100%', textAlign: 'left', fontSize: '20px' }}>
                        <SyntaxHighlighter language='typescript' style={monokaiSublime}>
                            {codeStringObj[selectVal] || ''}
                        </SyntaxHighlighter>
                    </Col>
                    <Col flex={1}>
                        <Row align='middle' justify='center' style={{ height: '100%' }}>
                            <Aaaa />
                        </Row>
                    </Col>
                </Row>
            </header>
        </div>
    );
}

export default App;
