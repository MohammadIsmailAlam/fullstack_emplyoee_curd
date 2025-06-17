import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Emp from "./pages";
import Header from "./assets/Components/Header/Header";
import SideBar from "./assets/Components/SideBar/SideBar";

function App() {
  return (
    <BrowserRouter>
      {/* Add ToastContainer here - it should be at the root level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
