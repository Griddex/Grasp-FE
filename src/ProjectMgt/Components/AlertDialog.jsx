import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IsNullOrUndefined from "util";

function AlertDialog(props) {
  const { cancelAction, okAction, open } = props;
  const [dialogTitle, setDialogTitle] = React.useState(
    props.dialogTitle || "Prompt"
  );
  const [dialogMessage, setDialogMessage] = React.useState(
    props.dialogMessage || "Do you wish to continue?"
  );
  const [okCaption, setOkCaption] = React.useState(props.okCaption || "Ok");
  const [cancelCaption, setCancelCaption] = React.useState(
    props.cancelCaption || "Cancel"
  );
  //const [okAction, setOkAction] = React.useState(props.okAction || null);

  function handleClickOpen() {
    setOpen(true);
  }

  React.useEffect(() => {
    //setOpen(props.open)
    //setOkAction(props.okAction)
    setDialogTitle(props.dialogTitle);
    setDialogMessage(props.dialogMessage);
  }, [props]);

  function handleClose() {
    if (cancelAction) {
      cancelAction();
    }
  }

  function handleOkClick() {
    //console.warn(props.okAction)
    if (okAction) {
      okAction();
    }
    //setOpen();
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelCaption}
          </Button>
          <Button onClick={handleOkClick} color="primary" autoFocus>
            {okCaption}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
