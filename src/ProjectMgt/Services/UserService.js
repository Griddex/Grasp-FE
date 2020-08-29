import config from "config";
import { authHeader } from "@/Utils";

export const userService = {
  getAll,
};

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(
    (res) => "all users"
  );
}
