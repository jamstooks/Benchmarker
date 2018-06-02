import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import SearchResults from "./SearchResults";
import SelectedEntities from "./SelectedEntities";
import FilterSelects from "./FilterSelects";
import Groups from "./Groups";
import "./FilteredSelector.css";

const styles = theme => ({});

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
  state = {
    tabValue: 0
  };

  componentDidMount() {
    const { dispatch, fetchGroups, fetchSearchFilters } = this.props;
    dispatch(fetchGroups());
    dispatch(fetchSearchFilters());
  }

  getResultsTabLabel = () => {
    return "Search Results (" + this.props.searchResults.length + ")";
  };

  getSelectionTabLabel = () => {
    return (
      "Selection (" +
      this.props.selection.length +
      ", " +
      (this.props.selectedGroups.aggregate.length +
        this.props.selectedGroups.individual.length) +
      ")"
    );
  };

  getGroupTabLabel = () => {
    return "Saved Groups (" + this.props.availableGroups.groups.length + ")";
  };

  handleSearchClick = () => {
    this.setState({ tabValue: 1 });
    this.props.runSearch(this.props.searchFilters.selected);
  };

  handleSelectChange = event => {
    let filter = {};
    filter[event.target.name] = event.target.value;
    console.log("adding filter!");
    console.log(filter);
    console.log("available");
    console.log(this.props.searchFilters.available);

    this.props.updateSearchFilter(filter);
  };

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  handleTabChangeIndex = index => {
    this.setState({ tabValue: index });
  };

  removeFromSelected = entity => this.props.remove(entity.id);

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
              scrollable
              fullWidth
            >
              <Tab label="Filters" />
              <Tab label={this.getResultsTabLabel()} />
              <Tab label={this.getSelectionTabLabel()} />
              <Tab label={this.getGroupTabLabel()} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={this.state.tabValue}
            onChangeIndex={this.handleTabChangeIndex}
          >
            <TabContainer>
              <FilterSelects
                availableFilters={this.props.searchFilters.available}
                selectedFilters={this.props.searchFilters.selected}
                handleChange={this.handleSelectChange}
              />
              <div className="filterActions">
                <Button onClick={e => this.props.resetSearchFilters()}>
                  <Icon>refresh</Icon>
                  Clear
                </Button>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.handleSearchClick}
                >
                  <Icon>search</Icon>
                  Search
                </Button>
              </div>
            </TabContainer>
            <TabContainer>
              <SearchResults
                data={this.props.searchResults}
                isFetching={this.props.isFetching}
                columns={this.props.searchResultColumns}
                add={this.props.add}
                remove={this.props.remove}
                selection={this.props.selection}
              />
            </TabContainer>
            <TabContainer>
              <SelectedEntities
                selection={this.props.selection}
                selectedGroups={this.props.selectedGroups}
                removeAggGroup={this.props.removeAggGroup}
                columns={this.props.searchResultColumns}
                remove={this.removeFromSelected}
                toggleVersion={this.props.toggleVersion}
                addToGroup={this.props.addToGroup}
                addToNewGroup={this.props.addToNewGroup}
                availableGroups={this.props.availableGroups}
              />
            </TabContainer>
            <TabContainer>
              <Groups
                availableGroups={this.props.availableGroups}
                columns={this.props.searchResultColumns}
                removeFromGroup={this.props.removeFromGroup}
                selectedGroups={this.props.selectedGroups}
                addAggGroup={this.props.addAggGroup}
                removeAggGroup={this.props.removeAggGroup}
                renameGroup={this.props.renameGroup}
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
  // selection: PropTypes.array.isRequired,
  /**
   * The filters used to find entities
   */
  searchFilters: PropTypes.array.isRequired,
  /**
   * The currently selected filters
   */
  // selectedSearchFilters: PropTypes.object.isRequired,
  /**
   * Results of the filtered searches
   */
  searchResults: PropTypes.array.isRequired,
  /**
   * The columns to display in the search results
   */
  searchResultColumns: PropTypes.array.isRequired,
  /**
   * A boolen to indicate that search results are being fetched
   */
  isFetching: PropTypes.bool.isRequired,
  /**
   * Update filter
   */
  updateSearchFilter: PropTypes.func.isRequired,
  resetSearchFilters: PropTypes.func.isRequired,
  fetchSearchFilters: PropTypes.func.isRequired,
  /**
   * Adds an entity
   */
  add: PropTypes.func.isRequired,
  /**
   * Removes an entity
   */
  remove: PropTypes.func.isRequired,
  /**
   * Function to call when a search is requested
   */
  runSearch: PropTypes.func.isRequired,
  /**
   * Adds or removes a specific version for an entity
   */
  toggleVersion: PropTypes.func.isRequired,
  /**
   *
   */
  fetchGroups: PropTypes.func.isRequired,
  availableGroups: PropTypes.object.isRequired,
  addToNewGroup: PropTypes.func.isRequired,
  addToGroup: PropTypes.func.isRequired,
  removeFromGroup: PropTypes.func.isRequred,
  renameGroup: PropTypes.func.isRequired
};

export default withStyles(styles)(FilteredSelector);
