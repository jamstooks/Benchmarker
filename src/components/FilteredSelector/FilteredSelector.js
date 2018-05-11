import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import SearchResults from "./SearchResults";
import SelectedEntities from "./SelectedEntities";
import FilterSelects from "./FilterSelects";
import "./FilteredSelector.css";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

/*
  A filtering tool that allows users to select and
  filter entities individually and in groups.
*/
class FilteredSelector extends React.Component {
  constructor(props) {
    super(props);

    // @todo - this will eventually become a list of objects
    let searchFilters = this.props.dataSource.getSearchFilters();
    let selectedFilters = {};
    for (var i = 0; i < searchFilters.length; i++) {
      let f = searchFilters[i];
      selectedFilters[f.keyName] = f.choices.list[0].value;
    }

    this.state = {
      filters: searchFilters,
      searchResultColumns: this.props.dataSource.getSearchResultColumns(),
      selectedFilters: selectedFilters,
      tabValue: 0,
      searchResults: []
    };
  }

  getResultsTabLabel = () => {
    return "Search Results (" + this.state.searchResults.length + ")";
  };

  getSelectionTabLabel = () => {
    return "Selection (" + this.props.selection.length + ")";
  };

  handleSearchClick = () => {
    let results = this.props.dataSource.performEntitySearch(
      this.state.selectedFilters
    );
    this.setState({
      searchResults: results,
      tabValue: 1,
      searchResultsTabLabel: "Search Results (" + results.length + ")"
    });
  };

  handleSelectChange = event => {
    let selected_val = {};
    selected_val[event.target.name] = event.target.value;
    let new_selectedFilters = Object.assign(
      {},
      this.state.selectedFilters,
      selected_val
    );
    this.setState({ selectedFilters: new_selectedFilters });
  };

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  handleTabChangeIndex = index => {
    this.setState({ tabValue: index });
  };

  handleCheckboxChange = (name, entity) => event => {
    event.target.checked ? this.props.add(entity) : this.props.remove(entity);
  };

  handleRemoveEntity = entity => event => {
    this.props.remove(entity);
  };

  // @todo - scrolling tabs for small viewports
  render() {
    return (
      <div>
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.tabValue}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Filters" />
              <Tab label={this.getResultsTabLabel()} />
              <Tab label={this.getSelectionTabLabel()} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={this.state.tabValue}
            onChangeIndex={this.handleTabChangeIndex}
          >
            <TabContainer>
              <FilterSelects
                filters={this.state.filters}
                selectedFilters={this.state.selectedFilters}
                handleChange={this.handleSelectChange}
              />

              <div className="filterActions">
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.handleSearchClick}
                >
                  Search
                </Button>
              </div>
            </TabContainer>
            <TabContainer>
              <SearchResults
                data={this.state.searchResults}
                columns={this.state.searchResultColumns}
                handleCheckboxChange={this.handleCheckboxChange}
                selection={this.props.selection}
              />
            </TabContainer>
            <TabContainer>
              <SelectedEntities
                selection={this.props.selection}
                columns={this.state.searchResultColumns}
                handleRemoveEntity={this.handleRemoveEntity}
              />
            </TabContainer>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

FilteredSelector.propTypes = {
  /**
   * Selected entities
   */
  selection: PropTypes.array.isRequired,
  /**
   * dataSource
   */
  dataSource: PropTypes.object.isRequired,
  /**
   * Adds an entity
   */
  add: PropTypes.func.isRequired,
  /**
   * Removes an entity
   */
  remove: PropTypes.func.isRequired
};

export default FilteredSelector;
