import "./app.less";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink, Redirect, } from "react-router";

import { store } from "../js/store/index";

import AppIndex from "./index/index";
import Search from "./search/index";
import RecommendList from "./index/recommend/index";
import HotList from "./index/hot/index";

import TeacherIndex from "./teacher/index";
import StudioEntrance from "./studio/index";
import CourseDetail from "./common/course-detail/index";
import BookingForm from "./booking-form/index";
import NotFound from "./common/404/index";

render((
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ AppIndex } >
                <IndexRoute component={ RecommendList } />
                <Route path="hot" component={ HotList } />
            </Route>
            <Route path="/search(/:cids)(?keyword=*)" component={ Search } />
            <Route path="/teacher/:tid" component={ TeacherIndex } ></Route>
            <Route path="/studio/:sid" component={ StudioEntrance } ></Route>
            <Route path="/course/:cid" component={ CourseDetail }></Route>

            <Route path="/looking" component={ BookingForm }></Route>
            <Route path="*" component={ NotFound }></Route>
        </Router>
    </Provider>
), document.getElementById("app"))