import "./app.less";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from "react-router";

// store
import { store, getTeacherBasicInfo } from "../../store/teacher";
// components

// pages
import HotTeachers from "./index/hot-teachers/index";
import RecommendTeachers from "./index/recommend-teachers/index";
import TeacherIntro from "./teacher/intro/index";
import TeacherCourses from "./teacher/courses/index";
import TeacherPhotos from "./teacher/photos/index";

// common
import { indexRouters } from "../../common/routers";

class Application extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })


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
            <Route path="/" component={ Application }>
                <IndexRoute component={ RecommendTeachers }/>
                <Route path={ indexRouters[1].to } component={ HotTeachers } />
                <Route path="/teacher/:tid/intro" component={ TeacherIntro } />
                <Route path="/teacher/:tid/courses" component={ TeacherCourses } />
                <Route path="/teacher/:tid/photos" component={ TeacherPhotos } />
            </Route>
        </Router>
    </Provider>
), document.getElementById("app"))