import React from "react";
import PropTypes from "prop-types";
import VersionSelector from "./VersionSelector";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

import AddToGroup from "./AddToGroup";

import "./FilteredSelector.css";

// @todo: fix issue with unique keys

class EntityList extends React.Component {
  getVersionDisplayText = e => {
    let versions = [];
    e.selectedVersions.forEach(id => {
      // lookup the name in availableVersions
      let v = e.availableVersions.find(x => x.id == id);
      versions.push(v.name);
    });
    return versions.length > 0 ? versions.join(", ") : "latest";
  };

  render() {
    if (this.props.entities.length === 0) {
      return (
        <p className="center">
          {this.props.emptyMessage != undefined
            ? this.props.emptyMessage
            : "No entities yet."}
        </p>
      );
    }

    let showActionColumn =
      this.props.hasGroupSelect ||
      this.props.hasVersionSelect ||
      this.props.remove !== undefined;

    let showVersionColumn =
      this.props.hasVersionSelect ||
      (this.props.showVersions !== undefined && this.props.showVersions);

    let columns = [];
    if (this.props.hasSelectCheckbox) {
      columns.push(<TableCell key="entity-list-checkbox" padding="checkbox" />);
    }

    for (var i = 0; i < this.props.columns.length; i++) {
      columns.push(
        <TableCell padding="dense" key={"selected-col-" + i}>
          {this.props.columns[i].title}
        </TableCell>
      );
    }
    if (showVersionColumn) {
      columns.push(<TableCell key="selected-ver-col">Report(s)</TableCell>);
    }
    if (showActionColumn) {
      columns.push(<TableCell padding="dense" key="row-actions" />);
    }
    let rows = [];

    for (var j = 0; j < this.props.entities.length; j++) {
      let e = this.props.entities[j];
      let row = [];
      if (this.props.hasSelectCheckbox) {
        row.push(
          <TableCell
            padding="checkbox"
            key={"entity-list-cell-checkbox-" + e.id}
          >
            <Checkbox
              checked={this.props.isCheckedCallback(e)}
              onChange={this.props.handleCheckboxChange(e)}
              value={"checkbox-value" + e.id}
              key={"checkbox-key" + e.id}
            />
          </TableCell>
        );
      }
      for (var k = 0; k < this.props.columns.length; k++) {
        row.push(
          <TableCell
            padding="dense"
            key={"entity-list-row-" + e.id + "-col-" + k}
          >
            {e[this.props.columns[k].key]}
          </TableCell>
        );
      }
      if (showVersionColumn) {
        row.push(
          <TableCell
            padding="dense"
            key={"entity-list-row-" + e.id + "-col-" + k}
          >
            {this.getVersionDisplayText(e)}
          </TableCell>
        );
      }
      if (showActionColumn) {
        let actions = [];
        if (this.props.hasVersionSelect) {
          actions.push(
            <VersionSelector
              key={"entity-list-row-" + e.id + "-report"}
              availableVersions={e.availableVersions}
              selectedVersions={e.selectedVersions}
              toggleVersion={versionID =>
                this.props.toggleVersion(e.id, versionID)
              }
            />
          );
        }
        if (this.props.hasGroupSelect) {
          actions.push(
            <AddToGroup
              entity={e}
              key={"results-row-" + e.id + "-playist-add-to-group"}
              groups={this.props.availableGroups.groups}
              addToGroup={this.props.addToGroup}
              addToNewGroup={this.props.addToNewGroup}
            />
          );
        }
        if (this.props.remove !== undefined) {
          actions.push(
            <IconButton
              key={"remove-button-" + e.id}
              data-entityid={e.id}
              onClick={event => this.props.remove(e.id)}
            >
              <Icon key={"remove-button-icon-" + e.id}>clear</Icon>
            </IconButton>
          );
        }
        row.push(
          <TableCell padding="dense" key={"remove-button-cell-" + e.id}>
            {actions}
          </TableCell>
        );
      }
      rows.push(<TableRow key={"entity-list-row-" + j}>{row}</TableRow>);
    }
    return (
      <Table>
        <TableHead>
          <TableRow>{columns}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    );
  }
}

EntityList.propTypes = {
  /**
   * Selected Entities
   */
  entities: PropTypes.array.isRequired,
  /**
   * If there aren't any enties, a message can be displayed
   */
  emptyMessage: PropTypes.string,

  /**
   * Columns for the results
   */
  columns: PropTypes.array.isRequired,
  /**
   * The callback when an entity is removed from the list
   * This is optional, and an X-button will only be displayed
   * if this is provided.
   */
  remove: PropTypes.func,
  /**
   * Toggles a version of a selected entity
   */
  hasVersionSelect: PropTypes.bool.isRequired,
  showVersions: PropTypes.bool,
  toggleVersion: PropTypes.func,

  hasGroupSelect: PropTypes.bool.isRequired,
  addToNewGroup: PropTypes.func,
  addToGroup: PropTypes.func,
  availableGroups: PropTypes.object
};

export default EntityList;
