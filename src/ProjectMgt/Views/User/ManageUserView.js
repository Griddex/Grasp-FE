import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { withSnackbar } from "notistack";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "./../../General/Redux/Actions/userActions";

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

function ManageUserView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState("");

  const [lastName, setLastName] = React.useState(props.currentUser.lastName);
  const {
    match: { params },
  } = props;

  const user = props.users.find((p) => {
    return p.id == params.userId;
  });
  const [currentUser, setCurrentUser] = React.useState(user);
  //console.log(props);

  React.useEffect(() => {
    const user = props.users.find((p) => p.id == params.userId);
    setCurrentUser(user);
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
    props.updateUser(currentUser);
  };

  function onChange(e) {
    let files = e.target.files;
    console.warn("data file", files);

    let reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.warn("img data ", e.target.result);

      let newCurrentUser = {
        ...currentUser,
        profilePictureUrl: e.target.result,
      };
      console.warn("img data ", newCurrentUser);
      props.updateUser(newCurrentUser);
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
    var config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    };

    //axios.post('http://localhost:56941/users/profilepicture', form, {headers:{'Access-Control-Allow-Origin': '*',
    //Authorization: 'Bearer '+ props.currentUser.token}})
    axios
      .post("http://localhost:56941/api/files/upload", form, config)
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
    if (user.profilePictureUrl && user.profilePictureUrl != "") {
      return (
        <Avatar
          alt="Remy Sharp"
          src={currentUser.profilePictureUrl}
          className={classes.bigAvatar}
        />
      );
    } else {
      return (
        <Avatar alt="Remy Sharp" className={classes.bigAvatar}>
          {currentUser.firstName != "" ? currentUser.firstName.charAt(0) : ""}
          {currentUser.lastName != "" ? currentUser.lastName.charAt(0) : ""}
        </Avatar>
      );
    }
  }

  return (
    <main className={classes.content}>
      <Typography variant="h4" gutterBottom>
        {user.title}&nbsp;{user.firstName}&nbsp;{user.lastName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {currentUser.emailAddress || ""}
      </Typography>
      <Grid
        justify="center"
        container
        direction="colrowumn"
        justify="flex-start"
        alignItems="center"
      >
        <Button
          variant="outlined"
          component={Link}
          to={"/setup/users/"}
          color="primary"
        >
          Back
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          variant="contained"
          onClick={updateProfile}
          color="primary"
        >
          Update
        </Button>
      </Grid>
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
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="taskStatus">Title</InputLabel>
            <Select
              autoWidth={true}
              value={currentUser.title}
              onChange={handleInputChange}
              inputProps={{
                name: "title",
                id: "title",
              }}
            >
              <MenuItem value={"Mr"}>Mr</MenuItem>
              <MenuItem value={"Mrs"}>Mrs</MenuItem>
              <MenuItem value={"Ms"}>Ms</MenuItem>
              <MenuItem value={"Prof"}>Prof</MenuItem>
              <MenuItem value={"Dr"}>Dr</MenuItem>
              <MenuItem value={"Miss"}>Miss</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
            value={currentUser.userName || ""}
            onChange={handleInputChange}
            fullWidth
            autoComplete="uname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="emailAddress"
            name="emailAddress"
            label="Email Address"
            value={currentUser.emailAddress || ""}
            onChange={handleInputChange}
            fullWidth
            autoComplete="emailaddress1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="taskStatus">Position</InputLabel>
            <Select
              autoWidth={true}
              value={currentUser.position}
              onChange={handleInputChange}
              inputProps={{
                name: "position",
                id: "position",
              }}
            >
              {props.positions.map((position) => (
                <MenuItem value={position}>{position.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
    users: state.users,
    positions: state.positions,
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(ManageUserView)
);
