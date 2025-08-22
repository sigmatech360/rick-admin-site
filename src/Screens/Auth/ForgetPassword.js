import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    document.title = "Hisoc Dashboard | Password Recovery";
  }, []);
  const apiUrl = process.env.REACT_APP_BASE_URL;

  const handleClick = (e) => {
    e.preventDefault();
    const formDataMethod = new FormData();
    formDataMethod.append('email', formData.email);
    navigate("/forget-password2");
    fetch(`${apiUrl}/api/forgot-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${LogoutData}`,
      },
      body: formDataMethod, // Use the FormData object as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        if (data?.status) {
          toast.success(data?.message);
          navigate("/user-management");
        } else {
          // for( let message of data?.message ){
          //   console.log(message);

          // }
          for (const value of Object.values(data?.message)) {
            console.log("object values", value[0]);
            toast.error(value[0]);
          }
        }
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  return (
    <>
      <AuthLayout
        authTitle="Password Recovery"
        authPara="Enter your email address to receive a verification code."
        backOption={true}
      >
        <form>
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
          <div className="mt-4 text-center">
            <CustomButton
              type="button"
              variant="primaryButton"
              text="Continue"
              onClick={handleClick}
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default ForgetPassword;
