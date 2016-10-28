import './index.less';

import * as React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

import * as fetch from 'isomorphic-fetch';

// reducers
import teacherReducers from '../../../reducers/teachers';
// actions
import {
    fetchBasicInfoPosts
} from '../../../actions/teachers'
// pages
import TeacherCourses from './courses/index';
import TeacherIntro from './intro/index';
import TeacherPhotos from './photos/index';

import { TeacherBasic } from '../../../common/teacher';

const store = createStore(teacherReducers, {}, applyMiddleware(thunkMiddleware));

class Loading extends React.Component<any, any> {
    render() {
        return (
            <div className="loading">加载中...</div>
        )
    }
}

class Application extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            tid: 0,
            avatar: '',
            name: '',
            selfIntro: '',
            loading: false
        };

    }

    componentDidMount() {
        let _this = this;

        _this.setState({
            loading: true
        })

        store
            .dispatch(fetchBasicInfoPosts('http://192.168.2.55:8080/test/teacher-basic-info.json', {
                tid: 12
            }))
            .then(() => {

                let state = (store.getState()) as {
                    basicInfo: TeacherBasic
                };
                let teacherInfo = state.basicInfo;


                _this.setState({
                    tid: teacherInfo.tid,
                    avatar: teacherInfo.avatar,
                    name: teacherInfo.name,
                    selfIntro: teacherInfo.selfIntro,
                    loading: false
                })
            })

        // fetch('../../test/teacher-basic-info.json')
        //     .then(function (response) {
        //         if (response.status >= 400) {
        //             throw new Error("Bad response from server");
        //         }
        //         return response.json();
        //     })
        //     .then(function (data: UserBasic) {
        //         _this.setState({
        //             avatar: data.avatar,
        //             name: data.name,
        //             selfIntro: data.selfIntro
        //         })
        //     });
    }

    render() {
        return (
            <div>
                { this.state.loading ? <Loading/> : null}
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