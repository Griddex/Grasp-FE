import { projectMgtState } from "./../State/ProjectState";
import {
  DELETE_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  FETCH_PROJECTS,
  ADD_TASK_GROUP,
  UPDATE_TASK_GROUP,
  DELETE_TASK_GROUP,
  FETCH_TASK_GROUPS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FETCH_TASKS,
} from "./../Actions/projectActions";

export const projectReducer = (state = projectMgtState, action) => {
  // Projects
  switch (action.type) {
    case DELETE_PROJECT: {
      let newProjects = state.projects.filter((project) => {
        return project.id !== action.id;
      });

      return {
        ...state,
        projects: newProjects,
      };
    }
    case UPDATE_PROJECT: {
      let newProjects = state.projects.filter((project) => {
        return project.id !== action.project.id;
      });
      newProjects = [...newProjects, action.project];
      return {
        ...state,
        projects: newProjects,
        projects: state.projects.map((project, i) =>
          project.id === action.project.id ? action.project : project
        ),
      };
    }
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.project],
      };
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, ...action.projects],
      };
    // Projects Task Group
    case DELETE_TASK_GROUP: {
      let newTaskGroups = state.taskGroups.filter((taskGroup) => {
        return taskGroup.id !== action.id;
      });

      return {
        ...state,
        taskGroups: newTaskGroups,
      };
    }
    case UPDATE_TASK_GROUP: {
      //let newTaskGroups = state.taskGroups.filter(project => {return project.id !== action.project.id});
      //newTaskGroups = [...newTaskGroups, action.taskGroup]
      return {
        ...state,

        taskGroups: state.taskGroups.map((taskGroup, i) =>
          taskGroup.id === action.taskGroup.id ? action.taskGroup : taskGroup
        ),
      };
    }
    case ADD_TASK_GROUP:
      return {
        ...state,
        taskGroups: [...state.taskGroups, action.taskGroup],
      };
    case FETCH_TASK_GROUPS:
      return {
        ...state,
        taskGroups: [...state.taskGroups, ...action.taskGroups],
      };
    // Projects Task Group
    case DELETE_TASK: {
      let newTasks = state.tasks.filter((task) => {
        return task.id !== action.id;
      });

      return {
        ...state,
        tasks: newTasks,
      };
    }
    case UPDATE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id ? action.task : task
        ),
      };
    }
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case FETCH_TASKS:
      return {
        ...state,
        tasks: [...state.tasks, ...action.tasks],
      };
    default:
      return { ...state };
  }
};
