import { authService } from "./../Services/AuthService";

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = authService.currentUser;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}
