
import React, { createContext, useContext, useState } from "react";

const UserProfileContext = createContext();

export function useProfileData() {
  return useContext(UserProfileContext);
}

export const UserProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  
  
  // Function to update notifications, possibly after refetching
  const updateUserProfile = async () => {
    

    const apiUrl = process.env.REACT_APP_BASE_URL;
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/api/admin/profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        setUserData(data?.data);
        if(data?.data?.user_role != 1){
          
          setPermissions(data?.data?.permission)
        }
        
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  return (
    <UserProfileContext.Provider
      value={{ userData, updateUserProfile, permissions }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
