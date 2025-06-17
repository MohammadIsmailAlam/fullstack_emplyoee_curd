import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Emp from "./pages";
import Header from "./assets/Components/Header/Header";
import SideBar from "./assets/Components/SideBar/SideBar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Sidebar */}
        <div className="fixed h-screen w-60 bg-gray-800 text-white z-40 toggol">
          <SideBar />
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-1 ml-60 min-h-screen side-toggol">
          {/* Navbar (aligned with main content) */}
          <div className="w-full bg-white shadow z-30">
            <Header />
          </div>

          {/* Routed content */}
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <Emp />
            {/* <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddBook />} />
              <Route path="/edit/:id" element={<EditBook />} />
            </Routes> */}
          </main>
        </div>
      </div>

      {/* <SideBar />
      <Header />
      <Emp /> */}
    </BrowserRouter>
  );
}

export default App;
