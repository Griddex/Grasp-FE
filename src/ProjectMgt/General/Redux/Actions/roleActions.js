export const CREATE_ROLE = "CREATE_ROLE";
export const UPDATE_ROLE = "UPDATE_ROLE";
export const DELETE_ROLE = "DELETE_ROLE";
export const FETCH_ROLES = "FETCH_ROLES";

export const createRole = (role) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "CREATE_ROLE", role });
  };
};

export const updateRole = (role) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "UPDATE_ROLE", role });
  };
};

export const deleteRole = (id) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "DELETE_ROLE", id });
  };
};

export const fetchRoles = () => {};
