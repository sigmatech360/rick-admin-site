import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import placeholderimage from '../../Assets/images/placeholderimage.png'
import CustomButton from "../../Components/CustomButton";

import './style.css'


const Profile = () => {

    const apiUrl = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});

    useEffect(() => {
        document.title = 'Hisoc Admin Camp | My Profile';

        // setUserData(currentUser);
    }, []);


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
                setUserData(data?.data);
            })
            .catch((error) => {
                document.querySelector(".loaderBox").classList.add("d-none");
                console.log(error);
            });
    };


    useEffect(() => {
        PrfileDetail()
    }, [])

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />Profile
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {userData ?
                            <div className="col-12">
                                <div className="row mb-3">
                                    <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                        <div className="profileImage">
                                            <img src={
                                                userData?.image
                                                    ? `${apiUrl}/${userData.image}`
                                                    : placeholderimage
                                            } alt="User" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row mb-4">
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Full Name</h4>
                                                <p className="secondaryText">{userData.name}</p>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Full Name</h4>
                                                <p className="secondaryText">{userData.email}</p>
                                            </div>



                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Edit Profile" onClick={() => { navigate('/profile/edit-profile') }} />
                                        <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Change Password" onClick={() => { navigate('/profile/change-password') }} />
                                    </div>

                                </div>
                            </div> : ''}

                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Profile;
