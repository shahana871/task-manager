import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import TaskManager from "./TaskManager";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [isRegister, setIsRegister] = useState(false);

  if (loggedIn) {
    return (
      <TaskManager
        onLogout={() => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        }}
      />
    );
  }

  return isRegister ? (
    <div className="auth-wrapper">
      <Register onToggleLogin={() => setIsRegister(false)} />
    </div>
  ) : (
    <div className="auth-wrapper">
      <Login
        onLogin={() => setLoggedIn(true)}
        onToggleRegister={() => setIsRegister(true)}
      />
    </div>
  );
}

export default App;