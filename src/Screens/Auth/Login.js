import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/adminlogo.svg";
import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import { useProfileData } from "../../context/UserProfileContext";
import { allSidebarNavlinks } from "../../Components/Layout/Sidebar/MenuLinks";

const AdminLogin = () => {
  const { updateUserProfile } = useProfileData();
  const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/login`;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Project Camp | Login";
    let login = localStorage.getItem("login");
    if (login) {
      let role = localStorage.getItem("role");
      if (role == 1) {
        navigate("/dashboard");
      } else {
        let permissions = localStorage.getItem("permissions");
        const filteredNavlinks = allSidebarNavlinks.filter((item) =>
          permissions?.includes(String(item.id))
        );
        navigate(filteredNavlinks[0]?.link);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    formDataMethod.append("email", formData.email);
    formDataMethod.append("password", formData.password);
    console.log(formData);

    document.querySelector(".loaderBox").classList.remove("d-none");

    // const apiUrl = 'https://custom.mystagingserver.site/Tim-WDLLC/public/api/user-login';

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataMethod,
      });

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("login", responseData.data.token);
        localStorage.setItem("role", responseData.data?.user?.user_role);
        console.log("Login Response:", responseData);
        document.querySelector(".loaderBox").classList.add("d-none");
        if (responseData?.data?.user?.user_role == 1) {
          navigate("/dashboard");
        } else {
          let permissionsData = responseData.data?.user?.permission;
          const filteredNavlinks = allSidebarNavlinks.filter((item) =>
            permissionsData?.includes(String(item.id))
          );
          localStorage.setItem("permissions",permissionsData)

          navigate(filteredNavlinks[0].link);
          updateUserProfile();
        }
        toast.success(responseData.message);
      } else {
        document.querySelector(".loaderBox").classList.add("d-none");
        toast.error("Invalid Credentials");

        console.error("Login failed");
      }
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AuthLayout authTitle="Login" authPara="Login into your Account">
        <form onSubmit={handleSubmit}>
          <CustomInput
            label="Email Address"
            required
            id="userEmail"
            type="email"
            placeholder="Enter Your Email Address"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <CustomInput
            label="Password"
            required
            id="pass"
            type="password"
            placeholder="Enter Password"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
          />
          {/* <div className="d-flex align-items-baseline justify-content-between mt-1">
            <div className="checkBox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="me-1"
              />
              <label htmlFor="rememberMe" className="fw-semibold">
                Remember Me
              </label>
            </div>
            <Link
              to={"/forget-password"}
              className="text-dark text-decoration-underline"
            >
              Forget Password?
            </Link>
          </div> */}
          <div className="mt-4 text-center">
            <CustomButton variant="primaryButton" text="Login" type="submit" />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default AdminLogin;
