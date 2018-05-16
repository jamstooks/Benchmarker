import React from "react";
import PropTypes from "prop-types";
import EntityList from "./EntityList";

class SelectedEntities extends React.Component {
  render() {
    return (
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
  availableGroups: PropTypes.object.isRequired
};

export default SelectedEntities;
