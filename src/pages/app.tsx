import "./app.less";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink, Redirect } from "react-router";

import { store, getTeacherBasicInfo } from "../../store/teacher";

import AppIndex from "./index/index";
import RecommendTeachers from "./index/recommend-teachers/index";
import HotTeachers from "./index/hot-teachers/index";
import TeacherIndex from "./teacher/index";
import TeacherIntro from "./teacher/intro/index";
import TeacherCourses from "./teacher/courses/index";
import TeacherPhotos from "./teacher/photos/index";

class Application extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

render((
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ AppIndex } >
                <IndexRoute component={ RecommendTeachers } />
                <Route path="hot" component={ HotTeachers } />
            </Route>

            <Route path="/teacher/:tid" component={ TeacherIndex } >
                <IndexRoute component={ TeacherIntro } />
                <Route path="courses" component={ TeacherCourses } />
                <Route path="photos" component={ TeacherPhotos } />
            </Route>
        </Router>
    </Provider>
), document.getElementById("app"))