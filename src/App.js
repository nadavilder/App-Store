import "./App.css";
import Bars from "./components/bars";
import RegisterScreen from "./screens/register";
import LoginScreen from "./screens/login";
import store_state from "./state";
import { observer } from "remx";

function App() {
  const { getIsLoggedIn, getIsRegistered } = store_state;
  const existingUser = getIsRegistered();
  let isConnected = existingUser && getIsLoggedIn();

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    let user = getCookie("experationTime");
    console.log("user:" + user);
    if (user !== "") {
      isConnected = true;
    } else {
      isConnected = false;
    }
  }
  checkCookie();
  return (
    <div className="App">
      {isConnected ? (
        <div>
          <Bars />
        </div>
      ) : existingUser ? (
        <LoginScreen />
      ) : (
        <RegisterScreen />
      )}
    </div>
  );
}

export default observer(App);
