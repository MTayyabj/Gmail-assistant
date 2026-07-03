// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Navbar from './components/Navbar'
// import STT from './components/STT'
// import Chat from "./pages/Chat";
// import Login from './components/Login/Login'
// import ResetPassword from './components/ResetPassword/ResetPassword'
// import EmailVerify from './components/EmailVerify/EmailVerify'
// import Home from './components/Home'
// import { AppContent } from "../Context/AppContext";


// function App() {

//   return (
//     <>
//           {/* <STT />
          
//     <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/about" element={<About/>} />
//         <Route path="/project" element={<Project/>} />
//         <Route path="/contact" element={<Contact/>} />
//         <Route path="/project" element={<Project />} />
//         <Route path="/project/:id" element={<ProjectInd />} />
//     </Routes>  */}
//     {/* <Home/> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/email-verify" element={<EmailVerify />} />
//       </Routes>
//     </>
//   )
// }

// export default App

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";
import Chat from "./pages/Chat";
import Login from './components/Login/Login'
import ResetPassword from './components/ResetPassword/ResetPassword'
import EmailVerify from './components/EmailVerify/EmailVerify'
import Home from './pages/Home'
import { AppContent } from "./Context/AppContext";
import ProfilePage from "./pages/Profile";
import PricingPage from "./pages/Pricing";
import ContactsPage from "./pages/Contact";

function RouteLoader() {
  return (
    <div className="min-h-screen bg-background-main flex items-center justify-center">
      <div className="flex items-center gap-3 text-content-main/70">
        <Loader2 className="h-5 w-5 animate-spin text-brand" />
        <span className="text-sm font-medium">Loading your workspace...</span>
      </div>
    </div>
  );
}

function ProtectedRoute({ isLoggedin, authLoading, children }) {
  const location = useLocation();

  if (authLoading) {
    return <RouteLoader />;
  }

  if (!isLoggedin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  const { isLoggedin, authLoading } = useContext(AppContent);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={authLoading ? <RouteLoader /> : isLoggedin ? <Navigate to="/chat" replace /> : <Login />}
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isLoggedin={isLoggedin} authLoading={authLoading}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedin={isLoggedin} authLoading={authLoading}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute isLoggedin={isLoggedin} authLoading={authLoading}>
              <ContactsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        toastClassName="!rounded-2xl !shadow-xl"
      />
    </>
  )
}

export default App;
