import React from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import "./DataView.css";

class DataViewTable extends React.Component {
  // state = {
  //   data: [],
  //   columns: [],
  //   orderBy: null,
  //   sortOrder: null
  // };

  render() {
    let columns = [<TableCell key="dataview-col-name">Name</TableCell>];
    for (var i = 0; i < this.props.columns.length; i++) {
      columns.push(
        <TableCell key={"dataview-col-" + i}>
          {this.props.columns[i].title}
        </TableCell>
      );
    }

    let rows = [];
    for (var j = 0; j < this.props.data.length; j++) {
      let entity = this.props.data[j];
      let cells = [
        <TableCell key={"dataview-row-" + entity.id + "-name"}>
          {entity.name}
        </TableCell>
      ];
      for (var k = 0; k < this.props.columns.length; k++) {
        cells.push(
          <TableCell key={"dataview-row-" + entity.id + "-col-" + k}>
            {entity[this.props.columns[k].key]}
          </TableCell>
        );
      }
      rows.push(<TableRow key={"dataview-row-" + entity.id}>{cells}</TableRow>);
    }

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
  data: PropTypes.object.isRequired,
  /**
   * The columns to display in the table
   */
  columns: PropTypes.array.isRequired
};

export default DataViewTable;
