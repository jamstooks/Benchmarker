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
import Checkbox from "material-ui/Checkbox";

import "./SearchResults.css";

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

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
    columns.push(<TableCell key="searchresults-col-addtogroup" />);
    let rows = [];
    for (var j = 0; j < this.props.data.length; j++) {
      let n = this.props.data[j];
      let checked = this.props.selection.filter(x => x.id == n.id).length > 0;
      let cells = [
        /**
         * checkboxes will likely go away when versions are supported
         */
        <TableCell padding="checkbox" key={"results-cell-checkbox-" + n.id}>
          <Checkbox
            checked={checked}
            onChange={this.props.handleCheckboxChange("checkbox-" + n.id, n)}
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
        <TableCell key={"results-row-" + n.id + "-playist-add"}>
          <Icon key={"results-row-" + n.id + "-playist-add-icon"}>
            playlist_add
          </Icon>
        </TableCell>
      );
      rows.push(<TableRow key={"results-row-" + n.id}>{cells}</TableRow>);
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
  classes: PropTypes.object.isRequired,
  /**
   * The callback when a checkbox is selected
   */
  handleCheckboxChange: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchResults);
