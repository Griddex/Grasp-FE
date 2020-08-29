import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddOutlined";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../General/Redux/Actions/projectActions";
import { projects } from "./../../Data/projectData";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    width: "100%",
    margin: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  iconButton: {
    margin: theme.spacing(1),
    fontSize: 24,
    color: "#444444",
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
    borderTop: "5px #FF0099 solid",
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

function ProjectTableView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [newProject, setNewProject] = React.useState({
    id: "",
    name: "",
    description: "",
  });

  function handleClickOpen() {
    setIsEditing(false);
    setNewProject({ id: "", name: "", description: "" });
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const deleteItem = (projectId) => {
    props.deleteProject(projectId);
  };

  const editItem = (projectId) => {
    setIsEditing(true);
    let selectedProject = projects.find((project) => project.id == projectId);

    if (selectedProject) {
      setNewProject(selectedProject);
    }

    setOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  };

  function addProject() {
    props.createProject(newProject);

    setOpen(false);
  }

  function updateProject() {
    props.updateProject(newProject);

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
          New Project
        </ColorButton>
        <Dialog
          open={open}
          fullWidth
          className={classes.modalDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {isEditing ? <span>Edit Project</span> : <span>New Project</span>}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the project name.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="projectname"
              label="Project Name"
              type="projectname"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="dense"
              id="projectdesc"
              label="Project Description"
              type="projectDesc"
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {isEditing ? (
              <Button onClick={updateProject} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={addProject} color="primary">
                Create
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>

      <Grid container spacing={4}>
        {projects && projects.length > 0 ? (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>SN</TableCell>
                  <TableCell align="left">Project Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">No. of Task Groups</TableCell>
                  <TableCell align="left">No. of Tasks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((row, i) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">
                      {row.taskGroups && (row.taskGroups.length || 0)}
                    </TableCell>
                    <TableCell align="left">
                      {row.taskGroups &&
                        row.taskGroups.reduce(
                          (a, b) =>
                            b.tasks && b.tasks.length
                              ? a + b.tasks.length
                              : a + 0,
                          0
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Grid item xs={12} sm={6} md={6}>
            <Typography>No Projects</Typography>
          </Grid>
        )}
      </Grid>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => {
      dispatch(deleteProject(id));
    },
    createProject: (project) => {
      dispatch(createProject(project));
    },
    updateProject: (project) => {
      dispatch(updateProject(project));
    },
    fetchProjects: (projects) => {
      dispatch(fetchProjects(projects));
    },
  };
};

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(ProjectTableView)
);
