import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Icon from "material-ui/Icon";
import Button from "material-ui/Button";

import "./SelectedEntities.css";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    // minWidth: 300
  }
});

// @todo - remove duplication

class SelectedEntities extends React.Component {
  render() {
    if (this.props.selection.length === 0) {
      return (
        <p className="center">No selection yet. Try adjusting the filters.</p>
      );
    }

    let columns = [];
    for (var i = 0; i < this.props.columns.length; i++) {
      columns.push(
        <TableCell padding="dense" key={"selected-col-" + i}>
          {this.props.columns[i].title}
        </TableCell>
      );
    }
    columns.push(<TableCell padding="dense" key="selected-remove" />);
    let rows = [];
    for (var j = 0; j < this.props.selection.length; j++) {
      let n = this.props.selection[j];
      let row = [];
      for (var k = 0; k < this.props.columns.length; k++) {
        row.push(
          <TableCell padding="dense" key={"selected-row-" + n.id + "-col-" + k}>
            {n[this.props.columns[k].key]}
          </TableCell>
        );
      }
      row.push(
        <TableCell padding="dense" key={"remove-button-cell-" + n.id}>
          <Button
            key={"remove-button-" + n.id}
            data-entityid={n.id}
            onClick={this.props.handleRemoveEntity(n)}
          >
            <Icon key={"remove-button-icon-" + n.id}>clear</Icon>
          </Button>
        </TableCell>
      );
      rows.push(<TableRow key={"selected-row-" + n.id}>{row}</TableRow>);
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
  handleRemoveEntity: PropTypes.func.isRequired
  /**
   * The callback for when a group is removed
   */
  // handleRemoveGroup: PropTypes.array.isRequired
};

export default withStyles(styles)(SelectedEntities);
