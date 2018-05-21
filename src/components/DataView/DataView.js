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
  // @todo - need to add some loading indicators at some point
  state = {
    isLoading: false,
    includeGraph: false,
    includeTable: false,
    data: [],
    columns: [],
    graphWidth: 500,
    graphHeight: 250
  };

  dataUpdateCallback = (data, columns) => {
    console.log("received callback!");
    // @todo - will need more checks about numeric and units
    this.setState(prevState => ({
      isLoading: false,
      includeGraph: data.length > 0,
      includeTable: data.length > 0,
      data: data,
      columns: columns,
      chartHeight: 100
    }));
  };

  /**
   * Using this for now... still assessing the best method
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    // When the entities or dataFilter properties change
    // we'll need to pull new data.
    // so, we'll trigger an asycn task to grab the data
    // and temporarily add a loading indicator
    // @todo - ASYNC PATTERN DOESN'T WORK
    if (nextProps.entities.length == 0) {
      return {
        loading: false,
        includeGraph: false,
        includeTable: false,
        data: [],
        columns: []
      };
    }
    if (nextProps.dataFilters.length != 0) {
      let results = nextProps.dataSource.performValueSearch(
        nextProps.entities,
        nextProps.dataFilters
      );
      return {
        isLoading: false,
        includeGraph: results.data.length > 0,
        includeTable: results.data.length > 0,
        data: results.data,
        columns: results.columns,
        chartHeight: results.data.length * 50 + results.columns.length * 50
      };
    } else {
      // we can still show some data
      let data = [];
      for (var i = 0; i < nextProps.entities.length; i++) {
        // making assumptions here... will have to change later
        // need to add a prop like "entityPrimaryKeyName"
        data.push({
          name: nextProps.entities[i].name,
          id: nextProps.entities[i].id
        });
      }
      return {
        loading: false,
        includeGraph: false,
        includeTable: true,
        data: data,
        columns: []
      };
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }

    const { classes } = this.props;

    let chart = !this.state.includeGraph ? (
      ""
    ) : (
      <DataViewChart
        data={this.state.data}
        columns={this.state.columns}
        height={this.state.chartHeight}
      />
    );

    return (
      <div>
        <Grid container spacing={24} className={classes.root}>
          <Grid item xs />
          <Grid item xs={9} md={8}>
            <Typography variant="display1" gutterBottom>
              DataView
            </Typography>
            {chart}
            <DataViewTable
              data={this.state.data}
              columns={this.state.columns}
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
  /**
   * The data source
   */
  dataSource: PropTypes.object.isRequired,
  /**
   * The filters to select columns
   */
  dataFilters: PropTypes.array.isRequired,
  /**
   * Entities - might become an object or have a separate `group` prop
   */
  entities: PropTypes.array.isRequired,

  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataView);
