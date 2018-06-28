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
    if (this.props.selected.groups.aggregate.length > 0) {
      let aggGroups = this.props.groups.available.filter(g =>
        this.props.selected.groups.aggregate.includes(g.key)
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
          entities={this.props.selected.entities}
          emptyMessage="No selection yet. Try adjusting the filters."
          columns={this.props.columns}
          remove={this.props.remove}
          toggleVersion={this.props.toggleVersion}
          hasVersionSelect={true}
          showVersions={true}
          hasGroupSelect={true}
          addToNewGroup={this.props.addToNewGroup}
          addToGroup={this.props.addToGroup}
          availableGroups={this.props.groups.available}
        />
        {groups}
      </div>
    );
  }
}

SelectedEntities.propTypes = {
  /**
   * Selected Entities and groups
   */
  selected: PropTypes.object.isRequired,
  /**
   * Group
   */
  groups: PropTypes.object.isRequired,
  /**
   * Columns for the results (entities)
   */
  columns: PropTypes.array.isRequired,

  /**
   * Selection Methods
   */
  remove: PropTypes.func.isRequired,
  toggleVersion: PropTypes.func.isRequired,

  /**
   * Group Methods
   */
  addToNewGroup: PropTypes.func.isRequired,
  addToGroup: PropTypes.func.isRequired,
  removeAggGroup: PropTypes.func.isRequired
};

export default SelectedEntities;
