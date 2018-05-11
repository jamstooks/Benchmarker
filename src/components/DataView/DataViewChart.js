import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";

// Might have to swap out the chart library to accommodate
// for responsiveness
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import "./DataView.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class DataViewChart extends React.Component {
  render() {
    const { classes } = this.props;

    let bars = [];
    // @todo - make this a property
    let colors = ["#00BCE4", "#6BBC49", "#0080CF", "#5160AB", "#A486BD"];
    this.props.columns.forEach((col, index) => {
      bars.push(
        <Bar
          dataKey={col.key}
          fill={colors[index]}
          key={"bar_" + col.key}
          name={col.title}
        />
      );
    });

    return (
      <ResponsiveContainer width="100%" height={this.props.height}>
        <BarChart data={this.props.data} layout="vertical">
          <CartesianGrid horizontal={false} />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={200} />
          <Tooltip />
          <Legend />
          {bars}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

DataViewChart.propTypes = {
  /**
   * The data to display
   */
  data: PropTypes.object.isRequired,
  /**
   * The selected columns
   */
  columns: PropTypes.array.isRequired,
  /**
   * The height of the chart
   */
  height: PropTypes.number.isRequired
};

export default withStyles(styles)(DataViewChart);
