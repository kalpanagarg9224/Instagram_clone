import Router from "./Pages/Router/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfileAction } from "./Redux/User/Action";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
      // console.log("TOKEN:", token);


    if (token) {
      dispatch(getUserProfileAction(token));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
