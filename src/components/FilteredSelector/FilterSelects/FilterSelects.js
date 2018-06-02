import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./FilterSelects.css";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

/*
  Shows select boxes as defined in `filters` property
*/
class FilterSelects extends React.Component {
  render() {
    if (this.props.availableFilters.isFetching) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }

    let filters = [];
    for (var i = 0; i < this.props.availableFilters.filters.length; i++) {
      var filter = this.props.availableFilters.filters[i];
      var choices = [];
      if ("list" in filter.choices && filter.choices.list != null) {
        for (var j = 0; j < filter.choices.list.length; j++) {
          choices.push(
            <MenuItem
              value={filter.choices.list[j].value}
              key={"menu_" + filter.key + "_" + j}
              name={filter.key}
            >
              {filter.choices.list[j].title}
            </MenuItem>
          );
        }
      }
      let helpText = null;
      if (filter.helpText != null) {
        helpText = (
          <FormHelperText key={"help_" + filter.key}>
            {filter.helpText}
          </FormHelperText>
        );
      }
      let val =
        this.props.selectedFilters[filter.key] !== undefined
          ? this.props.selectedFilters[filter.key]
          : "";
      filters.push(
        <FormControl
          fullWidth={true}
          margin={"normal"}
          key={"formcontrol_" + filter.key}
        >
          <InputLabel htmlFor="{filter.key}" key={"inputlabel_" + filter.key}>
            {filter.title}
          </InputLabel>
          <Select
            value={val}
            onChange={this.props.handleChange}
            key={"select_" + filter.key}
            inputProps={{
              name: filter.key,
              id: filter.key
            }}
          >
            {choices}
          </Select>
          {helpText}
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
  availableFilters: PropTypes.array.isRequired,
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

export default withStyles(styles)(FilterSelects);
