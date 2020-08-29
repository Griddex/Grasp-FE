export const startupMiddleware = (store) => (next) => (action) => {
  if (action.type === "") {

    authService.currentUser.subscribe((x) => this.setState({ currentUser: x }));

    axios.interceptors.request.use((config) => {
      let currentUser = authService.currentUser;

      if (currentUser && currentUser.token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${currentUser.token}`,
          "Access-Control-Allow-Origin": "*",
        };
      } else {
        config.headers = {
          ...config.headers,
          "Access-Control-Allow-Origin": "*",
        };
      }

      return config;
    });

    //Load projects
    const fetchData = async () => {
      axios
        .get("http://localhost:56941/api/projects")
        .then((result) => {
          //console.warn("result", result.data);
          this.props.enqueueSnackbarAction("Successfully fetched the data.");
          //this.props.fetchProjects(result.data);
          this.props.dispatch({
            type: "FETCH_PROJECTS",
            projects: result.data,
          });
        })
        .catch((ex) => {
          console.error(ex);
        });

      axios
        .get("http://localhost:56941/api/taskGroup")
        .then((result) => {
          console.warn("taskGroups", result.data);
          this.props.enqueueSnackbarAction("Successfully fetched the data.");
          //this.props.fetchProjects(result.data);
          this.props.dispatch({
            type: "FETCH_TASK_GROUPS",
            taskGroups: result.data,
          });
        })
        .catch((ex) => {
          console.error(ex);
        });

      axios
        .get("http://localhost:56941/api/task")
        .then((result) => {
          console.warn("taskGroups", result.data);
          this.props.enqueueSnackbarAction("Successfully fetched the data.");
          //this.props.fetchProjects(result.data);
          this.props.dispatch({ type: "FETCH_TASKS", tasks: result.data });
        })
        .catch((ex) => {
          console.error(ex);
        });

      const currentUser = authService.currentUser;

      axios
        .get("http://localhost:56941/users", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((result) => {
          this.props.enqueueSnackbarAction("Successfully fetched User data.");
          if (result.data.length > 0)
            result.data.map((user) =>
              this.props.dispatch({ type: "CREATE_USER", user })
            );
        })
        .catch((ex) => {
          console.error(ex);
        });

      axios
        .get("http://localhost:56941/api/files", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((result) => {
          this.props.enqueueSnackbarAction("Successfully fetched User files.");
          console.warn("Files", result.data);
          if (result.data.length > 0)
            this.props.dispatch({ type: "FETCH_FILES", files: result.data });
        })
        .catch((ex) => {
          console.error(ex);
        });
    };

    fetchData();
  }




  }
  return next(action);
};
