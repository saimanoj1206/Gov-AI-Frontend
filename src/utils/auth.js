export const getUserInfo = async () => {
  const isLocalhost = window.location.hostname === "localhost";

  try {
    const res = await fetch("/.auth/me");
    const data = await res.json();
    const user = data?.clientPrincipal;

    if (user?.userId) {
      return { user_id: user.userId };
    } else {
      if (isLocalhost) {
        console.warn("No user found. Using local_user for localhost.");
        return { user_id: "local_user" };
      } else {
        window.location.href = "/.auth/login/aad";
        return new Promise(() => {});
      }
    }
  } catch (error) {
    console.error("Failed to fetch auth info:", error);
    if (isLocalhost) {
      return { user_id: "local_user" };
    } else {
      window.location.href = "/.auth/login/aad";
      return new Promise(() => {});
    }
  }
};
