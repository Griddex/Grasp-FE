import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddOutlined";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { FrappeGantt } from "frappe-gantt-react";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addTask,
  addTaskGroup,
  createProject,
  deleteProject,
  deleteTask,
  deleteTaskGroup,
  fetchProjects,
  updateTask,
  updateTaskGroup,
} from "../../General/Redux/Actions/projectActions";
import FilesDialogView from "../../Views/FileManager/FilesDialogView";
import { projects, taskGroups } from "./../../Data/projectData";
import { projectMgtState } from "./../../General/Redux/State/ProjectState";

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

const ProjectTaskGroupsGanttView = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
  const [openAttachFilesDialog, setAttachFilesDialog] = React.useState(false);
  const [openAssignUsersDialog, setAssignUsersDialog] = React.useState(false);
  const {
    match: { params },
  } = props;

  // const project = projects.find((p) => p.id == params.projectId);
  // const projectId = params.projectId;
  const projectId = "vaskv7232783tdvlshdfs5";
  const project = projects.find((p) => p.id == "vaskv7232783tdvlshdfs5");
  // const taskGroupId = params.taskGroupId;
  const taskGroupId = "taskGroup1";
  const { users, files } = projectMgtState;
  // const users = props.users;
  // const files = props.files;
  const projectTaskGroups = (project && project.taskGroups) || [];
  // const currentTaskGroup = props.taskGroups.find((tg) => tg.id == taskGroupId);
  const currentTaskGroup = taskGroups.find((tg) => tg.id == taskGroupId);
  const projectTasks =
    (currentTaskGroup &&
      props.tasks.filter((p) => p.taskGroupModelId == currentTaskGroup.id)) ||
    [];
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

  const data = [
    {
      name: "Completed Tasks",
      a:
        (currentTaskGroup &&
          currentTaskGroup.tasks &&
          currentTaskGroup.tasks.filter((i) => i.taskStatus == "Completed")
            .length) ||
        0,
      amt: 2400,
    },
    {
      name: "In Progress",
      b:
        (currentTaskGroup &&
          currentTaskGroup.tasks &&
          currentTaskGroup.tasks.filter((i) => i.taskStatus == "In Progress")
            .length) ||
        0,
      amt: 2400,
    },
    {
      name: "Not Started",
      c:
        (currentTaskGroup &&
          currentTaskGroup.tasks &&
          currentTaskGroup.tasks.filter((i) => i.taskStatus == "Not Started")
            .length) ||
        0,
      amt: 2400,
    },
  ];

  function handleClickOpen() {
    setIsEditing(false);
    setNewTaskGroup({ id: "", name: "", description: "" });
    setOpen(true);
  }

  function handleAssignUsersClickOpen(task) {
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

  const handleUserSelectChange = (name) => (event) => {
    console.warn(name);

    if (!event.target.checked) {
      let newSelectedUsers = selectedUsers.filter((i) => i != name);
      setSelectedUsers([...newSelectedUsers]);
    } else {
      let newSelectedUsers = [...selectedUsers, name];
      setSelectedUsers([...newSelectedUsers]);
    }
    console.warn(selectedUsers);
  };

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
    let selectedTaskGroup = projectTaskGroups.find(
      (project) => project.id == groupId
    );

    if (selectedTaskGroup) {
      setNewTaskGroup(selectedTaskGroup);
    }

    setOpen(true);
  };

  const editTaskItem = (groupId, taskId) => {
    setIsEditingTaskDialog(true);
    let selectedTaskGroup = projectTaskGroups.find(
      (taskGroup) => taskGroup.id === groupId
    );

    if (selectedTaskGroup) {
      let selectedTask = selectedTaskGroup.tasks.find(
        (task) => task.id === taskId
      );

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

  const task1 =
    projectTasks.map((task, i) => {
      return {
        id: task.id,
        name: task.name,
        start: task.taskStart,
        end: task.taskEnd,
        progress: task.taskProgress,
        dependencies: "",
      };
    }) || [];

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
      task: { ...newTask, id: Math.random() },
      projectModelId: params.taskGroupId,
    });

    setOpenTaskDialog(false);
  }

  function updateTask() {
    props.updateTask({
      task: { ...newTask },
      projectModelId: params.taskGroupId,
    });

    setOpenTaskDialog(false);
  }

  function assignUsersToTask() {
    props.updateTask({
      task: { ...newTask, assignedUsers: selectedUsers },
      projectModelId: params.taskGroupId,
    });
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
          {projectName}:{(currentTaskGroup && currentTaskGroup.name) || ""}
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
            to={"/projects/project/" + projectId}
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
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
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
                      setNewTask({ ...newTask, taskStart: date });
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
                      setNewTask({ ...newTask, taskEnd: date });
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
                      checked={selectedUsers.includes(user.id)}
                      color="primary"
                      onChange={handleUserSelectChange(user.id)}
                      inputProps={{
                        "aria-label": "uncontrolled-checkbox",
                      }}
                    />
                    {user.profilePictureUrl && user.profilePictureUrl != "" ? (
                      <Avatar
                        alt="Remy Sharp"
                        src={user.profilePictureUrl}
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
                        {user.firstName} {user.lastName}
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

      <Grid container direction="column" spacing={4}>
        <Grid item xs={12} key="gantt-plot" className={classes.ganttContainer}>
          {task1 && task1.length > 0 && (
            <table flexGrow={1}>
              <tr>
                <td>
                  <FrappeGantt
                    tasks={task1}
                    viewMode="Month"
                    onClick={(task) => console.log(task)}
                    onDateChange={(task, start, end) =>
                      console.log(task, start, end)
                    }
                    onProgressChange={(task, progress) =>
                      console.log(task, progress)
                    }
                    onTasksChange={(tasks) => console.log(tasks)}
                  />
                </td>
              </tr>
            </table>
          )}
        </Grid>
      </Grid>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    tasks: state.tasks,
    taskGroups: state.taskGroups,
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
  connect(mapStateToProps, mapDispatchToProps)(ProjectTaskGroupsGanttView)
);
