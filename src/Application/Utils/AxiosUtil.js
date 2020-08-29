import { authService } from "./../Services/AuthService";

export function axiosHelper() {
  const authHeader = () => {
    // return authorization header with jwt token
    const currentUser = authService.currentUser;
    if (currentUser && currentUser.token) {
      return {
        Authorization: `Bearer ${currentUser.token}`,
        "Access-Control-Allow-Origin": "*",
      };
    } else {
      return { "Access-Control-Allow-Origin": "*" };
    }
  };
}
