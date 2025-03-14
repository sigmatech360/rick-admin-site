import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";


import placeholderimage from "../../Assets/images/placeholderimage.png";
export const VoluinteerDetail = () => {
  const { id } = useParams();

  const apiUrl = process.env.REACT_APP_BASE_URL;


  const [data, setData] = useState({});


  console.log("VoluinteerDetaildata", data)

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  useEffect(() => {
    const LogoutData = localStorage.getItem("login");
    document.title = "Hisoc Admin | Book Detail";
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/api/admin/volunteer/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);

        setData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  }, [id]);
  console.log(id);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Volunteer Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-end">
                {/* <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <button onClick={() => {
                    data?.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.status ? 'Inactive' : 'Active'}</button>
                  <span className={`statusBadge ${data?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.status == 1 ? 'Active' : 'Inactive'}</span>
                </div> */}
              </div>

              <div className="row">

                <div className="col-md-6 mb-4">
                  {data?.image && data?.image ? (
                    <div className="productImage">
                      <img
                        src={
                          data?.image
                            ? `${apiUrl}/${data?.image}`
                            : placeholderimage
                        }
                      />
                    </div>
                  ) : (
                    <h3>No Image Available</h3>
                  )}
                </div>
                {/* <div className="col-md-4 mb-4">

                                    <p>{user?.phone}</p>
                                </div> */}

                <div className="col-md-6">
                  <div className="productInfo">
                    <h5 className="secondaryText"> Name</h5>
                    <p className="text-capitalize mb-4">{data?.name ? data.name : "Not Available"}</p>

                    <h5 className="secondaryText"> Email</h5>
                    <p className="mb-4">{data?.email}</p>
                    <h5 className="secondaryText"> Phone number</h5>
                    <p className="mb-4">{data?.phone}</p>
                    <h5 className="secondaryText">   Available Days</h5>
                    {data?.available_days?.length
                      ? data.available_days.map((day, index) => <li key={index}>{day}</li>)
                      : <li>Not Available</li>}
                    <div className="mb-4"></div>
                    <h5 className="secondaryText">   Available Slots</h5>

                    {data?.available_slots?.length
                      ? data.available_slots.map((slot, index) => <li key={index}>{slot}</li>)
                      : <li>Not Available</li>}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          action={inActive}
          heading="Are you sure you want to mark this user as inactive?"
        />
        <CustomModal
          show={showModal2}
          close={() => {
            setShowModal2(false);
          }}
          success
          heading="Marked as Inactive"
        />

        <CustomModal
          show={showModal3}
          close={() => {
            setShowModal3(false);
          }}
          action={Active}
          heading="Are you sure you want to mark this user as Active?"
        />
        <CustomModal
          show={showModal4}
          close={() => {
            setShowModal4(false);
          }}
          success
          heading="Marked as Active"
        />
      </DashboardLayout>
    </>
  );
};
