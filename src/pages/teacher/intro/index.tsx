import "./index.less";
import * as React from "react";
import { render } from "react-dom";


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

interface TeacherIntroState {
    seniority?: string;
    graduatedSchool?: string;
    role?: string;
    studio?: string;
    intro?: string;
    teachingCases?: TeachingCaseProps[];
}

export default class TeacherIntro extends React.Component<any, TeacherIntroState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div id="intro-pannel">
                    <ul>

                        <li>
                            <span>最高学历</span>
                            <div>本科</div>
                        </li>
                        <li>
                            <span>毕业学校</span>
                            <div>广州美术学院</div>
                        </li>
                        <li>
                            <span>身&nbsp; &nbsp; &nbsp; &nbsp; 份</span>
                            <div>在校生</div>
                        </li>
                        <li>
                            <span>单位机构</span>
                            <div>广州美术学院</div>
                        </li>
                        <li>
                            <span>个人介绍</span>
                            <div>本人爱好广州美术学院本人爱好广州美术学院本人爱好广州美术学院本人爱好广州美术学院...</div>
                        </li>
                    </ul>
                </div>
                <div id="teaching-case">
                    <div className="title">
                        <i></i>
                        <h2>历史授课</h2>
                    </div>
                    <ul>
                        <li>
                            <div className="case-time"><time>2015年9月</time> - <time>至今</time></div>
                            <div className="case-content">带领学生参加长江杯钢琴比赛；参加西安市高陵县建党90周年文艺演出，排演西安市高陵县国土局，交通局、建设局等单位。参加带领第四军</div>
                        </li>
                        <li>
                            <div className="case-time"><time>2015年9月</time> - <time>至今</time></div>
                            <div className="case-content">带领学生参加长江杯钢琴比赛；参加西安市高陵县建党90周年文艺演出，排演西安市高陵县国土局，交通局、建设局等单位。参加带领第四军</div>
                        </li>
                        <li>
                            <div className="case-time"><time>2015年9月</time> - <time>至今</time></div>
                            <div className="case-content">带领学生参加长江杯钢琴比赛；参加西安市高陵县建党90周年文艺演出，排演西安市高陵县国土局，交通局、建设局等单位。参加带领第四军</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

