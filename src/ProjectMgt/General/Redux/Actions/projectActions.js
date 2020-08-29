export const DELETE_PROJECT = "DELETE_PROJECT";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const ADD_TASK_GROUP = "ADD_TASK_GROUP";
export const UPDATE_TASK_GROUP = "UPDATE_TASK_GROUP";
export const DELETE_TASK_GROUP = "DELETE_TASK_GROUP";
export const FETCH_TASK_GROUPS = "FETCH_TASK_GROUPS";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const FETCH_TASKS = "FETCH_TASKS";

export const deleteProject = (id) => {
  //Make async call to backend
  return (dispatch, getState, { axios }) => {
    //Make async call to backend
    axios
      .delete(
        "http://localhost:56941/api/projects/" + id,
        {},
        { headers: { "Access-Control-Allow-Origin": "*" } }
      )
      .then((result) => {
        dispatch({ type: "DELETE_PROJECT", id });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
};

export const createProject = (project) => {
  return (dispatch, getState, { axios }) => {
    //Make async call to backend
    axios
      .post("http://localhost:56941/api/projects", project, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((result) => {
        dispatch({ type: "CREATE_PROJECT", project: result.data });
        dispatch({
          type: "ENQUEUE_SNACKBAR",
          notification: {
            message: "Project Created.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          },
        });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
};

export const updateProject = (project) => {
  return (dispatch, getState, { axios, enqueueSnackbarAction }) => {
    //Make async call to backend
    console.log(project);
    axios
      .put("http://localhost:56941/api/projects/" + project.id, project, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((result) => {
        dispatch({ type: "UPDATE_PROJECT", project });
        dispatch({
          type: "ENQUEUE_SNACKBAR",
          notification: {
            message: "Updated Project.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          },
        });
      })
      .catch((ex) => {
        console.error(ex);
        dispatch({
          type: "ENQUEUE_SNACKBAR",
          notification: {
            message: "Failed to update Project.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          },
        });
      });
  };
};

export const fetchProjects = (projects) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Projects Synchronised.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });
    dispatch({ type: "FETCH_PROJECTS", projects });
  };
};

export const addTaskGroup = (taskGroup) => {
  return (dispatch, getState, { axios, enqueueSnackbarAction }) => {
    //Make async call to backend
    axios
      .post(
        "http://localhost:56941/api/taskgroup/" + taskGroup.projectModelId,
        taskGroup
      )
      .then((result) => {
        dispatch({
          type: "ENQUEUE_SNACKBAR",
          notification: {
            message: "Task Group added.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          },
        });
        dispatch({ type: "ADD_TASK_GROUP", taskGroup: result.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
};

export const updateTaskGroup = (taskGroup) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Task Group updated.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });
    dispatch({ type: "UPDATE_TASK_GROUP", taskGroup: { ...taskGroup } });
  };
};

export const deleteTaskGroup = (taskGroup) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Task Group deleted.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
        },
      },
    });
    dispatch({ type: "DELETE_TASK_GROUP", taskGroup: { ...taskGroup } });
  };
};

export const fetchTaskGroups = () => {};

export const addTask = (task) => {
  return (dispatch, getState, { axios, enqueueSnackbarAction }) => {
    //Make async call to backend
    axios
      .post("http://localhost:56941/api/task/" + task.taskGroupId, task)
      .then((result) => {
        dispatch({
          type: "ENQUEUE_SNACKBAR",
          notification: {
            message: "Task added.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          },
        });
        dispatch({ type: "ADD_TASK", task: result.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
};

export const assignUsersToTask = (task) => {
  return (dispatch, getState, { axios, enqueueSnackbarAction }) => {
    //Make async call to backend
    console.log("With Assigned Users", task);
    axios
      .put(
        "http://localhost:56941/api/task/assignusers/" + task.id,
        task.assignedUsers
      )
      .then((result) => {
        dispatch({
          type: "ENQUEUE_SNACKBAR",
          notification: {
            message: "Users assigned to task: " + task.name + ".",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          },
        });
        dispatch({ type: "UPDATE_TASK", task });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
};

export const updateTask = (task) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Task updated.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });

    dispatch({ type: "UPDATE_TASK", task });
  };
};

export const deleteTask = (task) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Task deleted.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
        },
      },
    });

    dispatch({ type: "DELETE_TASK", task });
  };
};

export const fetchTasks = () => {};
