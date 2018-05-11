import React from "react";
import PropTypes from "prop-types";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";
import { CircularProgress } from "material-ui/Progress";

import "./FilterSelects.css";

/*
  Shows select boxes as defined in `filters` property
*/
class FilterSelects extends React.Component {
  render() {
    if (this.props.filters.length === 0) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }

    let filters = [];
    for (var i = 0; i < this.props.filters.length; i++) {
      var filter = this.props.filters[i];
      var choices = [];
      if ("list" in filter.choices && filter.choices.list != null) {
        for (var j = 0; j < filter.choices.list.length; j++) {
          choices.push(
            <MenuItem
              value={filter.choices.list[j].value}
              key={"menu_" + filter.keyName + "_" + j}
            >
              {filter.choices.list[j].title}
            </MenuItem>
          );
        }
      }
      let help_text = null;
      if (filter.help_text != null) {
        help_text = (
          <FormHelperText key={"help_" + filter.keyName}>
            {filter.help_text}
          </FormHelperText>
        );
      }
      let val =
        this.props.selectedFilters[filter.keyName] != undefined
          ? this.props.selectedFilters[filter.keyName]
          : "";
      filters.push(
        <FormControl
          fullWidth={true}
          margin={"normal"}
          key={"formcontrol_" + filter.keyName}
        >
          <InputLabel
            htmlFor="{filter.keyName}"
            key={"inputlabel_" + filter.keyName}
          >
            {filter.title}
          </InputLabel>
          <Select
            value={val}
            onChange={this.props.handleChange}
            key={"select_" + filter.keyName}
            inputProps={{
              name: filter.keyName,
              id: filter.keyName
            }}
          >
            {choices}
          </Select>
          {help_text}
        </FormControl>
      );
    }
    return (
      <div>
        <form>{filters}</form>
      </div>
    );
  }
}

FilterSelects.propTypes = {
  /**
   * The filters to search for entities
   */
  filters: PropTypes.array.isRequired,
  /**
   * The the selected filter choices
   */
  selectedFilters: PropTypes.object.isRequired,
  /**
   * The callback method for changes
   */
  handleChange: PropTypes.func.isRequired
};

FilterSelects.defaultProps = {};

export default FilterSelects;
