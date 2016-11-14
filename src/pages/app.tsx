import "./app.less";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink, Redirect, } from "react-router";

import { store, getTeacherBasicInfo } from "../../store/teacher";

import AppIndex from "./index/index";
import Search from "./search/index";
import RecommendList from "./index/recommend/index";
import HotList from "./index/hot/index";
import NotFound from "./common/404/index";

import TeacherIndex from "./teacher/index";
import TeacherIntro from "./teacher/intro/index";
import TeacherCourses from "./teacher/courses/index";
import TeacherPhotos from "./teacher/photos/index";
import CourseDetail from "./common/course-detail/index";

import StudioEntrance from "./studio/index";
import StudioIndex from "./studio/index/index";
import StudioIntro from "./studio/intro/index";
import StudioCourses from "./studio/courses/index";
import StudioTeachers from "./studio/teachers/index";
import StudioPhotos from "./studio/photos/index";

render((
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ AppIndex } >
                <IndexRoute component={ RecommendList } />
                <Route path="hot" component={ HotList } />
            </Route>

            <Route path="/search(/:cids)(?keyword=*)" component={ Search } />

            <Route path="/teacher/:tid" component={ TeacherIndex } >
                <IndexRoute component={ TeacherIntro } />
                <Route path="courses" component={ TeacherCourses } />
                <Route path="photos" component={ TeacherPhotos } />
            </Route>

            <Route path="/studio/:sid" component={ StudioEntrance } >
                <IndexRoute component={ StudioIndex } />
                <Route path="courses" component={ StudioCourses } />
                <Route path="teachers" component={ StudioTeachers } />
                <Route path="photos" component={ StudioPhotos } />
                <Route path="intro" component={ StudioIntro } />
            </Route>

            <Route path="/course/:cid" component={ CourseDetail }></Route>
            <Route path="*" component={ NotFound }></Route>
        </Router>
    </Provider>
), document.getElementById("app"))