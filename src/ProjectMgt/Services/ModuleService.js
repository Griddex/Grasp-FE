import { authHeader } from "@/Utils";

export const moduleService = {
  getAll,
};

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`http://localhost:56941/modules`, requestOptions).then(
    (res) => "All modules"
  );
}
