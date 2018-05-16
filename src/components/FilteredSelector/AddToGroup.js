import React from "react";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

class AddToGroup extends React.Component {
  state = {
    anchorEl: null
  };

  handleButtonClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;

    let menuItems = [
      <MenuItem key="title" disabled={true}>
        Add to a Group
      </MenuItem>
    ];
    this.props.groups.forEach(g => {
      menuItems.push(
        <MenuItem
          key={"group-" + g.key}
          onClick={event => {
            this.handleClose();
            this.props.addToGroup(this.props.entity, g);
          }}
        >
          <ListItemText primary={"add to " + g.name} />
        </MenuItem>
      );
    });
    menuItems.push(
      <MenuItem
        key={"new-group"}
        onClick={event => {
          this.handleClose();
          this.props.addToNewGroup(this.props.entity);
        }}
      >
        <ListItemText primary={"create a new group"} />
      </MenuItem>
    );

    return (
      <span>
        <IconButton
          size="small"
          aria-label="Select Versions"
          onClick={this.handleButtonClick}
        >
          <Icon>playlist_add</Icon>
        </IconButton>
        <Menu
          id="add-to-group-menu"
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

AddToGroup.propTypes = {
  entity: PropTypes.object.isRequired,
  /**
   *
   */
  addToNewGroup: PropTypes.func.isRequired,
  /**
   *
   */
  addToGroup: PropTypes.func.isRequired,
  /**
   *
   */
  groups: PropTypes.array.isRequired
};

export default AddToGroup;
