import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";

import './style.css'

const ChangePassword = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({})
    const handleClickPopup = () => {
        setShowModal(true);
    }


    const handleChanges = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData);
    };

    const apiUrl = process.env.REACT_APP_BASE_URL;

    const LogoutData = localStorage.getItem("login");
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request

        fetch(`${apiUrl}/api/admin/profile/change-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data);
                if (data?.status == true) {
                    setShowModal(true)
                    setMessage(data?.message)
                    setStatus(data?.status)
                } else {
                    setShowModal(true)
                    setMessage(data?.message)
                }

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };


    console.log("status", status)
    useEffect(() => {

        document.title = 'Project Camp | Change Password';

        setUserData(currentUser);
    }, []);

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                <span className="px-2">Change Password</span>
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-4 col-lg-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="Current Password" labelClass="mainLabel" required type="password" placeholder="Enter Current Password" name="current_password" inputClass="mainInput" onChange={handleChanges}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="New Password" labelClass="mainLabel" required type="password" name="password" placeholder="Enter New Password" inputClass="mainInput" onChange={handleChanges} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="Confirm New Password" labelClass="mainLabel" required type="password" placeholder="Confirm New Password" inputClass="mainInput" name="password_confirmation" onChange={handleChanges} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">

                                    </div>
                                    <div className="col-12r">
                                        {/* <CustomButton type="button" className="me-3 mb-2 bg-transparent border-0" text="Cancel" /> */}
                                        <CustomButton
                                            variant="primaryButton"
                                            text="Update"
                                            type="submit"
                                            className="me-3 mb-2"
                                        // {status == true  }

                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal show={showModal} close={() => {
                    setShowModal(false); if (status == true) {
                        // alert("dasdfasdas")
                        navigate('/profile');

                    }
                }} success heading={message} />
            </DashboardLayout>
        </>
    );
};

export default ChangePassword;
