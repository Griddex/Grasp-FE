import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SearchIcon from "@material-ui/icons/Search";
import ManageIcon from "@material-ui/icons/SettingsOutlined";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../General/Redux/Actions/userActions";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    borderTop: "5px solid #0099FF",
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
  iconButton: {
    margin: theme.spacing(0.5),
    fontSize: 24,
    color: "#164265",
  },
  iconButton2: {
    margin: theme.spacing(0.5),
    fontSize: 20,
    color: "#555555",
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

function CompanySetupView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const users = props.users;
  const departments = props.departments;
  const roles = props.roles;
  const salaryStructure = props.salaryStructure;
  const companies = props.companies;
  const gender = props.gender;
  const position = props.position;

  const [isEditing, setIsEditing] = React.useState(false);

  const [newUser, setNewUser] = React.useState({
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

  const deleteUser = (userId) => {
    props.deleteUser(userId);
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
          Create New Company
        </ColorButton>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "Search" }}
          />
        </div>
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
        {companies && companies.length > 0 ? (
          companies.map((company) => (
            <Grid item key={company.id} xs={12} sm={6} md={6}>
              <Paper key={company.id} className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>{company.name}</Typography>
                    <Typography>{company.name}</Typography>
                    <Box>
                      <Moment format="LL" date={company.dateCreated} />
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      size="small"
                      onClick={() => handleAssignUsersClickOpen(company)}
                      color="primary"
                    >
                      <ManageIcon className={classes.iconButton2} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => editTaskItem(company.id)}
                      color="primary"
                    >
                      <EditIcon className={classes.iconButton2} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => deleteTaskItem(company)}
                      color="primary"
                    >
                      <DeleteIcon className={classes.iconButton2} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
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
    companies: state.companies,
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
  connect(mapStateToProps, mapDispatchToProps)(CompanySetupView)
);
