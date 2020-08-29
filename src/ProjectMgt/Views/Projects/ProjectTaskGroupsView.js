import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddOutlined";
import AttachIcon from "@material-ui/icons/AttachFileOutlined";
import BarChartIcon from "@material-ui/icons/BarChartOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FilesDialogView from "../../Views/FileManager/FilesDialogView";
import {
  addTask,
  addTaskGroup,
  assignUsersToTask,
  createProject,
  deleteProject,
  deleteTask,
  deleteTaskGroup,
  fetchProjects,
  updateTask,
  updateTaskGroup,
} from "./../../General/Redux/Actions/projectActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  ganttContainer: {
    marginLeft: drawerWidth,
    overflow: "scroll",
    maxWidth: "100%",
    display: "flex",
    right: 0,
    position: "fixed",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth + 50}px)`,
    },
  },
  icon: {
    marginRight: theme.spacing(2),
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
  fab: {
    margin: theme.spacing(1),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  taskGroupCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "none",
    borderTop: "0px ",
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderTop: "5px #0099FF solid",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    background: "none",
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    borderTop: "5px solid #0099FF",
  },
  breadCrumbPaper: {
    maxWidth: 400,
    padding: theme.spacing(2),
    borderLeft: "0px solid #FF0099",
    background: "none",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
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
    color: "FFFFFF",
    backgroundColor: "0099FF",
    "&:hover": {
      backgroundColor: "0099FF",
    },
  },
}))(Button);

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    borderRadius: 20,
    backgroundColor: lighten("#4caf50", 0.8),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#4caf50",
  },
})(LinearProgress);

function ProjectTaskGroupsView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
  const [openAttachFilesDialog, setAttachFilesDialog] = React.useState(false);
  const [openAssignUsersDialog, setAssignUsersDialog] = React.useState(false);
  const projects = [];
  const {
    match: { params },
  } = props;

  const project = props.projects.find((p) => {
    return p.id == params.taskGroupId;
  });

  const users = props.users;
  const files = props.files;
  const projectTaskGroups =
    (project &&
      props.taskGroups &&
      props.taskGroups.filter((p) => {
        return p.projectModelId == project.id;
      })) ||
    [];

  const projectTasks = props.tasks || [];
  const projectName = (project && project.name) || "---";
  const [isEditing, setIsEditing] = React.useState(false);
  const [isEditingTaskDialog, setIsEditingTaskDialog] = React.useState(false);
  const [newTaskGroup, setNewTaskGroup] = React.useState({
    id: "",
    name: "",
    description: "",
  });

  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [dialogProps, setDialogProps] = React.useState({});
  const [newTask, setNewTask] = React.useState({
    id: "",
    name: "Task" + Math.random(),
    description: "",
    taskStart: new Date("2018-01-01T00:00:00.000Z"),
    taskEnd: new Date("2018-01-01T00:00:00.000Z"),
    taskPriority: "5",
    taskStatus: "Not Started",
    taskProgress: "0",
  });

  function handleClickOpen() {
    setIsEditing(false);
    setNewTaskGroup({ id: "", name: "", description: "" });
    setOpen(true);
  }

  function handleAssignUsersClickOpen(task) {
    //console.warn("seltast", task);
    task.assignedUsers
      ? setSelectedUsers([...task.assignedUsers])
      : setSelectedUsers([]);
    setNewTask(task);
    setAssignUsersDialog(true);
  }

  function handleAttachFilesClickOpen(task) {
    task.attachedFiles
      ? setSelectedFiles([...task.attachedFiles])
      : setSelectedFiles([]);
    setNewTask(task);
    setDialogProps({
      ...dialogProps,
      dialogTitle: "Attach files to " + task.name,
      selectedItems: task.attachedFiles || [],
      setSelectedItems: (values) => {
        setSelectedFiles(values);
        console.warn(values);
      },
    });
    setAttachFilesDialog(true);
  }

  const handleUserSelectChange = (user) => (event) => {
    //console.warn(user)

    if (!event.target.checked) {
      let newSelectedUsers = selectedUsers.filter((i) => i.id != user.id);
      setSelectedUsers([...newSelectedUsers]);
    } else {
      let newSelectedUsers = [...selectedUsers, user];
      setSelectedUsers([...newSelectedUsers]);
    }
    //console.warn(selectedUsers)
  };

  /*const handleUserSelectChange = name => event => {

    console.warn(name)

    if(!event.target.checked)
    {
      let newSelectedUsers = selectedUsers.filter((i)=>i!=name);
      setSelectedUsers([...newSelectedUsers]);
    }
    else
    {
      let newSelectedUsers = [...selectedUsers,name];
      setSelectedUsers([...newSelectedUsers]);
    }
    console.warn(selectedUsers)
    
  };*/

  function handleCloseAssignUsersDialog() {
    setAssignUsersDialog(false);
  }

  function handleCloseAttachFilesDialog() {
    setAttachFilesDialog(false);
  }

  function handleClickOpenTaskDialog(taskGroupId) {
    setIsEditingTaskDialog(false);
    setNewTask({
      taskGroupId,
      name: "New Task",
      description: "",
      taskStart: new Date("2018-01-01T00:00:00.000Z"),
      taskEnd: new Date("2018-01-01T00:00:00.000Z"),
      taskPriority: "5",
      taskStatus: "Not Started",
      taskProgress: "0",
    });
    setOpenTaskDialog(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleCloseTaskDialog() {
    setOpenTaskDialog(false);
  }

  const deleteItem = (taskGroup) => {
    props.deleteTaskGroup(taskGroup);
  };

  const deleteTaskItem = (task) => {
    props.deleteTask({ task, projectModelId: params.taskGroupId });
  };

  const editItem = (groupId) => {
    //props.deleteProject(projectId);
    setIsEditing(true);
    let selectedTaskGroup = projectTaskGroups.find((project) => {
      return project.id == groupId;
    });

    if (selectedTaskGroup) {
      setNewTaskGroup(selectedTaskGroup);
    }

    setOpen(true);
  };

  const editTaskItem = (groupId, taskId) => {
    setIsEditingTaskDialog(true);
    let selectedTaskGroup = projectTaskGroups.find((taskGroup) => {
      return taskGroup.id === groupId;
    });

    if (selectedTaskGroup) {
      let selectedTask = projectTasks.find((task) => {
        return task.id === taskId;
      });

      console.warn("GT", selectedTask);

      if (selectedTask) {
        setNewTask(selectedTask);
        setOpenTaskDialog(true);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTaskGroup({ ...newTaskGroup, [name]: value });
  };

  const handleTaskInputChange = (event) => {
    const { name, value } = event.target;
    console.warn({ name, value });
    console.log(newTask);
    setNewTask({ ...newTask, [name]: value });
  };

  function addNewTaskGroup() {
    props.addTaskGroup({
      ...newTaskGroup,
      id: Math.random(),
      projectModelId: params.taskGroupId,
    });

    setOpen(false);
  }

  function updateTaskGroup() {
    props.updateTaskGroup(newTaskGroup);

    setOpen(false);
  }

  function addNewTask() {
    props.addTask({
      ...newTask,
      id: Math.random(),
      taskGroupModelId: params.taskGroupId,
    });

    setOpenTaskDialog(false);
  }

  function updateTask() {
    props.updateTask(newTask);

    setOpenTaskDialog(false);
  }

  function assignUsersToTask() {
    console.log("isisss", newTask);
    props.assignUsersToTask({ ...newTask, assignedUsers: selectedUsers });
    setAssignUsersDialog(false);
    //setOpenTaskDialog(false);
  }

  function attachFilesToTask() {
    props.updateTask({
      task: { ...newTask, attachedFiles: selectedFiles },
      projectModelId: params.taskGroupId,
    });
    setAttachFilesDialog(false);
    //setOpenTaskDialog(false);
  }

  function deleteFileFromTaskItem(taskItem, fileId) {
    console.warn({ taskItem, fileId });
    let newAttachedFiles = taskItem.attachedFiles.filter(
      (file) => file !== fileId
    );
    props.updateTask({
      task: { ...taskItem, attachedFiles: newAttachedFiles },
      projectModelId: params.taskGroupId,
    });
  }

  useEffect(() => {}, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}>
        <Typography variant="h5" gutterBottom>
          {projectName}
        </Typography>

        <Grid
          justify="center"
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Button
            variant="outlined"
            component={Link}
            to={"/projects/"}
            color="primary"
          >
            Back
          </Button>
          <ColorButton
            style={{ marginLeft: 5 }}
            variant="contained"
            className={classes.link}
            color="primary"
            onClick={handleClickOpen}
          >
            <AddIcon />
            New Task Group
          </ColorButton>
        </Grid>

        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {isEditing ? (
              <span>Edit Task Group</span>
            ) : (
              <span>New Task Group</span>
            )}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the project title.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="projecttitle"
              label="Task Group Name"
              type="projecttitle"
              name="name"
              value={newTaskGroup.name}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="dense"
              id="taskgroupdesc"
              label="Task Group Description"
              type="taskGroupDesc"
              name="description"
              value={newTaskGroup.description}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {isEditing ? (
              <Button onClick={updateTaskGroup} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={addNewTaskGroup} color="primary">
                Create
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <Dialog
          open={openTaskDialog}
          fullWidth
          onClose={handleCloseTaskDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {isEditingTaskDialog ? (
              <span>Edit Task </span>
            ) : (
              <span>New Task </span>
            )}
            {console.log(newTask)}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="taskName"
              label="Task Title"
              name="name"
              value={newTask.name}
              onChange={handleTaskInputChange}
              fullWidth
            />

            <TextField
              margin="dense"
              id="taskgroupdesc"
              label="Task Description"
              type="taskGroupDesc"
              multiline
              rowsMax="4"
              name="description"
              value={newTask.description}
              onChange={handleTaskInputChange}
              fullWidth
            />

            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <KeyboardDateTimePicker
                    margin="normal"
                    name="taskStart"
                    id="taskStart"
                    label="Start Date"
                    value={newTask.taskStart}
                    onChange={(date) => {
                      setNewTask({ ...newTask, taskStart: date.toDate() });
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <KeyboardDateTimePicker
                    margin="normal"
                    name="taskEnd"
                    id="taskEnd"
                    label="End Date"
                    value={newTask.taskEnd}
                    onChange={(date) => {
                      console.log(date);
                      setNewTask({ ...newTask, taskEnd: date.toDate() });
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="taskProgress"
                    name="taskProgress"
                    label="Progress"
                    value={newTask.taskProgress}
                    onChange={handleTaskInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="taskStatus">Status</InputLabel>
                    <Select
                      autoWidth={true}
                      value={newTask.taskStatus}
                      onChange={handleTaskInputChange}
                      inputProps={{
                        name: "taskStatus",
                        id: "taskStatus",
                      }}
                    >
                      <MenuItem value={"Not Started"}>Not Started</MenuItem>
                      <MenuItem value={"In Progress"}>In Progress</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="taskPriority">Priority</InputLabel>
                    <Select
                      autoWidth={true}
                      value={newTask.taskPriority}
                      onChange={handleTaskInputChange}
                      inputProps={{
                        name: "taskPriority",
                        id: "taskPriority",
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTaskDialog} color="primary">
              Cancel
            </Button>
            {isEditingTaskDialog ? (
              <Button onClick={updateTask} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={addNewTask} color="primary">
                Create
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <Dialog
          open={openAssignUsersDialog}
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Assign to Users</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              {users.map((user) => (
                <Grid
                  item
                  container
                  key={user.id}
                  xs={12}
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <React.Fragment>
                    <Checkbox
                      value={user.id}
                      checked={selectedUsers.find((u) => u.id == user.id)}
                      color="primary"
                      onChange={handleUserSelectChange(user)}
                      inputProps={{
                        "aria-label": "uncontrolled-checkbox",
                      }}
                    />
                    {user.profilePictureId ? (
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
                    <Grid item>
                      <Typography>
                        {user.firstName || ""} {user.lastName || ""}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAssignUsersDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={assignUsersToTask} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openAttachFilesDialog}
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Attach Files</DialogTitle>
          <DialogContent>
            <FilesDialogView isMultiSelect={true} {...dialogProps} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAttachFilesDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={attachFilesToTask} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Grid container direction="row" spacing={4}>
        {projectTaskGroups.map((taskGroup) => (
          <>
            <Grid item key={taskGroup.id} xs={12} sm={6}>
              <Card raised={false} className={classes.taskGroupCard}>
                <CardContent className={classes.cardContent}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Tooltip disableFocusListener title={taskGroup.description}>
                      <Typography variant="h6" component="h3">
                        {taskGroup.name}
                      </Typography>
                    </Tooltip>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpenTaskDialog(taskGroup.id)}
                        className={classes.fab}
                        color="secondary"
                      >
                        <AddIcon className={classes.iconButton} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => editItem(taskGroup.id)}
                        className={classes.fab}
                        color="primary"
                      >
                        <EditIcon className={classes.iconButton} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteItem(taskGroup)}
                        className={classes.fab}
                        color="primary"
                      >
                        <DeleteIcon className={classes.iconButton} />
                      </IconButton>
                      <IconButton
                        size="small"
                        component={Link}
                        to={
                          "/projects/" +
                          params.taskGroupId +
                          "/gantt/" +
                          taskGroup.id
                        }
                        color="primary"
                      >
                        <BarChartIcon className={classes.iconButton} />
                      </IconButton>
                    </Box>
                  </Grid>

                  {projectTasks &&
                  projectTasks.filter((t) => t.taskGroupModelId == taskGroup.id)
                    .length > 0 ? (
                    projectTasks
                      .filter((t) => t.taskGroupModelId == taskGroup.id)
                      .map((task) => (
                        <Paper key={task.id} className={classes.paper}>
                          <Grid container spacing={2}>
                            <Grid
                              item
                              container
                              spacing={2}
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                            >
                              {task.assignedUsers &&
                                task.assignedUsers.map((user, indx) => (
                                  <Grid item key={user.id || indx}>
                                    <React.Fragment>
                                      {user.profilePictureId ? (
                                        <Avatar
                                          alt="Remy Sharp"
                                          title={
                                            ((user.firstName &&
                                              user.firstName) ||
                                              "") +
                                            " " +
                                            ((user.lastName && user.lastName) ||
                                              "")
                                          }
                                          src={
                                            "http://localhost:56941/users/profilepicture/" +
                                            user.id +
                                            "/" +
                                            user.profilePictureId
                                          }
                                          className={classes.bigAvatar}
                                        />
                                      ) : (
                                        <Avatar
                                          alt="Remy Sharp"
                                          className={classes.bigAvatar}
                                        >
                                          {user.firstName &&
                                          user.firstName != ""
                                            ? user.firstName.charAt(0)
                                            : ""}
                                          {user.lastName && user.lastName != ""
                                            ? user.lastName.charAt(0)
                                            : ""}
                                        </Avatar>
                                      )}
                                    </React.Fragment>
                                  </Grid>
                                ))}
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>{task.name}</Typography>
                              <Typography>{task.taskStatus}</Typography>
                              <Box>
                                <Moment format="LL" date={task.taskStart} />
                                <Moment
                                  style={{ marginLeft: 10 }}
                                  format="LL"
                                  date={task.taskEnd}
                                />
                              </Box>

                              <BorderLinearProgress
                                className={classes.margin}
                                variant="determinate"
                                color="primary"
                                value={parseInt(task.taskProgress, 10)}
                              />
                            </Grid>
                            <Grid
                              item
                              container
                              spacing={2}
                              direction="column"
                              justify="flex-start"
                              alignItems="flex-start"
                            >
                              {files.map(
                                (file) =>
                                  task.attachedFiles &&
                                  task.attachedFiles.includes(file.id) && (
                                    <Grid
                                      item
                                      key={file.id}
                                      container
                                      spacing={2}
                                      direction="row"
                                      justify="space-between"
                                      alignItems="flex-start"
                                    >
                                      <Typography>{file.fileName}</Typography>
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          deleteFileFromTaskItem(task, file.id)
                                        }
                                        color="primary"
                                      >
                                        <DeleteIcon
                                          className={classes.iconButton2}
                                        />
                                      </IconButton>
                                    </Grid>
                                  )
                              )}
                            </Grid>
                            <Grid item xs>
                              <IconButton
                                size="small"
                                onClick={() => handleAssignUsersClickOpen(task)}
                                color="primary"
                              >
                                <AddIcon className={classes.iconButton2} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleAttachFilesClickOpen(task)}
                                color="primary"
                              >
                                <AttachIcon className={classes.iconButton2} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  editTaskItem(taskGroup.id, task.id)
                                }
                                color="primary"
                              >
                                <EditIcon className={classes.iconButton2} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => deleteTaskItem(task)}
                                color="primary"
                              >
                                <DeleteIcon className={classes.iconButton2} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))
                  ) : (
                    <Grid
                      container
                      wrap=""
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Typography>No Tasks</Typography>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    taskGroups: state.taskGroups,
    tasks: state.tasks,
    users: state.users,
    files: state.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => {
      dispatch(deleteProject(id));
    },
    addTaskGroup: (taskGroup) => {
      dispatch(addTaskGroup(taskGroup));
    },
    deleteTaskGroup: (taskGroup) => {
      dispatch(deleteTaskGroup(taskGroup));
    },
    updateTaskGroup: (taskGroup) => {
      dispatch(updateTaskGroup(taskGroup));
    },
    addTask: (task) => {
      dispatch(addTask(task));
    },
    assignUsersToTask: (task) => {
      dispatch(assignUsersToTask(task));
    },
    deleteTask: (task) => {
      dispatch(deleteTask(task));
    },
    updateTask: (task) => {
      dispatch(updateTask(task));
    },
    createProject: (project) => {
      dispatch(createProject(project));
    },
    fetchProjects: (projects) => {
      dispatch(fetchProjects(projects));
    },
  };
};

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(ProjectTaskGroupsView)
);
