import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import EntityList from "./EntityList";

import "./FilteredSelector.css";

class SearchResults extends React.Component {
  handleCheckboxChange = entity => event => {
    event.target.checked
      ? this.props.add(entity)
      : this.props.remove(entity.id);
  };

  isCheckedCallback = entity => {
    return this.props.selection.filter(s => s.id == entity.id).length > 0;
  };

  render() {
    if (this.props.isFetching) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }

    let header =
      this.props.data.length > 0 ? (
        <p className="center">
          <Button size="small" color="primary" disabled>
            <Icon>add</Icon>Create a Group
          </Button>{" "}
          using these filters.
        </p>
      ) : (
        ""
      );

    return (
      <span>
        {header}
        <EntityList
          entities={this.props.data}
          emptyMessage="No search results. Try adjusting the filters."
          columns={this.props.columns}
          hasVersionSelect={false}
          showVersions={false}
          hasGroupSelect={false}
          hasSelectCheckbox={true}
          handleCheckboxChange={this.handleCheckboxChange}
          isCheckedCallback={this.isCheckedCallback}
        />
      </span>
    );
  }
}

SearchResults.propTypes = {
  /**
   * The search results data
   */
  data: PropTypes.array.isRequired,
  /**
   * Columns for the results
   */
  columns: PropTypes.array.isRequired,
  /**
   * Styles
   */
  // classes: PropTypes.object.isRequired,
  /**
   * The callback to add an entity
   */
  add: PropTypes.func.isRequired,
  /**
   * The callback to remove an entity
   */
  remove: PropTypes.func.isRequired,
  /**
   * Indicates that search results are being fetched
   */
  isFetching: PropTypes.bool.isRequired,
  /**
   *
   */
  addToNewGroup: PropTypes.func.isRequired,
  /**
   *
   */
  addToGroup: PropTypes.func.isRequired,
  /**
   *
   */
  availableGroups: PropTypes.object.isRequired
};

export default SearchResults;
