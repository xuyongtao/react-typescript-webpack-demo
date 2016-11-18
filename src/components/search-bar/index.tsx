import "./index.less";

import * as React from "react";
import { SyntheticEvent, KeyboardEvent, FormEvent, ReactNode } from "react";
import { render } from "react-dom";
import { Link, browserHistory } from "react-router";

import * as classNames from "classnames";
import * as Lodash from "lodash";

interface SuggestionsProps {
    highlightedItem: number;
    searchTerm: string;
    suggestions: string[];
    onSelection(suggestion: string): void;
}
interface SuggestionsStates {
    activeItem?: number;
}

class Suggestions extends React.Component<SuggestionsProps, SuggestionsStates> {
    static propTypes = {
        highlightedItem: React.PropTypes.number,
        searchTerm: React.PropTypes.string.isRequired,
        suggestions: React.PropTypes.array.isRequired,
        onSelection: React.PropTypes.func,
    };
    timer: number;
    touchedMoved: boolean;

    constructor(props: SuggestionsProps, context: SuggestionsStates) {
        super(props, context);
        this.state = {
            activeItem: -1
        };
    }

    onTouchStart(index: number) {
        this.timer = setTimeout(() => {
            this.setState({ activeItem: index });
        }, 200);
    }
    onTouchMove() {
        clearTimeout(this.timer);

        this.touchedMoved = true;
        this.setState({ activeItem: -1 });
    }
    onTouchEnd(suggestion: string) {
        if (!this.touchedMoved) {
            setTimeout(() => {
                this.props.onSelection && this.props.onSelection(suggestion);
            }, 220);
        }
        this.touchedMoved = false;
    }
    render() {
        const { highlightedItem, searchTerm, suggestions } = this.props;
        const { activeItem } = this.state;

        return (
            <ul
                className="search-bar-suggestions"
                onMouseLeave={ () => this.setState({ activeItem: -1 }) }>
                { suggestions.map((suggestion, index) =>
                    <li
                        className={ classNames({
                            highlighted: highlightedItem === index || activeItem === index
                        }) }
                        key={ index }
                        onClick={ () => this.props.onSelection(suggestion) }
                        onMouseEnter={ () => this.setState({ activeItem: index }) }
                        onMouseDown={ (e) => e.preventDefault() }
                        onTouchStart={ () => this.onTouchStart(index) }
                        onTouchMove={ () => this.onTouchMove() }
                        onTouchEnd={ () => this.onTouchEnd(suggestion) }>
                        <span>
                            { searchTerm }
                            <strong>{ suggestion.substr(searchTerm.length) }</strong>
                        </span>
                    </li>
                ) }
            </ul>
        );
    }
}

const keyCodes = {
    ENTER: 13,
    ESCAPE: 27,
    UP: 38,
    DOWN: 40
};

interface SearchBarState {
    highlightedItem?: number;
    searchTerm?: string;
    suggestions?: any;
    value?: string;
    isFocused?: boolean;
}
interface SearchBarProps {
    autoFocus?: boolean;
    delay?: number;
    inputName?: string;
    onChange(searchTerm: string, resolve: (value?: any | Thenable<any>) => void): void;
    onSearch?(value: string): void;
    placeholder?: string;
    initValue?: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    static propTypes = {
        autoFocus: React.PropTypes.bool,
        delay: React.PropTypes.number,
        inputName: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        onSearch: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        initValue: React.PropTypes.string,
    };
    static defaultProps = {
        autoFocus: false,
        delay: 200
    };
    initialState: SearchBarState;
    timer: number;

