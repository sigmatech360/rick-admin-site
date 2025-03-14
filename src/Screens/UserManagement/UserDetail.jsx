import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";

export const UserDetail = () => {

    const { id } = useParams();



    const [user, SetUser] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)


    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    useEffect(() => {
        const LogoutData = localStorage.getItem('login');
        document.title = 'Hisoc Admin | User Management Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/get-user/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                SetUser(data.users)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }, [id]);


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                User Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="row mb-3 justify-content-end">
                                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                                <span className={`statusBadge ${user?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{user?.status == 1 ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">User Name</p>
                                    <p>{user?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Email Address</p>
                                    <p>{user?.email}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Unit Name</p>
                                    <p>{user?.unit_id}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">User Role</p>
                                    <p>{user?.user_role == 3 ? 'User' : 'Sub Admin'}</p>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

