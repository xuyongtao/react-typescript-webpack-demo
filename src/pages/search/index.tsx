import * as React from "react";
import { render } from "react-dom";

import NavBarWithSearch from "../../components/search-bar/index";
import FilterBar from "../../components/filter-bar/index";

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

}

export default class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps, context: SearchState) {
        super(props, context);
    }

    componentDidMount() {
        console.log(this.props.location.query);
    }

    render() {
        let navBarProps = {
            keyword: this.props.location.query.keyword,
        };

        return (
            <div>
                <NavBarWithSearch { ...navBarProps } />
                <FilterBar />
            </div>
        )
    }
}