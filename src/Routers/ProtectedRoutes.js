import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { allSidebarNavlinks } from "../Components/Layout/Sidebar/MenuLinks";
import { useProfileData } from "../context/UserProfileContext";
export const ProtectedRoutes = (props) => {
  const { permissions } = useProfileData();
  const { Components } = props;
  const navigate = useNavigate();
  const location = useLocation();
  let role = localStorage.getItem("role");
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      navigate("/login");
    }
  });
  useEffect(() => {
    if (role != 1 && permissions.length > 0) {
      // toast("No authorized");

      const filteredNavlinks = allSidebarNavlinks.filter((item) =>
        permissions?.includes(String(item.id))
      );
      let allowedRoutes = ['/profile',];
      filteredNavlinks.forEach((link) => {
        allowedRoutes.push(link.link);
      });
      const isAllowed = allowedRoutes.some((allowedPath) =>
        location.pathname.includes(allowedPath)
      );
      if(!isAllowed){
        toast.warning('Access denied!')
        navigate(allowedRoutes[1])
      }
      

      // return <Navigate to="/test" />;

      // navigate(filteredNavlinks[0].link)

      // return <h1>No uthorized</h1>;
    }
  }, [permissions]);
  return (
    <>
      <Components />
    </>
  );
};
