export const CREATE_FOLDER = "CREATE_FOLDER";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const FETCH_FOLDERS = "FETCH_FOLDERS";

export const createFolder = (folder) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Folder created.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });

    dispatch({ type: "CREATE_FOLDER", folder });
  };
};

export const updateFolder = (folder) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Folder updated.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      },
    });

    dispatch({ type: "UPDATE_FOLDER", folder });
  };
};

export const deleteFolder = (id) => {
  return (dispatch, getState) => {
    //Make async call to backend
    dispatch({
      type: "ENQUEUE_SNACKBAR",
      notification: {
        message: "Folder deleted.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
        },
      },
    });

    dispatch({ type: "DELETE_FOLDER", id });
  };
};

export const fetchFolders = () => {};
