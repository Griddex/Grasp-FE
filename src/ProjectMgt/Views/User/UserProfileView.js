import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { connect } from "react-redux";
import { isNullOrUndefined } from "util";
import Paper from "@material-ui/core/Paper";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    borderLeft: "0px solid #FF0099",
    background: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function UserProfileView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(props.currentUser);
  const [lastName, setLastName] = React.useState(props.currentUser.lastName);

  //console.log(props);

  React.useEffect(() => {
    setCurrentUser(props.currentUser);
  }, [props]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange() {}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateProfile = () => {
    props.dispatch({ type: "SET_CURRENT_USER", currentUser });
  };

  function onChange(e) {
    let files = e.target.files;
    console.warn("data file", files);

    let reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.warn("img data ", e.target.result);

      let newCurrentUser = {
        ...props.currentUser,
        profilePictureUrl: e.target.result,
      };
      console.warn("img data ", newCurrentUser);
      props.dispatch({ type: "SET_CURRENT_USER", currentUser: newCurrentUser });
      //setThumbnail(e.target.result) ;
    };

    const url = "";
    let formData = new FormData();
    //formData.append('File',files[0])

    let form = new FormData();
    /* for (var index = 0; index < files.length; index++) {
            var element = files[index];
            form.append('file', element);
        }*/

    form.append("file", files[0]);
    //formData.append('userId', '1223');

    axios
      .post("http://localhost:56941/users/profilepicture", form, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + props.currentUser.token,
        },
      })
      .then((result) => {
        console.warn("result", result);

        /*let message = "Success!"
                    if (!result.data.success) {
                        message = result.data.message;
                    }
                    this.setState({
                        ...state,
                        justFileServiceResponse: message
                    });*/
      })
      .catch((ex) => {
        console.error(ex);
      });

    /*return axios({
          url:'http://localhost:56941/api/files/upload',
          method:"POST",
          headers:{
            'Content-Type':'multipart/form-data'
          },
          data: formData
        }).then(response=>console.warn("result", response))*/
  }

  function userAvatar() {
    if (!isNullOrUndefined(props.currentUser.profilePictureUrl)) {
      return (
        <Avatar
          alt="Remy Sharp"
          src={props.currentUser.profilePictureUrl}
          className={classes.bigAvatar}
        />
      );
    } else {
      return (
        <Avatar alt="Remy Sharp" className={classes.bigAvatar}>
          KN
        </Avatar>
      );
    }
  }

  return (
    <main className={classes.content}>
      <Typography variant="h6" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={0} className={classes.paper}></Paper>
      <Grid
        justify="center"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {userAvatar()}
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="contained-button-file">
          <Button component="span" className={classes.button}>
            Change Profile Photo
          </Button>
        </label>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={currentUser.firstName || ""}
            onChange={handleInputChange}
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={currentUser.lastName || ""}
            onChange={handleInputChange}
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="userName"
            name="userName"
            label="User name"
            value={props.currentUser.userName}
            fullWidth
            autoComplete="uname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={updateProfile} color="primary">
            Update
          </Button>
        </Grid>
      </Grid>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(UserProfileView);
