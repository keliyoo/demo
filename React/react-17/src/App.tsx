import { Select, Button, Row, Col } from 'antd';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './App.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React from 'react';

let initViewNum = 0;
let effectNum = 0;
const InitView: React.FC = () => {
    const renderCount = useRef(0);
    const useEffectrCount = useRef(0);
    const [state, setState] = useState(() => {
        console.log('useState');
        return 0;
    });

    useEffect(() => {
        console.log('InitView useEffect');
        return () => {
            console.log('InitView unUseEffect');
        };
    }, []);
    useEffect(() => {
        effectNum += 1;
        console.log('useEffectrCount', new Date().toJSON(), ++useEffectrCount.current);
        sessionStorage.setItem('InitView_effectNum', effectNum + '');
    });
    console.log(new Date().toJSON(), ++renderCount.current, ++initViewNum);
    sessionStorage.setItem('InitView_renderCount', renderCount.current + ' ' + initViewNum + ' ' + effectNum);

    return (
        <p>
            组件执行次数：{renderCount.current} - {initViewNum} - {effectNum}
            <br />
            <span>
                state: {state} <Button onClick={() => setState(state => state + 1)}>增加</Button>
            </span>
        </p>
    );
};
const initViewString = `let initViewNum = 0;
let effectNum = 0;
const InitView: React.FC = () => {
    const renderCount = useRef(0);
    const useEffectrCount = useRef(0);
    const [state, setState] = useState(() => {
        console.log('useState');
        return 0;
    });

    useEffect(() => {
        console.log('InitView useEffect');
        return () => {
            console.log('InitView unUseEffect');
        };
    }, []);
    useEffect(() => {
        effectNum += 1;
        console.log('useEffectrCount', new Date().toJSON(), ++useEffectrCount.current);
        sessionStorage.setItem('InitView_effectNum', effectNum + '');
    });
    console.log(new Date().toJSON(), ++renderCount.current, ++initViewNum);
    sessionStorage.setItem('InitView_renderCount', renderCount.current + ' ' + initViewNum + ' ' + effectNum);

    return (
        <p>
            组件执行次数：{renderCount.current} - {initViewNum} - {effectNum}
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

class ClassComponent extends React.Component<any, { count1: number; count2: number }> {
    constructor(props: any) {
        super(props);

        this.state = {
            count1: 0,
            count2: 0,
        };
    }

    handleClick1 = () => {
        const { count1, count2 } = this.state;
        this.setState({ count1: count1 + 1 });
        console.log('count1', this.state);
        setTimeout(() => {
            this.setState({ count2: count2 + 2 });
            console.log('count2', this.state);
        });
    };

    handleClick2 = () => {
        this.setState(({ count1 }) => ({ count1: count1 + 1 }));
        console.log('count1', this.state);
        setTimeout(() => {
            this.setState(({ count2 }) => ({ count2: count2 + 1 }));
            console.log('count2', this.state);
        });
    };

    render() {
        const { count1, count2 } = this.state;
        return (
            <div>
                <Button onClick={this.handleClick1}>对象式更新</Button>
                <Button onClick={this.handleClick2}>函数式更新</Button>
                <div>count1: {count1}</div>
                <div>count2: {count2}</div>
            </div>
        );
    }
}
const classComponentString = `class ClassComponent extends React.Component<any, { count1: number; count2: number }> {
    constructor(props: any) {
        super(props);

        this.state = {
            count1: 0,
            count2: 0,
        };
    }

    handleClick1 = () => {
        const { count1, count2 } = this.state;
        this.setState({ count1: count1 + 1 });
        console.log('count1', this.state);
        setTimeout(() => {
            this.setState({ count2: count2 + 2 });
            console.log('count2', this.state);
        });
    };

    handleClick2 = () => {
        this.setState(({ count1 }) => ({ count1: count1 + 1 }));
        console.log('count1', this.state);
        setTimeout(() => {
            this.setState(({ count2 }) => ({ count2: count2 + 1 }));
            console.log('count2', this.state);
        });
    };

    render() {
        const { count1, count2 } = this.state;
        return (
            <div>
                <Button onClick={this.handleClick1}>对象式更新</Button>
                <Button onClick={this.handleClick2}>函数式更新</Button>
                <div>count1: {count1}</div>
                <div>count2: {count2}</div>
            </div>
        );
    }
}`

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

const EmptyComponent: React.FC = () => {
    return  undefined as unknown as null;
};
const emptyComponentString = `const EmptyComponent: React.FC = () => {
    return  undefined as unknown as null;
};`

type SelectItemArr = ['InitView', 'EffectChange', 'ClickChange', 'ClassComponent', 'AsyncSetState', 'EmptyComponent'];
type SelectItem = typeof selectItemArr[number];
const selectItemArr: SelectItemArr = ['InitView', 'EffectChange', 'ClickChange', 'ClassComponent', 'AsyncSetState', 'EmptyComponent'];
const selectItemLabelObj: Record<SelectItem, string> = {
    InitView: '测试初始化',
    EffectChange: '通过effect设置值',
    ClickChange: '点击事件设置多个状态',
    ClassComponent: '批处理对class组件的一点影响',
    AsyncSetState: '异步设置状态',
    EmptyComponent: '空组件'
};
const codeStringObj: Record<SelectItem, string> = {
    InitView: initViewString,
    EffectChange: effectChangeString,
    ClickChange: clickChangeString,
    ClassComponent: classComponentString,
    AsyncSetState: asyncSetStateString,
    EmptyComponent: emptyComponentString,
};
const componentObj: Record<SelectItem, React.FC | typeof ClassComponent> = {
    InitView,
    EffectChange,
    ClickChange,
    ClassComponent,
    AsyncSetState,
    EmptyComponent,
};

function App() {
    const [selectVal, setSelectVal] = useState<SelectItem>(selectItemArr[0]);
    const Aaaa = componentObj[selectVal];
    return (
        <div className='App'>
            <header className='App-header'>
                <p>Hello React-17!</p>

                <Select value={selectVal} onChange={val => setSelectVal(val)} style={{ width: 320 }}>
                    {selectItemArr.map(item => (
                        <Select.Option value={item} key={item}>
                            {selectItemLabelObj[item]}
                        </Select.Option>
                    ))}
                </Select>

                <Row style={{ minHeight: '50vh', padding: '20px', width: '100%' }} wrap={false}>
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
