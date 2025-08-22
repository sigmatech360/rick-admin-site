import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { permissionList } from "../../utils/userPermissions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faI, faQuestion } from "@fortawesome/free-solid-svg-icons";

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      <p className="text-center m-0">
        Select the features this user should have access to. These permissions
        determine what actions and areas of the system the user can manage or
        view.
      </p>
    </Popover.Body>
  </Popover>
);

export const AddUser = () => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  // const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permission: [],
  });

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_BASE_URL;

  // const fectchBrandData = () => {
  //     const LogoutData = localStorage.getItem('login');
  //     document.querySelector('.loaderBox').classList.remove("d-none");

  //     fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/role-listing',
  //         {
  //             method: 'GET',
  //             headers: {
  //                 'Accept': 'application/json',
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${LogoutData}`
  //             },
  //         }
  //     )

  //         .then(response =>
  //             response.json()
  //         )
  //         .then((data) => {
  //             document.querySelector('.loaderBox').classList.add("d-none");
  //             console.log(data)
  //             setrole(data.roles);
  //         })
  //         .catch((error) => {
  //             document.querySelector('.loaderBox').classList.add("d-none");
  //             console.log(error)
  //         })
  // }

  // const fetchUnitData = () => {
  //     const LogoutData = localStorage.getItem('login');
  //     document.querySelector('.loaderBox').classList.remove("d-none");
  //     fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/unit-listing',
  //         {
  //             method: 'GET',
  //             headers: {
  //                 'Accept': 'application/json',
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${LogoutData}`
  //             },
  //         }
  //     )

  //         .then(response =>
  //             response.json()
  //         )
  //         .then((data) => {
  //             console.log(data)
  //             document.querySelector('.loaderBox').classList.add("d-none");
  //             setUnit(data.units);
  //         })
  //         .catch((error) => {
  //             document.querySelector('.loaderBox').classList.add("d-none");
  //             console.log(error)
  //         })
  // }

  const handleCheckboxChange = (id) => {
    setSelectedPermissions((prev) => {
      let updatedValue = [];
      updatedValue = prev.includes(id)
        ? prev.filter((permId) => permId !== id)
        : [...prev, id];

      if (updatedValue.length > 0) {
        setPermissionError(false);
      } else {
        setPermissionError(true);
      }
      return updatedValue;
    });
  };

  const LogoutData = localStorage.getItem("login");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting form");
    if (selectedPermissions.length == 0) {
      setPermissionError(true);
      return;
    }

    // Create a new FormData object
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }
    selectedPermissions.forEach((id, index) => {
      formDataMethod.append(`permission[${index}]`, Number(id));
    });

    console.log(formData);
    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request
    fetch(`${apiUrl}/api/user/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
      body: formDataMethod, // Use the FormData object as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        // setMessage(data?.message)
        if (data?.status) {
          setShowModal(true);
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

  // useEffect(() => {
  //     fectchBrandData()
  //     fetchUnitData()
  // }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filehandleChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file); // Generate a preview URL

      setFormData((prevData) => ({
        ...prevData,
        image: file, // Temporarily store the preview URL for immediate display
        imageFile: previewURL, // Optionally store the file for backend upload
      }));
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add User
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="User Name"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Email"
                          required
                          id="email"
                          type="email"
                          placeholder="Enter Email"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Phone"
                          required
                          id="phone"
                          type="phone"
                          placeholder="Phone"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Password"
                          required
                          id="password"
                          type="password"
                          placeholder="Enter password"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload User Image"
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          onChange={filehandleChange}
                        />

                        {formData?.imageFile && (
                          <img
                            src={
                              formData.imageFile.startsWith("blob:") // Check if it's a new upload
                                ? formData.imageFile // Preview new image
                                : `${apiUrl}/${formData.imageFile}` // Show previously uploaded image
                            }
                            className="img-fluid mt-2"
                            alt="Product"
                          />
                        )}
                      </div>
                      <div className="mb-4">
                        <div>
                          <div className="on-off-btn d-flex align-items-center gap-2">
                            <h5 className="fw-bold">
                              Permissions<span className="text-danger">*</span>
                            </h5>
                            <OverlayTrigger
                              trigger="hover"
                              placement="top"
                              overlay={popover}
                            >
                              <button
                                type="button"
                                className="btn btn-light btn-question"
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  cursor: "pointer",
                                }}
                              >
                                <FontAwesomeIcon icon={faQuestion} />
                              </button>
                            </OverlayTrigger>
                          </div>
                          {permissionError && (
                            <p className="text-danger">
                              Please select atleast one permission
                            </p>
                          )}
                        </div>
                        <div className="row row-gap-2">
                          {permissionList.map((permission) => (
                            <label className="col-md-4" key={permission.id}>
                              <input
                                type="checkbox"
                                className="me-2"
                                value={permission.id}
                                checked={selectedPermissions.includes(
                                  permission.id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(permission.id)
                                }
                              />
                              {permission.title}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="user_role"
                                                    label="User Role"
                                                    required
                                                    value={formData.user_role}
                                                    option={initalRole}
                                                    onChange={handleChange}
                                                />

                                            </div> */}
                      {/* <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="unit_id"
                                                    label="Unit"
                                                    required
                                                    value={formData.unit_id}
                                                    option={initialunit}
                                                    onChange={handleChange}
                                                />

                                            </div> */}
                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="Add User"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
            navigate(-1);
          }}
          success
          heading="User Created Successfully!"
        /> */}
      </DashboardLayout>
    </>
  );
};
