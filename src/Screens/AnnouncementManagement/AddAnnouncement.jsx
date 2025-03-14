import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import React, { Component, PropTypes } from "react";
import RichTextEditor from "react-rte";
import { useNavigate } from "react-router";

export const AddAnnouncement = () => {
  const [categories, setCategories] = useState({});
  const [unit, setUnit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    is_hidden: 0,
  });
  const apiUrl = process.env.REACT_APP_BASE_URL;

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };



  const [message, setMessage] = useState("")

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
    // Cleanup the blob URL to avoid memory leaks
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


    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request
    fetch(`${apiUrl}/api/admin/announcement`, {
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
        console.log(data);
        if (data?.status == true) {
          setMessage(data?.message)
          setShowModal(true);
        }


      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [valuelong, setValuelong] = useState(RichTextEditor.createEmptyValue());

  const handleChange = (newValue) => {
    setValue(newValue);
    // if (onChange) {
    //   // Send the changes up to the parent component as an HTML string.
    //   onChange(newValue.toString("html"));
    // }
  };
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );



  const [editorValuelong, setEditorValuelong] = useState(
    RichTextEditor.createEmptyValue()
  );

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

  const handleTextareaChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      long_description: value,
    });
    // Optionally update RichTextEditor state (if bidirectional sync is needed)
    setEditorValue(RichTextEditor.createValueFromString(value, "html"));
  };


  const navigate = useNavigate()
  const handlecheck = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value) // Update the specific field dynamically and ensure the value is numeric
    }));

  };
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add Announcement
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
                          label=" Title"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter  Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData.title}
                          onChange={handleChanges}
                        />
                      </div>

                      {/* <div className="col-md-6 mb-4">
                                                    <CustomInput
                                                        label='Name'
                                                        required
                                                        id='name'
                                                        type='text'
                                                        placeholder='Enter Name'
                                                        labelClass='mainLabel'
                                                        inputClass='mainInput'
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div> */}

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Image"
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
                                : `${apiUrl}/${formData.image}`
                            }
                            className="img-fluid mt-2"
                            alt="Product"
                          />
                        )}
                      </div>


                      <div className="checkBox col-md-6 mb-4">
                        <label className="fw-semibold">Show in Web</label>
                        <div>
                          <label className="me-2">
                            <input
                              type="radio"
                              name="show_in_web"
                              value="1" // Yes = 1
                              checked={formData?.show_in_web === 1}
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
                              checked={formData?.show_in_web === 0}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            No
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
                              checked={formData?.show_in_mobile === 1}
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
                              checked={formData?.show_in_mobile === 0}
                              onChange={handlecheck}
                              className="me-1"
                            />
                            No
                          </label>
                        </div>
                      </div>




                      <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="short-description">
                              Short Description
                            </label>
                            {/* Rich Text Editor */}
                            <RichTextEditor
                              value={editorValue}
                              className="form-control shadow border-0"
                              onChange={handleEditorChange}
                            />

                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="">Long Description</label>

                            <RichTextEditor
                              value={editorValuelong}
                              className="form-control shadow border-0"
                              onChange={handleEditorChangelong}
                            />
                            {/* <textarea
                              name="long_description"
                              className="form-control shadow border-0"
                              id=""
                              cols="30"
                              rows="10"
                              value={formData.long_description}
                              onChange={handleChanges}
                            ></textarea> */}
                          </div>
                        </div>
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
            navigate(-1)
          }}
          success
          heading={message}
        />
      </DashboardLayout>
    </>
  );
};
