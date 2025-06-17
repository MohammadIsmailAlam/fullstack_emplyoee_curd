import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Emp from "./pages";
import Header from "./assets/Components/Header/Header";
import SideBar from "./assets/Components/SideBar/SideBar";
import type { User } from "./types/auth";
import AuthForm from "./auth/Form";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loginData: { email: string; password: string }) => {
    // Replace with actual API call
    console.log("Login data:", loginData);
    setUser({ email: loginData.email, name: "Test User" });
  };

  const handleRegister = (registerData: {
    email: string;
    password: string;
    name: string;
  }) => {
    // Replace with actual API call
    console.log("Register data:", registerData);
    setUser({ email: registerData.email, name: registerData.name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
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
        {user ? (
          <>
            {/* Sidebar - only shown when logged in */}
            <div className="fixed h-screen w-60 bg-gray-800 text-white z-40 toggol">
              <SideBar onLogout={handleLogout} />
            </div>

            {/* Main content area */}
            <div className="flex flex-col flex-1 ml-60 min-h-screen side-toggol">
              {/* Navbar */}
              <div className="w-full bg-white shadow z-30">
                <Header user={user} />
              </div>

              {/* Routed content - PUT THE ROUTES HERE */}
              <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <Routes>
                  <Route element={<ProtectedRoute user={user} />}>
                    <Route path="/" element={<Emp />} />
                    {/* Add other protected routes here */}
                    {/* <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} /> */}
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          /* Auth pages - shown when not logged in */
          <Routes>
            <Route
              path="/login"
              element={
                <div className="flex items-center justify-center h-screen">
                  <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
