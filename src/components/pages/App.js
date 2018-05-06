import React, {Component} from 'react';
import logo from '../../public/images/logo.svg';
import {Button, Modal, message, Calendar} from 'antd';
import '../style/App.css';

const confirm = Modal.confirm;

class App extends Component {
    onButtonClick = () => {
        confirm({
            title: 'NB',
            content: '灰常NB',
            onOk() {
                message.success('OK.................')
            },
            onCancel() {
                message.error('NO...................')
            }
        })
    };

    render() {

        function onPanelChange(value, mode) {
            console.log(value, mode);
        }

        console.log(this.props.children);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    <Button type="primary" onClick={this.onButtonClick}>
                        点我啊
                    </Button>
                </p>

                <div style={{width: 300, border: '1px solid #d9d9d9', borderRadius: 4}}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
                </div>
                {/*<div className="last-div">*/}
                {/*{this.props.children}*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default App;
