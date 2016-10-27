import './index.less';

import * as React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

import * as fetch from 'isomorphic-fetch';

// reducers
import app from '../../../reducers/teachers';
// pages
import TeacherCourses from './courses/index';
import TeacherIntro from './intro/index';
import TeacherPhotos from './photos/index';

interface UserBasic {
    name: String,
    avatar: String,
    selfIntro: String
}


class Application extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            avatar: '',
            name: '',
            selfIntro: ''
        };
    }

    componentDidMount() {
        let _this = this;

        fetch('../../test/teacher-basic-info.json')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (data: UserBasic) {
                _this.setState({
                    avatar: data.avatar,
                    name: data.name,
                    selfIntro: data.selfIntro
                })
            });
    }

    render() {
        return (
            <div>
                <div className="nav-bar">
                    <span className="iconfont btn-back" onClick={ browserHistory.goBack } dangerouslySetInnerHTML={{ __html: '&#xe600;' }}></span>
                    <h1>老师详情</h1>
                </div>

                <div className="basic-info">
                    <img src={ this.state.avatar } alt={ this.state.name }/>
                    <div>
                        <strong>{ this.state.name }</strong><i></i>
                        <p>{ this.state.selfIntro }</p>
                    </div>
                </div>
                <div className="pannels">
                    <ul className="tabs">
                        <li><IndexLink to="/" activeClassName="active">简介</IndexLink></li>
                        <li><Link to="courses" activeClassName="active">课程</Link></li>
                        <li><Link to="photos" activeClassName="active">相册</Link></li>
                    </ul>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

const store = createStore(app, {}, applyMiddleware(thunk));

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Application}>
                <IndexRoute component={TeacherIntro}/>
                <Route path="intro" component={TeacherIntro}></Route>
                <Route path="courses" component={TeacherCourses}></Route>
                <Route path="photos" component={TeacherPhotos}></Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));