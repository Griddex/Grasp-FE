export const CREATE_EMPLOYMENT_TYPE = "CREATE_EMPLOYMENT_TYPE";
export const UPDATE_EMPLOYMENT_TYPE = "UPDATE_EMPLOYMENT_TYPE";
export const DELETE_EMPLOYMENT_TYPE = "DELETE_EMPLOYMENT_TYPE";
export const FETCH_EMPLOYMENT_TYPES = "FETCH_EMPLOYMENT_TYPES";

export const createEmploymentType = (employmentType) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "CREATE_EMPLOYMENT_TYPE", employmentType });
  };
};

export const updateEmploymentType = (employmentType) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "UPDATE_EMPLOYMENT_TYPE", employmentType });
  };
};

export const deleteEmploymentType = (id) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "DELETE_EMPLOYMENT_TYPE", id });
  };
};

export const fetchEmploymentTypes = () => {};
