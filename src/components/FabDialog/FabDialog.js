import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

import "./FabDialog.css";

/*
  A Dialog and Fab Button combo that accepts
  `position` property of <left, right, top, bottom>
  `color` as the color of the button
  `fabIcon` is a google material icon name
*/
class FabDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      timeout: this.props.transitionDuration,
      direction: this.props.direction,
      icon: this.props.fabIcon,
      buttonSize: "small",
      iconClass: ""
    };
  }

  toggleDialog = () => {
    this.setState(prevState => ({
      open: !prevState.open,
      // buttonClass: !prevState.open
      //   ? this.state.buttonClassName + " open"
      //   : this.state.buttonClassName,
      iconClass: !prevState.open ? "open" : ""
    }));
  };

  getTransition = props => {
    return <Slide direction={this.props.direction} {...props} />;
  };

  render() {
    return (
      <div>
        <Zoom in={!this.state.open} timeout={this.state.timeout}>
          <Button
            variant="fab"
            color={this.props.color}
            onClick={this.toggleDialog}
          >
            <Icon className={this.state.iconClass}>{this.state.icon}</Icon>
          </Button>
        </Zoom>
        <Dialog
          open={this.state.open}
          transition={this.getTransition}
          transitionDuration={this.state.timeout}
          keepMounted
          onClose={this.toggleDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

FabDialog.propTypes = {
  /**
   * Dialog children, usually the included sub-components.
   */
  children: PropTypes.node.isRequired,
  /**
   * The named material-ui color to use for the button
   */
  color: PropTypes.string,
  /**
   * The google material icon name to show in the fab
   */
  icon: PropTypes.string,
  /**
   * Direction the child node will enter from.
   */
  direction: PropTypes.oneOf(["left", "right", "up", "down"]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
  ])
};

FabDialog.defaultProps = {
  color: "primary",
  fabIcon: "add"
};

export default FabDialog;
