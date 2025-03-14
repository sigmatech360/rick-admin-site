import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";


import { OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";

import placeholderimage from '../../Assets/images/placeholderimage.png'
import RichTextEditor from "react-rte";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router";


const popover = (
  <Popover id="popover-basic">
    {/* <Popover.Header as="h3">Manage Availability & Notifications</Popover.Header> */}
    <Popover.Body>
      Enable this option to select available days and time slots. Activating this ensures that notifications are sent only to volunteers who match the selected availability.
    </Popover.Body>
  </Popover>
);


export const CreateNotification = () => {

  const [showInputs, setShowInputs] = useState(false)


  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({

  })

  const [selectedItems, setSelectedItems] = useState({});
  const [agenda, setAgenda] = useState([{
    // id: Date.now(),
    time: "",
    title: "",
    items: [],
  }]);

  const handleAddVariation = () => {
    const newVariation = {
      id: Date.now(),
      time: "",
      title: "",
      items: [],
    };
    setAgenda((prevAgenda) => {
      const updatedAgenda = [...prevAgenda, newVariation];
      setFormData((prevData) => ({
        ...prevData,
        agenda: updatedAgenda,
      }));
      return updatedAgenda;
    });
  };

  const handleRemoveVariation = (index) => {
    setAgenda((prevAgenda) => {
      const updatedAgenda = prevAgenda.filter((_, i) => i !== index);
      setFormData((prevData) => ({
        ...prevData,
        agenda: updatedAgenda,
      }));
      return updatedAgenda;
    });
  };

  const handleVariationChange = (field, value, index) => {
    setAgenda((prevAgenda) => {
      const updatedAgenda = [...prevAgenda];
      updatedAgenda[index] = {
        ...updatedAgenda[index],
        [field]: value,
      };
      setFormData((prevData) => ({
        ...prevData,
        agenda: updatedAgenda,
      }));
      return updatedAgenda;
    });
  };


  const handleSelectedItem = (variationId, itemId) => {
    setSelectedItems((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      const selected = updatedSelected[variationId] || [];
      if (selected.includes(itemId)) {
        updatedSelected[variationId] = selected.filter((id) => id !== itemId);
      } else {
        updatedSelected[variationId] = [...selected, itemId];
      }
      return updatedSelected;
    });
  };



  const apiUrl = process.env.REACT_APP_BASE_URL;



  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setFormData({
      ...formData,
      description: value.toString("html"), // Convert editor content to HTML
    });
  };
  const handleChange = (event) => {
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


  const [Message, setMessage] = useState("")
  const LogoutData = localStorage.getItem("login");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();

    for (const key in formData) {
      if (key === 'agenda') {

        formDataMethod.append(key, JSON.stringify(formData[key]));
      } else {
        formDataMethod.append(key, formData[key]);
      }
    }

    console.log(formData);
    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request
    fetch(`${apiUrl}/api/admin/send-notification`, {
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
          setShowModal(true);
          setMessage(data?.message)
        }

      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };




  const handlecheck = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value) // Update the specific field dynamically and ensure the value is numeric
    }));

  };
  const navigate = useNavigate()









  // const options = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];


  // const availabilityData = [
  //   "9:00 AM to 11:00 AM",
  //   "11:00 AM to 1:00 PM",
  //   "1:00 PM to 3:00 PM",
  //   "3:00 PM to 5:00 PM"
  // ]

  const options = [
    { id: "monday", name: "Monday" },
    { id: "tuesday", name: "Tuesday" },
    { id: "wednesday", name: "Wednesday" },
    { id: "thursday", name: "Thursday" },
    { id: "friday", name: "Friday" },
    { id: "saturday", name: "Saturday" },
    { id: "sunday", name: "Sunday" },
  ];

  const availabilityData = [
    { id: "9:00 AM to 11:00 AM", name: "9:00 AM to 11:00 AM" },
    { id: "11:00 AM to 1:00 PM", name: "11:00 AM to 1:00 PM" },
    { id: "1:00 PM to 3:00 PM", name: "1:00 PM to 3:00 PM" },
    { id: "3:00 PM to 5:00 PM", name: "3:00 PM to 5:00 PM" },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Create  Notification
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
                          label=" Notification Title"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData?.title}
                          onChange={handleChange}
                        />
                      </div>


                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label=" Notification Descripction"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="body"
                          value={formData?.body}
                          onChange={handleChange}
                        />
                      </div>



                      {/* <div className="col-md-6 mb-4">

                        <SelectBox
                          selectClass="mainInput"
                          name="available_days"
                          label="Select Days"
                          value={formData.available_days}
                          required
                          option={options}
                          onChange={handleChange}
                        />
                      </div>



                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="available_slots"
                          label="Select slots"
                          value={formData.available_slots}
                          required
                          option={availabilityData}
                          onChange={handleChange}
                        />

                      </div>
                       */}


                      <div className="col-md-12 mb-4">
                        <div className="on-off-btn d-flex align-items-center gap-2">
                          {/* Toggle Button with Tooltip */}
                          <button
                            type="button"
                            className={`btn ${showInputs ? "btn-theme" : "btn-red"} btn-toggle`}
                            onClick={() => setShowInputs(!showInputs)}
                            style={{
                              justifyContent: showInputs ? "flex-end" : "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                background: "white",
                                borderRadius: "50%",
                                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                              }}
                            ></div>
                          </button>
                          <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
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

                          {/* <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                          </OverlayTrigger> */}
                        </div>
                      </div>

                      {
                        showInputs &&
                        <>
                          <div className="col-md-6 mb-4">
                            <SelectBox
                              selectClass="mainInput"
                              name="available_days"
                              label="Select Days"
                              value={formData.available_days}
                              // required
                              option={options}
                              onChange={handleChange}

                            />
                          </div>

                          <div className="col-md-6 mb-4">
                            <SelectBox
                              selectClass="mainInput"
                              name="available_slots"
                              label="Select slots"
                              value={formData.available_slots}
                              // required
                              option={availabilityData}
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      }



                      {/*                       
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Address"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter address"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="address"
                          value={formData?.address}
                          onChange={handleChange}
                        />
                      </div> */}

                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Date"
                          required
                          id="name"
                          type="date"
                          placeholder="Enter date"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="date"
                          value={formData?.date}
                          onChange={handleChange}
                        />
                      </div> */}

                      {/* 

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Start time"
                          required
                          id="name"
                          type="time"
                          placeholder="Enter start time"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="start_time"
                          value={formData?.start_time}
                          onChange={handleChange}
                        />
                      </div> */}

                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="End time"
                          required
                          id="name"
                          type="time"
                          placeholder="Enter End time"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="end_time"
                          value={formData?.end_time}
                          onChange={handleChange}
                        />
                      </div> */}

                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Image"
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          required
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
                      </div> */}









                      {/* 
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
                      </div> */}
                      {/* 
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
                      </div> */}

                      {/* <div className="variationData">
                        {agenda.map((variation, index) => (
                          <div key={variation.id} className="col-md-6">
                            <h6 className="font-weight-bold">Agenda Box {index + 1}</h6>
                            <div className="form-controls mb-4 d-flex align-items-center gap-3">
                              <div className="col-md- ">
                                <CustomInput
                                  onChange={(e) => handleVariationChange("time", e.target.value, index)}
                                  value={variation.time || ""}
                                  required
                                  id={`time-${variation.id}`}
                                  type="text"
                                  placeholder="Enter time range (e.g., 6:30 PM - 7:00 PM)"
                                  labelClass="mainLabel"
                                  inputClass="mainInput"
                                  name="time"
                                />
                              </div>
                              <div className="col-md- ">
                                <CustomInput
                                  onChange={(e) => handleVariationChange("title", e.target.value, index)}
                                  value={variation.title || ""}
                                  required
                                  id={`title-${variation.id}`}
                                  type="text"
                                  placeholder="Enter title"
                                  labelClass="mainLabel"
                                  inputClass="mainInput"
                                  name="title"
                                />
                              </div>
                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  onClick={handleAddVariation}
                                  type="button"
                                  className="btn primaryButton text-white addBtn"
                                >
                                  <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                                <button
                                  onClick={() => handleRemoveVariation(index)}
                                  type="button"
                                  className="btn primaryButton text-white trashBtn"
                                >
                                  <FontAwesomeIcon icon={faMinusCircle} />
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              {variation.items.map((item) => (
                                <div key={item.id} className="customDataItem col-md-4 mb-4" >
                                  <div className="checkList">
                                    <input
                                      type="checkbox"
                                      value={item.id}
                                      id={item.id}
                                      name="addons[]"
                                      onClick={() => handleSelectedItem(variation.id, item.id)}
                                      checked={selectedItems[variation.id]?.includes(item.id) || false}
                                    />
                                  </div>
                                  <label htmlFor={item.id}>
                                    <div className="productAdonItem">
                                      <div className="productImageIcon">
                                        <img
                                          src={item.image ? `${apiUrl}/${item.image}` : placeholderimage}
                                          alt="Product"
                                        />
                                      </div>
                                      <div className="addonDesc">
                                        <h5 className="text-capitalize">{item.title}</h5>
                                        <p>{`$ ${item.price}`}</p>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div> */}

                      {/* <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="short-description">
                              Short Description
                            </label> 
                            <RichTextEditor
                              value={editorValue}
                              className="form-control shadow border-0"
                              onChange={handleEditorChange}
                            />
                          </div>
                        </div>
                      </div> */}

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
            // navigate(-1)
          }}
          success
          heading={Message}
        />
      </DashboardLayout>
    </>
  );
};
