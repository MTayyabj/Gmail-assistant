import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
 
//This creates a global container
//Any component can access it using useContext(AppContent)
export const AppContent = createContext();

//This wraps your app (usually in main.jsx or App.jsx)
export const AppContextProvider = (props) => {

//Ensures cookies (JWT/session) are sent with every request
axios.defaults.withCredentials = true;

  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = "http://localhost:5000/";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  //Checking Authentication
  const getAuthState= async () => {
    try{
      //Sends request to backend to check:
      //👉 "Is user logged in?"
      const {data} = await axios.post(backendUrl +'api/auth/is-auth', {withCredentials:true})
      
      if (data.success) {
        setIsLoggedin(true); //setusesate true
        await getUserData(); //[FUNCTION]//Immediately fetches user data
      }
    
    }
    catch(error){
      toast.error(error.message)
    } finally {
      setAuthLoading(false);
    }
  }


 //Fetching User Data
  const getUserData = async () => {
    try {
      //MAKING API CALL
      const { data } = await axios.get(backendUrl + 'api/user/data', {withCredentials:true});
      
      //SETTING USER DATA usestate variable
      if (data.success) {
        setUserData(data.userData); //Stores user info globally
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect (Auto Run on Load)
  //  Automatically:
  // Checks login status
  // Fetches user data if logged in
  useEffect(()=> {getAuthState();}, []);
  
  //This is what gets shared globally.
  const value = {
    backendUrl,
    isLoggedin, setIsLoggedin,
    userData, setUserData,
    authLoading,
    getUserData,
  };

  return (
    //Wraps all components
    //Makes data available everywhere
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
