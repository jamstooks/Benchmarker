import React from "react";
import PropTypes from "prop-types";

import Checkbox from "material-ui/Checkbox";
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";

import "./DataFilters.css";

class DataFilters extends React.Component {
  handleFilterChange = (name, filter) => event => {
    event.target.checked ? this.props.add(filter) : this.props.remove(filter);
  };

  render() {
    let checkboxes = [];
    for (var i = 0; i < this.props.filters.length; i++) {
      let f = this.props.filters[i];
      let checked = this.props.selection.filter(x => x.key == f.key).length > 0;
      checkboxes.push(
        <FormGroup key={"df-fg-" + f.key}>
          <FormControlLabel
            key={"df-fcl-" + f.key}
            control={
              <Checkbox
                checked={checked}
                onChange={this.handleFilterChange(
                  "df-checkbox-name-" + f.key,
                  f
                )}
                value={"df-checkbox-name-" + f.key}
                key={"df-checkbox-key-" + f.key}
              />
            }
            label={f.name}
          />
        </FormGroup>
      );
    }
    return <FormControl component="fieldset">{checkboxes}</FormControl>;
  }
}

DataFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

export default DataFilters;
