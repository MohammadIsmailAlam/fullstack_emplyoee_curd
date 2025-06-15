import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Emp from "./components";
import Header from "./components/Header";
// import SideBar from "./components/SideBar";

function App() {
  return (
    <BrowserRouter>
      {/* <SideBar /> */}
      <Header />
      <Emp />
    </BrowserRouter>
  );
}

export default App;
