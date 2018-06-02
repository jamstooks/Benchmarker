import React from "react";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

class VersionSelector extends React.Component {
  state = {
    anchor: []
  };

  handleButtonClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    let menuItems = [];
    this.props.availableVersions.forEach(v => {
      let checked = this.props.selectedVersions.indexOf(v.id) !== -1;
      menuItems.push(
        <MenuItem
          key={"version-" + v.id}
          value={v.id}
          onClick={event => {
            return this.props.toggleVersion(v.id);
          }}
        >
          <Checkbox checked={checked} />
          <ListItemText primary={v.name} />
        </MenuItem>
      );
    });

    return (
      <span>
        <IconButton
          size="small"
          aria-label="Select Versions"
          onClick={this.handleButtonClick}
        >
          <Icon>edit</Icon>
        </IconButton>
        <Menu
          id="version-selector-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {menuItems}
        </Menu>
      </span>
    );
  }
}

VersionSelector.propTypes = {
  availableVersions: PropTypes.array.isRequired,
  selectedVersions: PropTypes.array.isRequired,
  toggleVersion: PropTypes.func.isRequired
};

export default VersionSelector;
