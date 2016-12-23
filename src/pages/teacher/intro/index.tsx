import "./index.less";
import * as React from "react";
import { render } from "react-dom";

import LoadingToast from "../../../components/toast/index";
import { getTeacherIntro } from "../../../js/store/index";
import Notification from "../../../components/notification";

interface teacherBasicInfo {
    name: string,
    selfIntro: string,
    avatar: string
}

interface TeachingCaseProps {
    startTime: string;
    endTime: string;
    cont: string;
}

class TeachingCase extends React.Component<TeachingCaseProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }
    static propTypes = {
        startTime: React.PropTypes.string,
        endTime: React.PropTypes.string,
        cont: React.PropTypes.string.isRequired,
    }

    render() {
        const { startTime, endTime, cont } = this.props;

        return (
            <li>
                <div className="case-time"><time>{ startTime }</time> - <time>{ endTime }</time></div>
                <div className="case-content">{ cont }</div>
            </li>
        )
    }
}

interface TeacherIntroProps {
    params: {
        tid: string;
        [key: string]: any;
    }
}

interface TeacherIntroState {
    loading?: boolean;
    seniority?: string;
    graduatedSchool?: string;
    role?: string;
    studio?: string;
    intro?: string;
    teachingCases?: TeachingCaseProps[];
}

export default class TeacherIntro extends React.Component<TeacherIntroProps, TeacherIntroState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loading: false,
            seniority: "",
            graduatedSchool: "",
            role: "",
            studio: "",
            intro: "",
            teachingCases: [],
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        getTeacherIntro(Number(this.props.params.tid))
            .then(res => {
                this.setState({
                    seniority: res.seniority,
                    graduatedSchool: res.graduatedSchool,
                    role: res.role,
                    studio: res.studio,
                    intro: res.intro,
                    teachingCases: res.teachingCases,
                })
            })
            .handle(() => {
                this.setState({
                    loading: false,
                })
            })
            .fail((error: Error) => {
                Notification.info({
                    content: error.message || "请求数据失败",
                });
            })
    }

    render() {
        const { loading, seniority, graduatedSchool, role, studio, intro, teachingCases } = this.state;

        if (loading) {
            return (
                <div>
                    <LoadingToast isOpen={ true } />
                </div>
            )
        } else {
            return (
                <div>
                    <div id="intro-pannel">
                        <ul>
                            <li>
                                <span>最高学历</span>
                                <div>{ seniority || "暂未填写" }</div>
                            </li>
                            <li>
                                <span>毕业学校</span>
                                <div>{ graduatedSchool || "暂未填写" }</div>
                            </li>
                            <li>
                                <span>身&nbsp; &nbsp; &nbsp; &nbsp; 份</span>
                                <div>{ role || "暂未填写" }</div>
                            </li>
                            <li>
                                <span>单位机构</span>
                                <div>{ studio || "暂未加入任何机构" }</div>
                            </li>
                            <li>
                                <span>个人介绍</span>
                                <div dangerouslySetInnerHTML={{ __html: intro || "暂未填写" }}></div>
                            </li>
                        </ul>
                    </div>
                    {
                        teachingCases && teachingCases.length ?
                            <div id="teaching-case">
                                <div className="title">
                                    <i></i>
                                    <h2>历史授课</h2>
                                </div>
                                <ul>
                                    {
                                        teachingCases.map((teachingCase, index) => {
                                            return (
                                                <li key={ index }>
                                                    <div className="case-time"><time>{ teachingCase.startTime }</time> - <time>{ teachingCase.endTime }</time></div>
                                                    <div className="case-content">{ teachingCase.cont }</div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div> :
                            null
                    }

                </div>
            )
        }
    }
}

