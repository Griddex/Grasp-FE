import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { purple } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../General/Redux/Actions/projectActions";
import { projects } from "../../Data/projectData";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
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
    borderTop: "5px #9900FF solid",
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
    color: theme.palette.getContrastText(purple[800]),
    backgroundColor: purple[800],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

function ProjectsView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const projectTaskGroups = props.taskGroups;
  const projectTasks = props.tasks;
  const [isEditing, setIsEditing] = React.useState(false);
  const [newProject, setNewProject] = React.useState({
    id: "",
    name: "",
    description: "",
  });

  //console.log(props)
  const handleClickOpen = () => {
    setIsEditing(false);
    setNewProject({ id: "", name: "", description: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTaskGroupCount = (projectId) => {
    return (
      (props.taskGroups &&
        props.taskGroups.filter((p) => {
          return p.projectModelId == projectId;
        }).length) ||
      0
    );
  };

  const getTaskCount = (projectId) => {
    let taskGroupsInProject =
      (props.taskGroups &&
        props.taskGroups.filter((p) => {
          return p.projectModelId == projectId;
        })) ||
      [];

    if (taskGroupsInProject.length <= 0) return 0;

    let tasksInGroupCount = 0;

    for (let i = 0; i < taskGroupsInProject.length; i++) {
      tasksInGroupCount +=
        (props.tasks &&
          props.tasks.filter((p) => {
            return p.taskGroupModelId == taskGroupsInProject[i].id;
          }).length) ||
        0;
    }

    return tasksInGroupCount;
  };

  const deleteItem = (projectId) => {
    props.deleteProject(projectId);
  };

  const editItem = (projectId) => {
    //props.deleteProject(projectId);
    setIsEditing(true);
    let selectedProject = projects.find((project) => {
      return project.id == projectId;
    });

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

  useEffect(() => {
    /*const fetchData = async () => {
        
        //if(isNullOrUndefined(props.projects))
        //  return;

      axios.get('http://localhost:56941/api/projects')
            .then((result) => {
              console.warn("result", result.data);
              props.fetchProjects(result.data);
               
            })
            .catch((ex) => {
                console.error(ex);
            });
  
        //setData(result.data);
      };
  
      fetchData();*/
  }, [props]);

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
          projects.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold" }}
                    component="h2"
                  >
                    {card.name}
                  </Typography>
                  <Typography>{card.description}</Typography>
                  <Typography>
                    {getTaskGroupCount(card.id) > 0
                      ? "Task Groups • " + getTaskGroupCount(card.id)
                      : "No Task Group"}
                  </Typography>
                  <Typography>
                    {"Tasks • "}
                    {getTaskCount(card.id)}
                  </Typography>
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
                      to={"/projects/project/" + card.id + "/"}
                      size="small"
                      color="primary"
                    >
                      <ManageIcon className={classes.iconButton} />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => editItem(card.id)}
                      color="primary"
                    >
                      <EditIcon className={classes.iconButton} />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => deleteItem(card.id)}
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
    taskGroups: state.taskGroups,
    tasks: state.tasks,
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
  connect(mapStateToProps, mapDispatchToProps)(ProjectsView)
);
