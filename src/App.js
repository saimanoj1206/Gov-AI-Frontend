import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import { getUserInfo } from "./utils/auth";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUser = async () => {
      const userData = await getUserInfo();
      dispatch(setUser({ ...userData }));
    };
    initializeUser();
  }, [dispatch]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
