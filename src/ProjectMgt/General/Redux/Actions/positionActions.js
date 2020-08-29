export const CREATE_POSITION = "CREATE_POSITION";
export const UPDATE_POSITION = "UPDATE_POSITION";
export const DELETE_POSITION = "DELETE_POSITION";
export const FETCH_POSITIONS = "FETCH_POSITIONS";

export const createPosition = (position) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "CREATE_POSITION", position });
  };
};

export const updatePosition = (position) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "UPDATE_POSITION", position });
  };
};

export const deletePosition = (id) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "DELETE_POSITION", id });
  };
};

export const fetchPositions = () => {};
