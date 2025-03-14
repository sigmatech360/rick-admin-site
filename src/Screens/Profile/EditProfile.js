import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { country, currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import CustomModal from "../../Components/CustomModal";

import placeholderimage from '../../Assets/images/placeholderimage.png'
import './style.css'

const EditProfile = () => {

    const apiUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate()

    const [userData, setUserData] = useState({});
    const [userNewData, setUserNewData] = useState({})
    const [optionData, setOptionData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [Message, setMessage] = useState("")


    const [formData, setFormData] = useState({})
    const handleClickPopup = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
        navigate('/profile')
    }


    useEffect(() => {

        document.title = 'Hisco | Edit Profile';
        setOptionData(country);
        setUserData(currentUser);
    },);


    const PrfileDetail = () => {
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
                console.log(data?.data);
                document.querySelector(".loaderBox").classList.add("d-none");
                setFormData(data?.data);
            })
            .catch((error) => {
                document.querySelector(".loaderBox").classList.add("d-none");
                console.log(error);
            });
    };





    useEffect(() => {
        PrfileDetail()
    }, [])
    const filehandleChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const previewURL = URL.createObjectURL(file); // Generate a preview URL

            setFormData((prevData) => ({
                ...prevData,
                image: file,          // Store the actual file for backend upload
                imageFile: previewURL // Store the preview URL for immediate display
            }));
        }
    };



    useEffect(() => {

        return () => {
            if (formData?.imageFile?.startsWith("blob:")) {
                URL.revokeObjectURL(formData.imageFile);
            }
        };
    }, [formData?.imageFile]);

    const LogoutData = localStorage.getItem("login");





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

        fetch(`${apiUrl}/api/admin/profile`, {
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
                }

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically update based on the name attribute
        }));
    };


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Profile
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {userData ?
                            <div className="col-12">
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                            <div className="profileImage">
                                                {/* <img src={userData.image} alt="User" /> */}
                                                {(formData?.imageFile || formData?.image) && (
                                                    <img
                                                        src={
                                                            formData?.imageFile?.startsWith("blob:")
                                                                ? formData.imageFile
                                                                : `${apiUrl}/${formData.image}`
                                                        }
                                                        className="img-fluid mt-2"
                                                        alt="Product"
                                                    />
                                                )}      <input type="file" accept="img/*" className="d-none" id="profileImage" onChange={filehandleChange} />
                                                <label htmlFor="profileImage" className="imageUploadButton"><FontAwesomeIcon icon={faCamera} /></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <CustomInput label="Name" value={formData?.name} labelClass="mainLabel" required type="text" placeholder="Enter Name" inputClass="mainInput" onChange={handleChange} name="name" />
                                                </div>
                                            </div>
                                            {/* <div className="row">
                                                <div className="col-12 mb-3">
                                                    <h4 className="secondaryLabel">Email Address</h4>
                                                    <p className="secondaryText">{userData.email}</p>
                                                </div>
                                            </div> */}

                                            <div className="row">


                                                <div className="col-md-12 mb-3">
                                                    <CustomInput label="Email Address" value={formData?.email} labelClass="mainLabel" required type="email" placeholder="Enter email Address" inputClass="mainInput" onChange={handleChange} name="email" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <CustomButton
                                                variant="primaryButton"
                                                text="Submit"
                                                type="submit"
                                                className="me-3 mb-2"
                                            />
                                            {/* <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Save" onClick={handleClickPopup} /> */}
                                            <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Cancel" onClick={() => { navigate('/profile') }} />
                                        </div>

                                    </div>
                                </form>
                            </div> : ''}

                    </div>
                </div>
                <CustomModal show={showModal} close={handleClose} success heading={Message} />
            </DashboardLayout>
        </>
    );
};

export default EditProfile;
