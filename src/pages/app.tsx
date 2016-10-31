import './app.less';

import * as React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

// store
import { store, getTeacherBasicInfo } from "../../store/teacher";
// components
import Loading from '../components/loading';
import TabsBar from '../components/tabs-bar';
// pages
import HotTeachers from './index/hot-teachers/index';
import RecommendTeachers from './index/recommend-teachers/index';
// conmmon
import { indexRouters } from '../../common/routers';

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
                { this.state.loading ? <Loading/> : null }

                <TabsBar tabs={ indexRouters }>
                    { this.props.children }
                </TabsBar>
            </div>
        )
    }
}

render((
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ Application }>
                <IndexRoute component={ RecommendTeachers }/>
                <Route path={ indexRouters[1].to } component={ HotTeachers }></Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))