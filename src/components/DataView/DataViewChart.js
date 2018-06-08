import React from "react";
import PropTypes from "prop-types";

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

class DataViewChart extends React.Component {
  transformData = list =>
    list.map(i => {
      let newObj = { name: i["entity"].value };
      Object.keys(i).forEach(k => {
        newObj[k] = i[k].value;
      });
      return newObj;
    });

  render() {
    let bars = [];
    // @todo - make this a property
    let colors = ["#00BCE4", "#6BBC49", "#0080CF", "#5160AB", "#A486BD"];
    this.props.columns.forEach((col, index) => {
      if (col.is_numeric) {
        bars.push(
          <Bar
            dataKey={col.key}
            fill={colors[index]}
            key={"bar_" + col.key}
            name={col.title}
          />
        );
      }
    });

    return (
      <ResponsiveContainer width="100%" height={this.props.height}>
        <BarChart data={this.transformData(this.props.list)} layout="vertical">
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
  list: PropTypes.array.isRequired,
  /**
   * The selected columns
   */
  columns: PropTypes.array.isRequired,
  /**
   * The height of the chart
   */
  height: PropTypes.number.isRequired
};

export default DataViewChart;
