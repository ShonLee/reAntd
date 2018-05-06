import React from 'react';
import ReactDOM from 'react-dom';
// v4 前
// import {Router,Route,hashHistory} from 'react-router';
// v4 后
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './components/style/index.css';
import App from './components/pages/App';
import registerServiceWorker from './common/registerServiceWorker';
import regionData from './routes/regionData'
import {Test} from "./components/pages/test";

ReactDOM.render(
    // v4 前
    // <Router history={hashHistory}>
    //   <Route path="/" component={PCIndex}></Route>
    //   <Route path="/details/:uniqueky" component={PCNewsDetails}></Route>
    //   <Route path="/usercenter" component={PCUserCenter}></Route>
    //</Router>

    // v4 后
    // <BrowserRouter> 只能有一个子节点 , 官网建议的是使用<Switch>进行包裹
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/regionData/test" component={Test}/>
            {regionData ? regionData.map(data => {
                return <Route path={data.path} component={data.component} key={data.path}/>
            }) : null}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
