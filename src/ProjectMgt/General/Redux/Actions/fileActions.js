export const CREATE_FILE = "CREATE_FILE";
export const UPDATE_FILE = "UPDATE_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const FETCH_FILES = "FETCH_FILES";

export const createFile = (file) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "File Added.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });

    dispatch({ type: "CREATE_FILE", file });
  };
};

export const updateFile = (file) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "File updated.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });

    dispatch({ type: "UPDATE_FILE", file });
  };
};

export const deleteFile = (id) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "File deleted.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
        },
      },
    });

    dispatch({ type: "DELETE_FILE", id });
  };
};

export const fetchFiles = () => {};
