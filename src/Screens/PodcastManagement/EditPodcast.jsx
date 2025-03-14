import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';

import * as React from 'react';
import RichTextEditor from "react-rte";


import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const EditPodcast = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("")
    const [categories, setCategories] = useState({});
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        short_description: "", // Initial form data
        long_description: "", // Initial form data
    });


    console.log("formData?.short_description ", formData?.short_description)



    const [editorValue, setEditorValue] = useState(
        RichTextEditor.createEmptyValue()
    );


    const [editorValuelong, setEditorValuelong] = useState(

        RichTextEditor.createEmptyValue()
    );


    console.log("editorValue", editorValue)
    console.log("editorValuelong", editorValuelong)


    const handleEditorChange = (value) => {
        setEditorValue(value);
        setFormData({
            ...formData,
            short_description: value.toString("html"),
        });
    };


    const handleEditorChangelong = (value) => {
        setEditorValuelong(value);
        setFormData({
            ...formData,
            long_description: value.toString("html"),
        });
    };



    const fetchCategoryData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${apiUrl}/api/admin/podcast/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setFormData(data.data);
                // setEditorValue(RichTextEditor.createValueFromString(formData?.short_description, "html"));

                if (data.data.short_description) {
                    setEditorValue(
                        RichTextEditor.createValueFromString(
                            data.data.short_description,
                            "html"
                        )
                    );
                }
                if (data.data.long_description) {
                    setEditorValuelong(
                        RichTextEditor.createValueFromString(
                            data.data.long_description,
                            "html"
                        )
                    );
                }


            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }
    useEffect(() => {
        fetchCategoryData()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const filehandleChange = (event) => {
        const file = event.target.files[0];
        // console.log(file.name)
        if (file) {
            const fileName = file;
            setFormData((prevData) => ({
                ...prevData,
                ad_image: fileName,
            }));
        }
        console.log(formData)
    };




    const LogoutData = localStorage.getItem('login');


    const apiUrl = process.env.REACT_APP_BASE_URL;
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
        fetch(`${apiUrl}/api/admin/podcast/update/${id}`, {
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


    const handlecheck = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: Number(value) // Update the specific field dynamically and ensure the value is numeric
        }));

    };
    const navigate = useNavigate()


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Update Podcast
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
                                                    value={formData?.title}
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
                                                    value={formData?.video_duration}
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
                                                    value={formData?.video_src}
                                                    onChange={handleChange}
                                                />
                                            </div>


                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Enter date'
                                                    required
                                                    id='ad_title'
                                                    type='date'
                                                    placeholder='Enter Book Title'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="date"
                                                    value={formData?.date}
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

