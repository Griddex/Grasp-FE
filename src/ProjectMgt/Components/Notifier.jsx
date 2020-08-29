/* eslint-disable react/prop-types */
import { withSnackbar } from "notistack";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeSnackbarAction } from "../../Application/Redux/Actions/snackbarActions";

class Notifier extends Component {
  displayed = [];

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    if (!newSnacks.length) {
      this.displayed = [];
      return false;
    }

    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      const newSnack = newSnacks[i];
      if (newSnack.dismissed) {
        this.props.closeSnackbarAction(newSnack.key);
        this.props.removeSnackbar(newSnack.key);
      }

      if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnack.key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach(({ key, message, options = {} }) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbarAction(message, {
        ...options,
        onClose: (event, reason, key) => {
          if (options.onClose) {
            options.onClose(event, reason, key);
          }
          // Dispatch action to remove snackbar from redux store
          this.props.removeSnackbar(key);
        },
      });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = (store) => ({
  notifications: store.notifications,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(Notifier)
);
