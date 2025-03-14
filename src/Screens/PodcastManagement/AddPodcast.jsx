import CustomButton from "../../Components/CustomButton";
import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';

import { useNavigate } from 'react-router-dom'

import RichTextEditor from "react-rte";;

export const AddPodcast = () => {

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        is_hidden: 0,

    });



 

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically update based on the name attribute
        }));
    };


    const [message, setMessage] = useState("")




    const apiUrl = process.env.REACT_APP_BASE_URL;

    const LogoutData = localStorage.getItem('login');


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

        fetch(`${apiUrl}/api/admin/podcast`, {
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











    const [editorValue, setEditorValue] = useState(
        RichTextEditor.createEmptyValue()
    );
    const handleEditorChange = (value) => {
        setEditorValue(value);
        setFormData({
            ...formData,
            short_description: value.toString("html"), // Convert editor content to HTML
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



    const [editorValuelong, setEditorValuelong] = useState(
        RichTextEditor.createEmptyValue()
    );



    const handleEditorChangelong = (value) => {
        setEditorValuelong(value);
        setFormData({
            ...formData,
            long_description: value.toString("html"), // Convert editor content to HTML
        });
    };






    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add New Podcast
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
                                                    label='Enter Title'
                                                    required
                                                    id='ad_title'
                                                    type='text'
                                                    placeholder='Enter Podcast Title'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Enter video duration'
                                                    required
                                                    id='ad_title'
                                                    type='text'
                                                    placeholder='Enter video duration  '
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="video_duration"
                                                    value={formData.video_duration}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Enter video link  '
                                                    required
                                                    id='ad_title'
                                                    type='text'
                                                    placeholder='Enter video link  '
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="video_src"
                                                    value={formData.video_src}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Enter date'
                                                    required
                                                    id='date'
                                                    type='date'
                                                    placeholder='Select a date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="date" // Updated to match the key in formData
                                                    value={formData.date} // Ensures it binds to the correct key
                                                    onChange={handleChange}
                                                />
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
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false); navigate(-1) }} success heading={message} />

            </DashboardLayout>
        </>
    );
};

