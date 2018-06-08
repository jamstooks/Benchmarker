import React from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";

import "./DataView.css";

class DataViewTable extends React.Component {
  render() {
    let columns = [];
    this.props.columns.forEach(col => {
      columns.push(
        <TableCell key={"dataview-col-" + col.key}>{col.title}</TableCell>
      );
    });

    let count = 0; // @todo - add a key to the list
    let rows = [];
    this.props.list.forEach(i => {
      let cells = [];
      this.props.columns.forEach(col => {
        let val = i[col.key] !== undefined ? i[col.key].value : "--";
        let units = col.units !== null ? col.units : "";
        let link =
          i[col.key] !== undefined ? (
            <sup className="linkIcon">
              <a target="_blank" href={i[col.key].link}>
                <Icon>open_in_new</Icon>
              </a>
            </sup>
          ) : null;
        cells.push(
          <TableCell key={"dataview-row-" + count + "-col-" + col.key}>
            {val} {units}
            {link}
          </TableCell>
        );
      });
      rows.push(<TableRow key={"dataview-row-" + ++count}>{cells}</TableRow>);
    });

    return (
      <Table className="data-view-table">
        <TableHead>
          <TableRow>{columns}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    );
  }
}

DataViewTable.propTypes = {
  /**
   * The data to display
   */
  list: PropTypes.object.isRequired,
  /**
   * The columns to display in the table
   */
  columns: PropTypes.array.isRequired
};

export default DataViewTable;
