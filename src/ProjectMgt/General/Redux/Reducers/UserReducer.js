import { projectMgtState } from "../State/ProjectState";

import {
  CREATE_PROJECT,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
} from "../Actions/userActions";

import {
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  FETCH_ROLES,
} from "../Actions/roleActions";

import {
  CREATE_POSITION,
  UPDATE_POSITION,
  DELETE_POSITION,
  FETCH_POSITIONS,
} from "../Actions/positionActions";

import {
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  FETCH_FOLDERS,
} from "../Actions/folderActions";

import {
  CREATE_FILE,
  UPDATE_FILE,
  DELETE_FILE,
  FETCH_FILES,
} from "../Actions/fileActions";

import {
  CREATE_EMPLOYMENT_TYPE,
  UPDATE_EMPLOYMENT_TYPE,
  DELETE_EMPLOYMENT_TYPE,
  FETCH_EMPLOYMENT_TYPES,
} from "../Actions/employmentTypeActions";

import {
  CREATE_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  FETCH_COMPANIES,
} from "../Actions/companyActions";

export const userReducer = (state = projectMgtState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case DELETE_USER:
      return {
        ...state,
        users: [
          ...state.users.filter((user) => {
            return user.id !== action.id;
          }),
        ],
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user, i) =>
          user.id === action.user.id ? action.user : user
        ),
      };

    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case FETCH_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    // Files
    case DELETE_FOLDER:
      return {
        ...state,
        folders: [
          ...state.folders.filter((folder) => {
            return folder.id !== action.id;
          }),
        ],
      };

    case UPDATE_FOLDER:
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.folder.id ? action.folder : folder
        ),
      };

    case CREATE_FOLDER:
      return {
        ...state,
        folders: [...state.folders, action.folder],
      };
    case FETCH_FOLDERS:
      return {
        ...state,
        folders: [...state.folders, ...action.folders],
      };
    // Files
    case DELETE_FILE:
      return {
        ...state,
        files: [
          ...state.files.filter((file) => {
            return file.id !== action.id;
          }),
        ],
      };

    case UPDATE_FILE:
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === action.file.id ? action.file : file
        ),
      };

    case CREATE_FILE:
      return {
        ...state,
        files: [...state.files, action.file],
      };
    case FETCH_FILES:
      return {
        ...state,
        files: [...state.files, ...action.files],
      };
    // Positions
    case DELETE_POSITION:
      return {
        ...state,
        positions: [
          ...state.positions.filter((position) => {
            return position.id !== action.id;
          }),
        ],
      };

    case UPDATE_POSITION:
      return {
        ...state,
        positions: state.positions.map((position, i) =>
          position.id === action.position.id ? action.position : position
        ),
      };

    case CREATE_POSITION:
      return {
        ...state,
        positions: [...state.positions, action.position],
      };
    case FETCH_POSITIONS:
      return {
        ...state,
        positions: [...state.positions, ...action.positions],
      };
    // Roles
    case DELETE_ROLE:
      return {
        ...state,
        roles: [
          ...state.roles.filter((role) => {
            return role.id !== action.id;
          }),
        ],
      };

    case UPDATE_ROLE:
      return {
        ...state,
        roles: state.roles.map((role, i) =>
          role.id === action.role.id ? action.role : role
        ),
      };

    case CREATE_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.role],
      };
    case FETCH_ROLES:
      return {
        ...state,
        roles: [...state.roles, ...action.roles],
      };
    // Employment Type
    case DELETE_EMPLOYMENT_TYPE:
      return {
        ...state,
        employmentTypes: [
          ...state.employmentTypes.filter((employmentType) => {
            return employmentType.id !== action.id;
          }),
        ],
      };

    case UPDATE_EMPLOYMENT_TYPE:
      return {
        ...state,
        employmentTypes: state.employmentTypes.map((employmentType, i) =>
          employmentType.id === action.employmentType.id
            ? action.employmentType
            : employmentType
        ),
      };

    case CREATE_EMPLOYMENT_TYPE:
      return {
        ...state,
        employmentTypes: [...state.employmentTypes, action.employmentType],
      };
    case FETCH_EMPLOYMENT_TYPES:
      return {
        ...state,
        employmentTypes: [...state.employmentTypes, ...action.employmentTypes],
      };
    // Companies
    case DELETE_COMPANY:
      return {
        ...state,
        companies: [
          ...state.companies.filter((company) => {
            return company.id !== action.id;
          }),
        ],
      };

    case UPDATE_COMPANY:
      return {
        ...state,
        companies: state.companies.map((company, i) =>
          company.id === action.company.id ? action.company : company
        ),
      };

    case CREATE_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.company],
      };
    case FETCH_COMPANIES:
      return {
        ...state,
        companies: [...state.companies, ...action.companies],
      };
    default:
      return { ...state };
  }
};
