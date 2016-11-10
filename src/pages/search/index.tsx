import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import NavBarWithSearch from "../../components/search-bar/index";
import FilterBar from "../../components/filter-bar/index";
import SyntheticalFilter from "../../components/synthetical-filter-pannel/index";
import ProfileCard from "../../components/teacher/profile-card";
import { RecommendTeacherBasic } from '../../../common/teacher';
import { getRecommendTeachers } from "../../../store/teacher";


interface NameListProps {
    teachers: RecommendTeacherBasic[];
}
class NameList extends React.Component<NameListProps, any> {
    static propsTypes = {
        teachers: React.PropTypes.array.isRequired,
    }

    constructor(props: NameListProps, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="name-list">
                { this.props.teachers.map((teacher, index) => {
                    return (
                        <ProfileCard { ...teacher } key={ teacher.tid} />
                    )
                }) }
            </div>
        )
    }
}

interface SearchProps {
    params: any,
    location: {
        query: {
            keyword: string;
        },
        [key: string]: any
    },
}
interface SearchState {
    teachers?: RecommendTeacherBasic[];
    showSyntheticalFilter?: boolean;
}

export default class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps, context: SearchState) {
        super(props, context);

        this.state = {
            teachers: [],
            showSyntheticalFilter: false,
        }
    }

    onShowSyntheticalFilter() {
        this.setState({
            showSyntheticalFilter: true,
        })
    }

    onCloseSyntheticalFilter() {
        this.setState({
            showSyntheticalFilter: false,
        })
    }

    componentDidMount() {
        getRecommendTeachers()
            .then(data => {
                this.setState({
                    teachers: data.teachers,
                })
            })
        console.log(this.props.location.query);
    }

    render() {
        const navBarProps = {
            keyword: this.props.location.query.keyword,
        };
        const filterProps = {
            onClose: this.onCloseSyntheticalFilter.bind(this),
            conditions: [{
                type: "授课方式",
                tid: 1,
                options: [{
                    name: "不限",
                    oid: 1,
                }, {
                        name: "在线教学",
                        oid: 2,
                    }, {
                        name: "老师上门",
                        oid: 3,
                    }, {
                        name: "学生上门",
                        oid: 4,
                    }, {
                        name: "协商地点",
                        oid: 5,
                    }]
            }, {
                    type: "教龄",
                    tid: 2,
                    options: [{
                        name: "不限",
                        oid: 1,
                    }, {
                            name: "1年",
                            oid: 2,
                        }, {
                            name: "2年",
                            oid: 3,
                        }, {
                            name: "3年",
                            oid: 4,
                        }, {
                            name: "4年",
                            oid: 5,
                        }]
                }, {
                    type: "身份",
                    tid: 3,
                    options: [{
                        name: "不限",
                        oid: 1,
                    }, {
                            name: "老师",
                            oid: 2,
                        }, {
                            name: "在校生",
                            oid: 3,
                        }, {
                            name: "机构",
                            oid: 4,
                        }, {
                            name: "其他",
                            oid: 5,
                        }]
                }]
        }
        const filterBarProps = {
            onShow: this.onShowSyntheticalFilter.bind(this),
        }
        const nameListProps = {
            teachers: this.state.teachers,
        }

        return (
            <div>
                <NavBarWithSearch { ...navBarProps } />
                <FilterBar { ...filterBarProps } />
                { this.state.showSyntheticalFilter ? <SyntheticalFilter { ...filterProps } /> : null }
                <NameList { ...nameListProps } />
            </div>
        )
    }
}