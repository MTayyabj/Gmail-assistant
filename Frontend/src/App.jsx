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

import { Routes, Route, Navigate } from "react-router-dom";
import { useContext , useState } from "react";
import { Navbar } from './components/Navbar'
import STT from './components/STT'
import Chat from "./pages/Chat";
import Login from './components/Login/Login'
import ResetPassword from './components/ResetPassword/ResetPassword'
import EmailVerify from './components/EmailVerify/EmailVerify'
import Home from './pages/Home'
import { AppContent } from "./Context/AppContext";
import ProfilePage from "./pages/Profile";
import PricingPage from "./pages/Pricing";
import ContactsPage from "./pages/Contact";

function App() {
  const [loading, setLoading] = useState(true);
  const { isLoggedin } = useContext(AppContent);
  return (
    <>
      <Routes>

        {/* Protected Route */}
        {/* <Route path="/chat" element={isLoggedin ? <Chat /> : <Navigate to="/login" />}/> */}
        {/* <Route path="/profile" element= {isLoggedin ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/contacts" element= {isLoggedin ? <ContactsPage /> : <Navigate to="/login" />} /> */}
      
        {/* Accesiible Route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
      
       {/* Temporary routes */}
        <Route path="/chat" element={<Chat />}/> 
        <Route path="/profile" element= { <ProfilePage />}/>
        <Route path="/contacts" element= { <ContactsPage /> } />
      
      </Routes>
    </>
  )
}

export default App;
