import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import "./DataFilters.css";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: ".5em"
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    flex: 1
  }
});

class DataFilters extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(this.props.fetchFilters()).then(() => {
      // get the choices for any select filters with no parent
      this.props.filters.available.filters.forEach(f => {
        if (f.type === "select" && f.parentKey === null) {
          dispatch(this.props.getChoicesForFilter(f.key, null));
        }
      });
    });
  }

  handleChange = key => event => {
    let newValue = event.target.value !== "" ? event.target.value : null;
    this.props.updateFilter(key, newValue);

    // run updatefilter on the first child
    let firstChild = this.props.filters.available.filters.find(
      f => f.parentKey === key
    );
    if (firstChild !== undefined && newValue != null) {
      this.props.dispatch(
        this.props.getChoicesForFilter(firstChild.key, newValue)
      );
    }
  };

  handleClick = key => event => {
    // look up the selected choice and add it
    let filter = this.props.filters.available.filters.find(f => f.key === key);
    this.props.add(filter.choices.items.find(c => c.id === filter.value));
  };

  render() {
    if (this.props.filters.available.isFetching) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }

    const classes = this.props.classes;

    let filters = [];
    this.props.filters.available.filters.forEach(f => {
      let disabled = f.choices.items.length === 0 || f.choices.isFetching;
      let options = [
        <MenuItem value="">
          <em>Select One</em>
        </MenuItem>
      ];

      f.choices.items.forEach(c => {
        options.push(<MenuItem value={c.id}>{c.title}</MenuItem>);
      });

      let select = (
        <FormControl key={"fc-" + f.key} className={classes.formControl}>
          <InputLabel htmlFor={f.key}>{f.name}</InputLabel>
          <Select
            autoWidth={true}
            disabled={disabled}
            value={f.value === null ? "" : f.value}
            onChange={this.handleChange(f.key)}
            inputProps={{
              name: f.name,
              id: f.key
            }}
          >
            {options}
          </Select>
        </FormControl>
      );
      if (f.choices.isFetching) {
        select = <CircularProgress className={classes.progress} size={20} />;
        // select = <LinearProgress color="secondary" variant="query" />;
      }

      filters.push(
        <Grid item xs={8} className={classes.grid}>
          {select}
        </Grid>
      );
      filters.push(
        <Grid item xs={4} className={classes.grid}>
          <Button
            color="primary"
            size="small"
            onClick={this.handleClick(f.key)}
            disabled={disabled || f.value == null}
          >
            {f.buttonTitle}
          </Button>
        </Grid>
      );
    });

    let selectedFilters = [];
    this.props.filters.selected.forEach(f => {
      selectedFilters.push(
        <li>
          {f.title} ({f.key})
          <IconButton onClick={() => this.props.remove(f.key)}>
            <Icon>clear</Icon>
          </IconButton>
        </li>
      );
    });

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {filters}
        </Grid>
        <ul>{selectedFilters}</ul>
      </div>
    );
  }
}

DataFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  getChoicesForFilter: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  fetchViewData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataFilters);
