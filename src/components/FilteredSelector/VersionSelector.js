import React from "react";
import PropTypes from "prop-types";
import { ListItemText } from "material-ui/List";
import Menu, { MenuItem } from "material-ui/Menu";
import Checkbox from "material-ui/Checkbox";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220
    }
  }
};

const names = ["Aug 2017 (2.0)", "Nov 2018 (2.1)"];

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

  getDisplayText = () => {
    let versions = [];
    this.props.selectedVersions.forEach(id => {
      // lookup the name in availableVersions
      let v = this.props.availableVersions.find(x => x.id == id);
      versions.push(v.name);
    });
    return versions.length > 0 ? versions.join(", ") : "latest";
  };

  render() {
    const { classes } = this.props;

    let menuItems = [];
    console.log(this.props.selectedVersions);
    this.props.availableVersions.forEach(v => {
      let checked = this.props.selectedVersions.indexOf(v.id) != -1;
      menuItems.push(
        <MenuItem
          key={"version-" + v.id}
          value={v.id}
          onClick={event => {
            console.log("toggling version: " + v.id);
            return this.props.toggleVersion(v.id);
          }}
        >
          <Checkbox checked={checked} />
          <ListItemText primary={v.name} />
        </MenuItem>
      );
    });

    return (
      <div>
        {this.getDisplayText()}
        <IconButton
          size="small"
          aria-label="Select Versions"
          onClick={this.handleButtonClick}
        >
          <Icon>edit</Icon>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}

VersionSelector.propTypes = {
  availableVersions: PropTypes.array.isRequired,
  selectedVersions: PropTypes.array.isRequired,
  toggleVersion: PropTypes.func.isRequired
};

export default VersionSelector;
