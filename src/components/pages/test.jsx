import React from 'react';
import {Calendar} from 'antd';

export class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }


    render() {
        function onPanelChange(value, mode) {
            console.log(value, mode);
        }

        return (
            <div style={{width: 300, border: '1px solid #d9d9d9', borderRadius: 4}}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
            </div>
        )
    }
}