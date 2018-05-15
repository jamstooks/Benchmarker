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
import Checkbox from "material-ui/Checkbox";
import { CircularProgress } from "material-ui/Progress";

import AddToGroup from "./AddToGroup";

import "./SearchResults.css";

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
      rows.push(<TableRow key={"results-row-" + n.id}>{cells}</TableRow>);
    }
    return (
      <span>
        <p className="center">
          <Button size="small" color="primary">
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
