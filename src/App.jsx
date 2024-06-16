import "./index.css";
import Weather from "./components/Weather";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState('light')
  return (
    <div className={`app ${theme}`}>
      <Weather theme={theme} setTheme={setTheme}/>
    </div>
  );
};

export default App;
