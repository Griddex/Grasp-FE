export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const FETCH_USERS = "FETCH_USERS";

//CHECK THIS - CREATE_PROJECT mixed with SET_CURRENT_USER
export const setCurrentUser = (currentUser) => {
  return (dispatch, getState, { axios }) => {
    //Make async call to backend
    console.log(project);
    axios
      .post("http://localhost:56941/api/projects", project, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((result) => {
        dispatch({ type: "CREATE_PROJECT", project: result.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
};

export const createUser = (user) => {
  return (dispatch, getState, { axios, enqueueSnackbarAction }) => {
    //Make async call to backend
    console.warn("new user", user);
    axios
      .post("http://localhost:56941/users/create", user)
      .then((result) => {
        dispatch({
          type: "ENQUEUE_SNACKBAR",
          notification: {
            message: "New user created.",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          },
        });
        dispatch({ type: "CREATE_USER", user });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
};

export const updateUser = (user) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "User updated.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });

    dispatch({ type: "UPDATE_USER", user });
  };
};

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "User deleted.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
        },
      },
    });

    dispatch({ type: "DELETE_USER", id });
  };
};

export const fetchUsers = () => {};
