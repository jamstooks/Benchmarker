import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import EntityList from "./EntityList";

import "./FilteredSelector.css";

class SelectedEntities extends React.Component {
  render() {
    let groups = "";
    if (this.props.selectedGroups.aggregate.length > 0) {
      let aggGroups = this.props.availableGroups.groups.filter(g =>
        this.props.selectedGroups.aggregate.includes(g.key)
      );
      let rows = [];
      aggGroups.forEach(g => {
        rows.push(
          <li key={"li-" + g.key}>
            {g.name}
            <IconButton onClick={event => this.props.removeAggGroup(g.key)}>
              <Icon>clear</Icon>
            </IconButton>
          </li>
        );
      });
      groups = (
        <div>
          <Typography
            variant="headline"
            gutterBottom
            className="centeredHeader"
          >
            Aggregate Groups
          </Typography>
          <ul>{rows}</ul>
        </div>
      );
    }

    return (
      <div>
        <Typography variant="headline" gutterBottom className="centeredHeader">
          Selected Entities
        </Typography>
        <EntityList
          entities={this.props.selection}
          emptyMessage="No selection yet. Try adjusting the filters."
          columns={this.props.columns}
          remove={this.props.remove}
          toggleVersion={this.props.toggleVersion}
          hasVersionSelect={true}
          showVersions={true}
          hasGroupSelect={true}
          addToNewGroup={this.props.addToNewGroup}
          addToGroup={this.props.addToGroup}
          availableGroups={this.props.availableGroups}
        />
        {groups}
      </div>
    );
  }
}

SelectedEntities.propTypes = {
  /**
   * Selected Entities
   */
  selection: PropTypes.array.isRequired,
  /**
   * Selected Groups
   */
  // groups: PropTypes.array.isRequired,
  /**
   * Columns for the results (entities)
   */
  columns: PropTypes.array.isRequired,
  /**
   * The callback when an entity is removed
   */
  remove: PropTypes.func.isRequired,
  /**
   * Toggles a version of a selected entity
   */
  toggleVersion: PropTypes.func.isRequired,
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
  availableGroups: PropTypes.object.isRequired,
  selectedGroups: PropTypes.object.isRequired,
  removeAggGroup: PropTypes.func.isRequired
};

export default SelectedEntities;
