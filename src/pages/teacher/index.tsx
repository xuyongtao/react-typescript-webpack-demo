import './index.less';

import * as React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

// store
import { store, getTeacherBasicInfo } from "../../../store/teacher";

// pages
import TeacherCourses from './courses/index';
import TeacherIntro from './intro/index';
import TeacherPhotos from './photos/index';
// components
import Loading from '../../components/loading';
import NavBar from '../../components/nav-bar';
import BasicInfo from '../../components/teacher/basic-info';
// interface
import {
    TeacherResBasic,
    CoursesResBasic,
} from '../../../common/teacher';

class Application extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            teacher: {
                tid: 0,
                avatar: '',
                name: '',
                selfIntro: '',
            },
            loading: false
        };

    }

    componentDidMount() {
        let _this = this;

        _this.setState({
            loading: true
        })

        getTeacherBasicInfo()
            .then(basicInfo => {
                let teacherInfo: TeacherResBasic = basicInfo;

                _this.setState({
                    teacher: {
                        tid: teacherInfo.tid,
                        avatar: teacherInfo.avatar,
                        name: teacherInfo.name,
                        selfIntro: teacherInfo.selfIntro,
                    },
                    loading: false
                })
            })


    }

    render() {
        return (
            <div>
                { this.state.loading ? <Loading/> : null }
                <NavBar pageTitle="老师详情"></NavBar>
                <BasicInfo teacher={ this.state.teacher }></BasicInfo>

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
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ Application }>
                <IndexRoute component={ TeacherIntro }/>
                <Route path="intro" component={ TeacherIntro }></Route>
                <Route path="courses" component={ TeacherCourses }></Route>
                <Route path="photos" component={ TeacherPhotos }></Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));