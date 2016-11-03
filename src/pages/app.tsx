import "./app.less";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from "react-router";

import { store, getTeacherBasicInfo } from "../../store/teacher";
import AppIndex from "./index/index";
import TeacherIndex from "./teacher/index";

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
            <Route path="/" component={ Application }>
                <IndexRoute component={ AppIndex }/>
                <Route path="/teacher/:tid" component={ TeacherIndex } />
            </Route>
        </Router>
    </Provider>
), document.getElementById("app"))