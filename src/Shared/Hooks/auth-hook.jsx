import { useDispatch, useSelector } from "react-redux";
import { clearAuthData, setAuthData } from "../../Redux-store/reduceSlice";
import { useCallback } from "react";
import { useEffect } from "react";
// for Authentication Logic
export const useAuth = () => {
  const dispatch = useDispatch();
  //accessing token , userId from auth in reduceSlice
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const logout = useCallback(() => {
    dispatch(clearAuthData());
    localStorage.removeItem("userData");//removing data from local storage only
  }, [dispatch]);
  const login = useCallback(// Callback for memoization
    (userId, token, tokenExpiration) => {
      dispatch(setAuthData({ userId, token, tokenExpiration }));
      if (tokenExpiration) {
        const tokenExpirationTime =
          new Date(tokenExpiration).getTime() - new Date().getTime();
        setTimeout(logout, tokenExpirationTime);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId,
            token,
            tokenExpiration: new Date(tokenExpiration).toISOString(),
          })
        );
      } else {
        // Handle the case when tokenExpiration is not provided or invalid.
        console.error("Invalid token expiration date.");
      }
    },
    [dispatch, logout]
  );
  
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
    if (
      storedUserData &&
      storedUserData.token &&
      new Date(storedUserData.tokenExpiration) > new Date()
    ) {
      login(
        storedUserData.userId,
        storedUserData.token,
        new Date(storedUserData.tokenExpiration)
      );
    }
  }, [dispatch, login]);
  return {
    token,
    login,
    userId,
    logout,
  };
};
