import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import RichTextEditor from "react-rte";
import CustomButton from "../../Components/CustomButton";
export const EditMember = () => {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const assetUrl = process.env.REACT_APP_BASE_ASSET_URL;

  const [showModal, setShowModal] = useState(false);
  const [formimage, setFormimage] = useState();
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [valuelong, setValuelong] = useState(RichTextEditor.createEmptyValue());
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "", // Initialize image as an empty string
    agenda: [],
  });
  const handleChange = (newValue) => {
    setValue(newValue);
    // if (onChange) {
    //   // Send the changes up to the parent component as an HTML string.
    //   onChange(newValue.toString("html"));
    // }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setFormData({
      ...formData,
      short_description: value.toString("html"), // Convert editor content to HTML
    });
  };

  const handleEditorChangelong = (value) => {
    setEditorValuelong(value);
    setFormData({
      ...formData,
      long_description: value.toString("html"), // Convert editor content to HTML
    });
  };
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const [editorValuelong, setEditorValuelong] = useState(
    RichTextEditor.createEmptyValue()
  );

  const GenreData = () => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/api/admin/member/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setFormData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  useEffect(() => {
    GenreData();
  }, []);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const filehandleChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file); // Generate a preview URL

      setFormData((prevData) => ({
        ...prevData,
        image: file, // Store the actual file for backend upload
        imageFile: previewURL, // Store the preview URL for immediate display
      }));
    }
  };

  const LogoutData = localStorage.getItem("login");
  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting form data:', formData);
    

    // You might want to send raw JSON, not FormData
    const formDataMethod = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        if (key == "email") {
          if (formData[key] != "") {
            formDataMethod.append(key, formData[key]);
          }
        } else {
          formDataMethod.append(key, formData[key]);
        }
      }
    }

    document.querySelector(".loaderBox").classList.remove("d-none");

    // Make the fetch request
    fetch(`${apiUrl}/api/admin/member/update/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
      body: formDataMethod, // Use the raw data as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);
        setMessage(data);
        if (data?.status == true) {
          setShowModal(true);
        }
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  const handlecheck = (event) => {
    const { name, value } = event.target;
    console.log(`Name: ${name}, Value: ${value}`);
    

    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field dynamically and ensure the value is numeric
    }));
  };
  useEffect(() => {
    // Cleanup the blob URL to avoid memory leaks
    return () => {
      if (formData?.imageFile?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imageFile);
      }
    };
  }, [formData?.imageFile]);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Member
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
                          label=" Member Name"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="name"
                          value={formData?.name}
                          onChange={handleChanges}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Phone Number"
                          id="title"
                          type="text"
                          placeholder="Enter number"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="phone"
                          value={formData?.phone}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="   Email"
                          id="title"
                          type="text"
                          placeholder="Enter email"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="email"
                          value={formData?.email}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">Member type</label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="member_type"
                              value="1" // Yes = 1
                              checked={formData?.member_type == "1"}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Team member
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="member_type"
                              value="2" // No = 0
                              checked={formData?.member_type == "2"}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Board Mmber
                          </label>
                        </div>
                      </div>
                      <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">Show in Mobile</label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="show_in_mobile"
                              value="1" // Yes = 1
                              checked={formData?.show_in_mobile == 1}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="show_in_mobile"
                              value="0" // No = 0
                              checked={formData?.show_in_mobile == 0}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">Show in Web</label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="show_in_web"
                              value="1" // Yes = 1
                              checked={formData?.show_in_web == 1}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="show_in_web"
                              value="0" // No = 0
                              checked={formData?.show_in_web == 0}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            No
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Member Designation"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter designation"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="designation"
                          value={formData?.designation}
                          onChange={handleChanges}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Member Image"
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          onChange={filehandleChange}
                        />

                        {(formData?.imageFile || formData?.image) && (
                          <img
                            src={
                              formData?.imageFile?.startsWith("blob:")
                                ? formData.imageFile
                                : `${assetUrl}/${formData.image}`
                            }
                            className="img-fluid mt-2"
                            alt="Product"
                          />
                        )}
                      </div>

                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
            navigate(-1);
          }}
          success
          heading={message?.message}
        />
      </DashboardLayout>
    </>
  );
};
