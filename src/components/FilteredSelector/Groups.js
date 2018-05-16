import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import EntityList from "./EntityList";

import "./FilteredSelector.css";

// @todo - remove duplication between tabular components

class Groups extends React.Component {
  render() {
    if (this.props.availableGroups.groups.length === 0) {
      return (
        <p className="center">
          No saved groups. Create one from search results.
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
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <Typography>{g.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EntityList
              entities={g.entities}
              emptyMessage="No entities here yet. Add one from search results"
              columns={this.props.columns}
              hasVersionSelect={false}
              showVersions={true}
              hasGroupSelect={false}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
    return <div>{panels}</div>;
  }
}

Groups.propTypes = {
  availableGroups: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
  // removeFromGroup: PropTypes.func.isRequired
};

export default Groups;