    constructor(props: SearchBarProps) {
        super(props);
        if (!props.onChange) {
            throw new Error("You must supply a callback to `onChange`.");
        }
        this.state = this.initialState = {
            highlightedItem: -1,
            searchTerm: "",
            suggestions: [],
            value: "",
        };
    }
    componentDidMount() {
        if (this.props.initValue) {
            this.setState({
                value: this.props.initValue,
            })
        }

        if (this.props.autoFocus) {
            const inputNode: any = this.refs["input"];
            inputNode.focus();
        }
    }
    normalizeInput() {
        return this.state.value.toLowerCase().trim();
    }
    autosuggest() {
        const searchTerm = this.normalizeInput();

        if (!searchTerm) return;
        new Promise((resolve) => {
            this.props.onChange(searchTerm, resolve);
        }).then((suggestions) => {
            if (!this.state.value) return;
            this.setState({
                highlightedItem: -1,
                searchTerm,
                suggestions
            });
        });
    }
    scroll(key: number) {
        const { highlightedItem: item, suggestions } = this.state;
        const lastItem = suggestions.length - 1;
        let nextItem: number;

        if (key === keyCodes.UP) {
            nextItem = (item <= 0) ? lastItem : item - 1;
        } else {
            nextItem = (item === lastItem) ? 0 : item + 1;
        }

        this.setState({
            highlightedItem: nextItem,
            value: suggestions[nextItem]
        });
    }
    search() {
        if (!this.state.value) return;

        const value = this.normalizeInput();
        const inputNode: any = this.refs["input"];
        const { highlightedItem, suggestions } = this.initialState;

        clearTimeout(this.timer);
        inputNode.blur();

        this.setState({ highlightedItem, suggestions });
        if (this.props.onSearch) {
            this.props.onSearch(value);
        }
    }
    onChange(e: FormEvent) {
        clearTimeout(this.timer);

        const target: any = e.target;
        const input = target.value;

        if (!input) return this.setState(this.initialState);
        this.setState({ value: input });
        this.timer = setTimeout(() => this.autosuggest(), this.props.delay);
    }
    onKeyDown(e: KeyboardEvent) {
        const key = e.which || e.keyCode;
        switch (key) {
            case keyCodes.UP:
            case keyCodes.DOWN:
                e.preventDefault();
                this.scroll(key);
                break;

            case keyCodes.ENTER:
                this.search();
                break;

            case keyCodes.ESCAPE:
                const inputNode: any = this.refs["input"];
                inputNode.blur();
                break;
        }
    }
    onSelection(suggestion: string) {
        this.setState({ value: suggestion }, () => this.search());
    }
    onSearch(e: SyntheticEvent) {
        e.preventDefault();
        this.search();
    }
    render() {
        /*eslint-disable quotes*/
        return (
            <div className="search-bar-wrapper">
                <div className={classNames(
                    "search-bar-field",
                    { "fixed": this.state.suggestions.length > 0 },
                    { "is-focused": this.state.isFocused },
                    { "has-suggestions": this.state.suggestions.length > 0 }
                ) }>
                    <span className="iconfont btn-back" onClick={ browserHistory.goBack } >{ String.fromCharCode(parseInt("e600", 16)) }</span>
                    <span className="index-entrance">
                        <Link to="/">首页</Link>
                    </span>
                    <input
                        className="search-bar-input"
                        name={ this.props.inputName }
                        type="text"
                        maxLength="100"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        ref="input"
                        value={ this.state.value }
                        placeholder={ this.props.placeholder }
                        onChange={ this.onChange.bind(this) }
                        onBlur={ () => this.setState({ isFocused: false, suggestions: [] }) }
                        onKeyDown={ this.state.suggestions && this.onKeyDown.bind(this) }
                        onFocus={ () => this.setState({ isFocused: true }) } />
                    { this.state.value &&
                        <span
                            className="icon search-bar-clear"
                            onClick={ () => this.setState(this.initialState) }>
                        </span> }
                    <span
                        className="icon search-bar-submit"
                        onClick={ this.onSearch.bind(this) }>
                    </span>
                </div>
                { this.state.suggestions.length > 0 &&
                    <Suggestions
                        searchTerm={ this.state.searchTerm }
                        suggestions={ this.state.suggestions }
                        highlightedItem={ this.state.highlightedItem }
                        onSelection={ this.onSelection.bind(this) } /> }
            </div>
        );
    }

}

const matches: {
    [key: string]: string[]
} = {
        "初一": [
            "初一物理",
            "初一数学",
            "初一英语"
        ],
        "初二": [
            "初二物理",
            "初二数学",
            "初二英语"
        ]
    };


interface NavBarWithSearchProps {
    keyword?: string;
}
interface NavBarWithSearchState {

}

export default class NavBarWithSearch extends React.Component<NavBarWithSearchProps, NavBarWithSearchState> {
    constructor(props: NavBarWithSearchProps, context: NavBarWithSearchState) {
        super(props, context);
    }

    onChange(input: string, resolve: (value?: any | Thenable<any>) => void) {
        console.log("input: ", input)

        // Simulate AJAX request
        setTimeout(() => {

            // const suggestions = matches[Lodash.find(Object.keys(matches), (partial: string) => {
            //     return Boolean(input.match(new RegExp(partial, "i")));
            // })] || ['初', '初一', '初二'];

            // resolve(suggestions.filter((suggestion: string, index: number, array: string[]) => {
            //     return Boolean(suggestion.match(new RegExp("^" + input.replace(/\W\s/g, ""), "i")));
            // }));
            resolve(["初一 - 物理", "初二 - 物理", "初三 - 物理"]);

        }, 25);
    }

    onSearch(input: string) {
        if (!input) return;
        console.info(`Searching "${input}"`);
        // 发送请求，获取老师信息

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="nav-search-bar">
                <SearchBar
                    placeholder="请输入想学的科目"
                    onChange={ this.onChange }
                    onSearch={ this.onSearch }
                    initValue={ this.props.keyword} />
            </div>
        );
    }
}

