import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { purple } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import ManageIcon from "@material-ui/icons/SettingsOutlined";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AlertDialog from "../../Components/AlertDialog";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../General/Redux/Actions/userActions";
import { projectMgtState } from "./../../General/Redux/State/ProjectState";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  iconButton: {
    margin: theme.spacing(1),
    fontSize: 24,
    color: "#444444",
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  modalDialog: {
    width: "100%",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderTop: "5px #0099FF solid",
    minWidth: "100px",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(2, 0),
    fontSize: 16,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

function UsersSetupView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [dialogProps, setDialogProps] = React.useState({});
  const { users } = projectMgtState;
  // const users = props.users;

  const [isEditing, setIsEditing] = React.useState(false);

  const [newUser, setNewUser] = React.useState({
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    email: "",
    Address: "",
    title: "",
    dateOfBirth: "",
    role: "",
    position: "",
    profilePictureUrl: "",
    dateCreated: "",
    accountStatus: "",
    gender: "",
  });

  function handleClickOpen() {
    setIsEditing(false);
    setNewUser({
      id: "",
      firstName: "",
      lastName: "",
      userName: "",
      emailAddress: "",
      Address: "",
      title: "",
      dateOfBirth: "",
      role: "",
      position: "",
      profilePictureUrl: "",
      dateCreated: "",
      accountStatus: "",
      gender: "",
    });
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  //const deleteUserCallback = useCallback((deleteUserId)=>alert(deleteUserId),[deleteUserId]);//props.deleteUser(deleteUserId),[deleteUserId]);

  const deleteUser = (userId) => {
    //let tempId = userId;
    setOpenAlert(true);
    //setDeleteUserId(userId);
    let selectedUser = users.find((user) => {
      return user.id == userId;
    });
    if (selectedUser) {
      setDialogProps({
        ...dialogProps,
        dialogTitle: "Delete User",
        dialogMessage:
          "Delete user: " +
          selectedUser.firstName +
          " " +
          selectedUser.lastName +
          "",
      });
    }
    //setDialogProps({...dialogProps, dialogTitle: "Delete User", dialogMessage: "Delete user: "+selectedUser.firstName+" "+selectedUser.lastName+"", okAction:()=>{props.deleteUser(userId);setOpenAlert(false)}})
  };

  const editUser = (userId) => {
    setIsEditing(true);
    let selectedUser = users.find((user) => {
      return user.id == userId;
    });

    if (selectedUser) {
      setNewUser(selectedUser);
    }

    setOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  function addUser() {
    props.createUser({ ...newUser, id: Math.random() });
    setOpen(false);
  }

  function updateUser() {
    props.updateUser(newUser);
    setOpen(false);
  }

  useEffect(() => {}, [props]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}>
        <ColorButton
          variant="contained"
          size="large"
          className={classes.link}
          color="primary"
          onClick={handleClickOpen}
        >
          <AddIcon />
          Create New User
        </ColorButton>
        <AlertDialog
          open={openAlert}
          cancelAction={() => setOpenAlert(false)}
          {...dialogProps}
        />
        <Dialog
          open={open}
          fullWidth
          className={classes.modalDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {isEditing ? <span>Edit User</span> : <span>New User</span>}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="projectDesc"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="userName"
              label="userName"
              name="userName"
              value={newUser.userName}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {isEditing ? (
              <Button onClick={updateUser} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={addUser} color="primary">
                Create
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>

      <Grid container spacing={4}>
        {users && users.length > 0 ? (
          users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      {user.profilePictureId && user.profilePictureId != "" ? (
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            "http://localhost:56941/users/profilepicture/" +
                            user.id +
                            "/" +
                            user.profilePictureId
                          }
                          className={classes.bigAvatar}
                        />
                      ) : (
                        <Avatar alt="Remy Sharp" className={classes.bigAvatar}>
                          {user.firstName && user.firstName != ""
                            ? user.firstName.charAt(0)
                            : ""}
                          {user.lastName && user.lastName != ""
                            ? user.lastName.charAt(0)
                            : ""}
                        </Avatar>
                      )}
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                      <Typography
                        variant="h6"
                        style={{ fontWeight: "bold" }}
                        component="h2"
                      >
                        {user.title || ""}&nbsp;{user.firstName || ""}&nbsp;
                        {user.lastName || ""}
                      </Typography>
                      <Typography>{user.emailAddress || ""}</Typography>
                      <Typography>
                        {(user.position && user.position.name) || ""}
                      </Typography>
                      <Typography>{user.role || ""}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions style={{ padding: 0 }}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Button
                      component={Link}
                      to={"/setup/users/user/" + user.id + "/"}
                      size="small"
                      color="primary"
                    >
                      <ManageIcon className={classes.iconButton} />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => editUser(user.id)}
                      color="primary"
                    >
                      <EditIcon className={classes.iconButton} />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => deleteUser(user.id)}
                      color="primary"
                    >
                      <DeleteIcon className={classes.iconButton} />
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} alignItems="center">
            <Typography style={{ margin: 20, fontSize: 30 }}>
              No Users
            </Typography>
          </Grid>
        )}
      </Grid>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => {
      dispatch(deleteUser(id));
    },
    createUser: (user) => {
      dispatch(createUser(user));
    },
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(UsersSetupView)
);
