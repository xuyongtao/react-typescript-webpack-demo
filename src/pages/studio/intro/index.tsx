import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import LoadingToast from "../../../components/toast/index";
import EmptyList from "../../../components/empty-list/index";

import { getStudioIntro } from "../../../js/store/index";

interface StudioIntroProps {
    params: {
        sid: string;
        [key: string]: any;
    }
}

interface StudioIntroState {
    loading?: boolean;
    intro?: string;
}

export default class StudioIntro extends React.Component<StudioIntroProps, StudioIntroState> {
    constructor(props: StudioIntroProps, context: StudioIntroState) {
        super(props, context);

        this.state = {
            loading: false,
            intro: "",
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        getStudioIntro(Number(this.props.params.sid))
            .then(res => {
                this.setState({
                    intro: res.intro,
                })
            })
            .handle(() => {
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        const { loading, intro } = this.state;
        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: loading,
        };

        if (loading) {
            return (
                <LoadingToast { ...loadingToastProps } />
            )
        } else {
            return (
                <div>
                    {
                        intro ?
                            <div className="intro-cont">{ intro }</div> :
                            <EmptyList tip="该机构暂未填写介绍" />
                    }
                </div>
            )
        }
    }
}