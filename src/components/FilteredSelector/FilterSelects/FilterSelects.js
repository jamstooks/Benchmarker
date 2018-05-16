import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
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
      let helpText = null;
      if (filter.helpText != null) {
        helpText = (
          <FormHelperText key={"help_" + filter.keyName}>
            {filter.helpText}
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

export default withStyles(styles)(FilterSelects);
