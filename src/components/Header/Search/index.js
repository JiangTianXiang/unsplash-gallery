import React from "react";
import { withRouter } from "react-router";
import searchIcon from "utils/resources/Iconly-Broken-Search.svg";
import { SearchInput, SearchContainer, SearchIcon } from "./Search.styles";

class Search extends React.Component {
  state = {
    inputValue: "",
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ inputValue: "" });
    this.props.history.push(`/search/photos/${this.state.inputValue}`);
  };

  render() {
    return (
      <SearchContainer>
        <SearchIcon src={searchIcon} />
        <form onSubmit={this.handleSubmit}>
          <SearchInput
            onChange={this.handleChange}
            value={this.state.inputValue}
            placeholder="Search..."
          />
        </form>
      </SearchContainer>
    );
  }
}

export default withRouter(Search);
