import "./index.less";

import * as React from "react";
import { SyntheticEvent, KeyboardEvent, FormEvent, ReactNode } from "react";
import { render } from "react-dom";
import { Link, browserHistory } from "react-router";

import * as classNames from "classnames";
import * as Lodash from "lodash";

import { getSuggestion } from "../../js/store/index";
import { Role } from "../../js/common/config";

import { CatBasic } from '../../js/interface/common';

interface SuggestionBasic {
    label: string;
    path: string;
}

interface SuggestionsProps {
    highlightedItem: number;
    searchTerm: string;
    suggestions: SuggestionBasic[];
    onSelection(suggestion: SuggestionBasic): void;
}
interface SuggestionsStates {
    activeIndex?: number;
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
            activeIndex: -1
        };
    }

    onTouchStart(index: number) {
        // this.timer = setTimeout(() => {
        //     this.setState({ activeIndex: index });
        // }, 200);
        this.setState({ activeIndex: index });
    }
    onTouchMove() {
        clearTimeout(this.timer);

        this.touchedMoved = true;
        this.setState({ activeIndex: -1 });
    }
    onTouchEnd(suggestion: SuggestionBasic) {
        if (!this.touchedMoved) {
            // setTimeout(() => {
            //     this.props.onSelection && this.props.onSelection(suggestion);
            // }, 220);
            this.props.onSelection && this.props.onSelection(suggestion);
        }
        this.touchedMoved = false;
    }
    onMouseEnter(index: number) {
        this.setState({
            activeIndex: index,
        })
    }
    onMouseLeave() {
        this.setState({
            activeIndex: -1,
        })
    }
    onClick(suggestion: SuggestionBasic) {
        this.props.onSelection(suggestion);
    }
    render() {
        const { highlightedItem, searchTerm, suggestions } = this.props;
        const { activeIndex } = this.state;

        return (
            <ul
                className="search-bar-suggestions"
                onMouseLeave={ this.onMouseLeave.bind(this) }>
                { suggestions.map((suggestion, index) =>
                    <li
                        className={ classNames({
                            highlighted: highlightedItem === index || activeIndex === index
                        }) }
                        key={ index }
                        onClick={ this.onClick.bind(this, suggestion) }
                        onMouseEnter={ this.onMouseEnter.bind(this, index) }
                        onMouseDown={ (e) => { e.preventDefault(); } }
                        onTouchStart={ this.onTouchStart.bind(this, index) }
                        onTouchMove={ this.onTouchMove.bind(this) }
                        onTouchEnd={ this.onTouchEnd.bind(this, suggestion) }>
                        <span>{ suggestion.label }</span>
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
    suggestions?: SuggestionBasic[];
    activeSuggestion?: SuggestionBasic;
    value?: string;
    isFocused?: boolean;
}
interface SearchBarProps {
    autoFocus?: boolean;
    delay?: number;
    inputName?: string;
    onChange(searchTerm: string, resolve: (value?: any | Thenable<any>) => void): void;
    onSearch?(suggestion: SuggestionBasic | string): void;
    onFocus?(): void;
    onInput?(keyword: string): void;
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
        onFocus: React.PropTypes.func,
        onInput: React.PropTypes.func,
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
        this.state = this.initialState = {
            highlightedItem: -1,
            searchTerm: "",
            suggestions: [],
            activeSuggestion: {
                label: "",
                path: "",
            },
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
        }).then((suggestions: SuggestionBasic[]) => {
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
            // value: suggestions[nextItem].label,
            // activeSuggestion: suggestions[nextItem],
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
            // const suggestion = Lodash.find(this.state.suggestions, { label: value }) as SuggestionBasic;
            // this.props.onSearch(suggestion || value);
            this.props.onSearch(this.state.activeSuggestion.label ? this.state.activeSuggestion : value);
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
    onSelection(suggestion: SuggestionBasic) {
        // this.setState({ value: suggestion.label }, () => this.search());
        this.setState({
            activeSuggestion: suggestion,
        }, () => this.search());
    }
    onSearch(e: SyntheticEvent) {
        e.preventDefault();
        this.setState({
            activeSuggestion: this.initialState.activeSuggestion,
        }, () => this.search());
    }
    onClearInput() {
        this.setState(this.initialState, () => {
            this.props.onInput && this.props.onInput(this.initialState.value);
        })
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
                        type="search"
                        maxLength="100"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        ref="input"
                        value={ this.state.value }
                        placeholder={ this.props.placeholder }
                        onChange={ this.onChange.bind(this) }
                        // onBlur={ () => this.setState({ isFocused: false, suggestions: [] }) }
                        onKeyDown={ this.state.suggestions && this.onKeyDown.bind(this) }
                        onFocus={ () => {
                            this.props.onFocus && this.props.onFocus();
                            this.setState({ isFocused: true });
                        } } />
                    { this.state.value &&
                        <span
                            className="icon search-bar-clear"
                            onClick={ this.onClearInput.bind(this) }>
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

interface NavBarWithSearchProps {
    keyword?: string;
    onFocus?(): void;
    onInput?(keyword: string): void;
    onSearchKeyword?(keyword: string): void;
    onSearchCat?(cat: CatBasic[], keyword: string): void;
}
interface NavBarWithSearchState {

}

export default class NavBarWithSearch extends React.Component<NavBarWithSearchProps, NavBarWithSearchState> {
    static propTypes = {
        keyword: React.PropTypes.string,
        handlerFocus: React.PropTypes.func,
        onSearchKeyword: React.PropTypes.func,
    }
    constructor(props: NavBarWithSearchProps, context: NavBarWithSearchState) {
        super(props, context);
    }

    onChange(input: string, resolve: (value?: any | Thenable<any>) => void) {
        this.props.onInput && this.props.onInput(input);

        getSuggestion(input)
            .then(res => {
                let suggestions: SuggestionBasic[] = [];

                res.cats.map((cat) => {
                    suggestions.push({
                        label: cat.cat_labels,
                        path: `/search/${cat.cat_ids}`,
                    })
                })
                res.users.map((user) => {
                    suggestions.push({
                        label: user.name,
                        path: (user.role === Role.studio ? `/studio/${user.id}` : `/teacher/${user.id}`),
                    })
                })

                resolve(suggestions);
            })
    }

    onSearch(suggestion: SuggestionBasic | string) {
        if (!suggestion) return;

        if (typeof suggestion === "string") {
            this.props.onSearchKeyword && this.props.onSearchKeyword(suggestion);
        } else {
            if (suggestion.path.indexOf("search") > 0) {
                let catLabels = suggestion.label.split("-");
                let catIds = suggestion.path.match(/\d+-\d+-\d+/)[0].split("-");

                this.props.onSearchCat && this.props.onSearchCat([{
                    label: catLabels[0],
                    id: Number(catIds[0]),
                }, {
                        label: catLabels[1],
                        id: Number(catIds[1]),
                    }, {
                        label: catLabels[2],
                        id: Number(catIds[2]),
                    }], suggestion.label);
            } else {
                browserHistory.push(suggestion.path);
            }
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="nav-search-bar">
                <SearchBar
                    placeholder="请输入想学的科目"
                    onChange={ this.onChange.bind(this) }
                    onSearch={ this.onSearch.bind(this) }
                    onFocus={ this.props.onFocus.bind(this) }
                    onInput= { this.props.onInput }
                    initValue={ this.props.keyword } />
            </div>
        );
    }
}

