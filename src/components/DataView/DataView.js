import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import DataViewTable from "./DataViewTable";
import DataViewChart from "./DataViewChart";

import "./DataView.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class DataView extends React.Component {
  getChartHeight = () => {
    return (
      this.props.items.list.length * 50 + this.props.items.columns.length * 50
    );
  };

  /**
   * right now this is a simple check on the data length, but it could
   * become slightly more complex if we use non-numeric entries
   */
  shouldShowGraph = () => {
    return this.props.items.list.length > 0;
  };
  shouldShowTable = () => {
    // these are the same for now
    return this.shouldShowGraph();
  };

  render() {
    if (this.props.isLoading || this.props.isSorting) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={100} />
        </div>
      );
    }

    const { classes } = this.props;

    let chart = !this.shouldShowGraph() ? (
      ""
    ) : (
      <DataViewChart
        list={this.props.items.list}
        columns={this.props.items.columns}
        height={this.getChartHeight()}
      />
    );

    return (
      <div>
        <Grid container spacing={24} className={classes.root}>
          <Grid item xs />
          <Grid item xs={9} md={8}>
            <Typography variant="display1" gutterBottom>
              &nbsp;
            </Typography>
            {chart}
            <DataViewTable
              list={this.props.items.list}
              columns={this.props.items.columns}
            />
          </Grid>
          <Grid item xs>
            <IconButton aria-label="Export">
              <Icon>file_download</Icon>
            </IconButton>
            <IconButton aria-label="Share">
              <Icon>share</Icon>
            </IconButton>
            <IconButton aria-label="Save">
              <Icon>bookmark</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

DataView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isSorting: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired,
  sortColumn: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataView);
