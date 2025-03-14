import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";



import placeholderimage from "../../Assets/images/placeholderimage.png";
export const ProgramDetail = () => {
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
    document.title = "Hisoc Admin | Program Detail";
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/api/admin/program/${id}`, {
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

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Program Details
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
                    <h5 className="secondaryText"> Title</h5>
                    <p className="text-capitalize mb-4">{data?.title ? data.title : "Not Available"}</p>
                    <h5 className="secondaryText"> Targeted amount</h5>
                    <p className="text-capitalize mb-4">{data?.targeted_amount ? data?.targeted_amount : "Not Available"}</p>

                     

                    <h5 className=""> Short Description</h5>
                    <p
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: data?.short_description || "No description available" }}
                    ></p>
                    <h5 className="secondaryText">Long Description</h5>
                    <p
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: data?.long_description || "No description available" }}
                    ></p>

                  


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
