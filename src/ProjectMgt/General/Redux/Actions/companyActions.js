export const CREATE_COMPANY = "CREATE_COMPANY";
export const UPDATE_COMPANY = "UPDATE_COMPANY";
export const DELETE_COMPANY = "DELETE_COMPANY";
export const FETCH_COMPANIES = "FETCH_COMPANIES";

export const createCompany = (company) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "CREATE_COMPANY", company });
  };
};

export const updateCompany = (company) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "UPDATE_COMPANY", company });
  };
};

export const deleteCompany = (id) => {
  return (dispatch, getState) => {
    //Make async call to backend

    dispatch({ type: "DELETE_COMPANY", id });
  };
};
export const fetchCompanies = () => {};
