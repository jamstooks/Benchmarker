import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";

import EntityList from "./EntityList";

import "./FilteredSelector.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
  actions: {
    display: "flex"
  }
});

class Groups extends React.Component {
  remove = groupKey => entity => {
    this.props.removeFromGroup(entity.keyWithinGroup, groupKey);
  };

  handleAggregateCheckboxChange = group => event => {
    event.target.checked
      ? this.props.addAggGroup(group.key)
      : this.props.removeAggGroup(group.key);
  };

  isCheckedAggregate = group => {
    return (
      this.props.selectedGroups.aggregate.filter(k => k == group.key).length > 0
    );
  };

  render() {
    if (this.props.availableGroups.groups.length === 0) {
      return (
        <p className="center">
          No saved groups. Create one from your selection.
        </p>
      );
    }
    if (this.props.availableGroups.isFetching) {
      return (
        <div className="progress">
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }
    let panels = [];
    this.props.availableGroups.groups.forEach(g => {
      panels.push(
        <div key={"d1-" + g.key}>
          <Grid container spacing={24} key={"g1-" + g.key}>
            <Grid item xs={12} sm={6} key={"g1a-" + g.key}>
              <Input
                key={"rename-group-" + g.key}
                defaultValue={g.name}
                inputProps={{
                  "aria-label": "Group Name"
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} key={"g1b-" + g.key}>
              <FormGroup row key={"epfg-" + g.key}>
                <FormControlLabel
                  key={"add-individual-" + g.key}
                  control={
                    <Checkbox
                      checked={false}
                      key={"add-individual-checkbox" + g.key}
                      disabled
                      onChange={null}
                      value="individual"
                    />
                  }
                  label="Select as individual entities"
                />
                <FormControlLabel
                  key={"add-agg-fcl" + g.key}
                  control={
                    <Checkbox
                      key={"add-agg-checkbox" + g.key}
                      checked={this.isCheckedAggregate(g)}
                      onChange={this.handleAggregateCheckboxChange(g)}
                      value="aggregate"
                    />
                  }
                  label="Select in aggregate"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <ExpansionPanel key={"ep-" + g.key}>
            <ExpansionPanelSummary
              key={"eps-" + g.key}
              expandIcon={<Icon>expand_more</Icon>}
            >
              <Typography key={"expand-name-" + g.key}>
                {g.entities.length} entities
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails key={"epd-" + g.key}>
              <EntityList
                key={"entity-list-" + g.key}
                entities={g.entities}
                emptyMessage="No entities here yet. Add one from search results"
                columns={this.props.columns}
                hasVersionSelect={false}
                showVersions={true}
                hasGroupSelect={false}
                remove={this.remove(g.key)}
              />
            </ExpansionPanelDetails>
            <ExpansionPanelActions key={"epa-" + g.key}>
              <Button size="small" key={"delete-" + g.key}>
                <Icon key={"del-icon-" + g.key}>delete_forever</Icon> Delete
                Group
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
          <br />
        </div>
      );
    });
    return <div>{panels}</div>;
  }
}

Groups.propTypes = {
  availableGroups: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  removeFromGroup: PropTypes.func.isRequred,
  selectedGroups: PropTypes.object.isRequired,
  addAggGroup: PropTypes.func.isRequired,
  removeAggGroup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
