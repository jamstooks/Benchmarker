import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

import AddToGroup from "./AddToGroup";

import "./FilteredSelector.css";

class SearchResults extends React.Component {
  handleCheckboxChange = entity => event => {
    event.target.checked
      ? this.props.add(entity)
      : this.props.remove(entity.id);
  };

  render() {
    console.log("PROPS");
    console.log(this.props);
    if (this.props.isFetching) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }

    if (this.props.data.length === 0) {
      return (
        <p className="center">No search results. Try adjusting the filters.</p>
      );
    }

    let columns = [
      <TableCell key="searchresults-col-checkbox" padding="checkbox" />
    ];
    for (var i = 0; i < this.props.columns.length; i++) {
      columns.push(
        <TableCell padding="dense" key={"searchresults-col-" + i}>
          {this.props.columns[i].title}
        </TableCell>
      );
    }
    columns.push(
      <TableCell key="searchresults-col-groups" padding="checkbox" />
    );
    let rows = [];
    for (var j = 0; j < this.props.data.length; j++) {
      let n = this.props.data[j];
      let checked = this.props.selection.filter(x => x.id == n.id).length > 0;
      let cells = [
        <TableCell padding="checkbox" key={"results-cell-checkbox-" + n.id}>
          <Checkbox
            checked={checked}
            onChange={this.handleCheckboxChange(n)}
            value={"checkbox-value" + n.id}
            key={"checkbox-key" + n.id}
          />
        </TableCell>
      ];
      for (var k = 0; k < this.props.columns.length; k++) {
        cells.push(
          <TableCell padding="dense" key={"results-row-" + n.id + "-col-" + k}>
            {n[this.props.columns[k].key]}
          </TableCell>
        );
      }
      cells.push(
        <TableCell padding="dense" key={"results-row-" + n.id + "group-add"}>
          <AddToGroup
            entity={n}
            key={"results-row-" + n.id + "-playist-add-to-group"}
            groups={this.props.availableGroups.groups}
            addToGroup={this.props.addToGroup}
            addToNewGroup={this.props.addToNewGroup}
          />
        </TableCell>
      );
      rows.push(<TableRow key={"results-row-" + n.id}>{cells}</TableRow>);
    }
    return (
      <span>
        <p className="center">
          <Button size="small" color="primary" disabled>
            <Icon>add</Icon>Create a Group
          </Button>{" "}
          using these filters.
        </p>
        <Table>
          <TableHead>
            <TableRow>{columns}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
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
