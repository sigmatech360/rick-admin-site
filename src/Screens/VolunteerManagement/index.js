import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faTrash, faCheck, faTimes, faFilter, faEdit, faSlash, faUserSlash, faUser, faTasks, faUserTimes } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import Select from 'react-select'

import { SelectBox } from "../../Components/CustomSelect";
import placeholderimage from '../../Assets/images/placeholderimage.png'
import "./style.css";
import { formatDate } from "../../utils/dateUtils";

export const VolunteerManagement = () => {
  const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

  const [topstatusmodalstatus, setTopstatusmodalstatus] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [novel, setNovel] = useState();

  const [assignuser, setAssignuser] = useState()
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate('/create-notification')
  }

  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  
  
  const [inputValues, serInputvalue] = useState({})
  const [tableData, setTableData] = useState();
  const [currentItems, setCurrentItems] = useState();
  useEffect(()=>{
    
    const filterData = tableData?.filter(item => item?.name?.toLowerCase().includes(inputValue.toLowerCase()));
    
    setCurrentItems(filterData?.slice(0,8));
  },[inputValue])

  useEffect(()=>{
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(tableData?.slice(indexOfFirstItem,indexOfLastItem))
  },[currentPage])

  useEffect(()=>{
    setCurrentItems(tableData?.slice(0, 8))
  },[tableData])


  const apiUrl = process.env.REACT_APP_BASE_URL;
  const assetUrl = process.env.REACT_APP_BASE_ASSET_URL;
  const Volunteer = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");


    const url = `${apiUrl}/api/admin/volunteer`
    fetch(url, {
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
        document.querySelector('.loaderBox').classList.add("d-none");
        setData(data?.data);
        setTableData(data?.data)
        // setCurrentItems(data?.data?.slice(0, 8));
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })

  }

  useEffect(() => {
    document.title = 'Hisoc Admin | Book Management';
    Volunteer()

  }, []);

  useEffect(() => {

    Volunteer()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "image",
      title: "Thumbnail",
    },
    {
      key: "username",
      title: "Name",
    },
    {
      key: "Email",
      title: "Email",
    },
    {
      key: "status",
      title: "status",
    },
    {
      key: "created_at",
      title: "Created On",
    },
    {
      key: "action",
      title: "Action",
    },
  ];

  const Volusteeractiveinactive = (catId) => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/api/admin/volunteer/update-status/${catId}`, {
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
        Volunteer();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const [eventlist, setEventlist] = useState([])


  const projectlist = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${apiUrl}/api/admin/event`, {
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
        document.querySelector('.loaderBox').classList.add("d-none");
        setEventlist(data?.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })

  }

  const LogoutData = localStorage.getItem('login');

  const handleAssign = (id, status) => {
    console.log("status", status)
    const formDataMethod = new FormData();
    formDataMethod.append('event_id', inputValues?.event_id);
    formDataMethod.append('user_id', id);
    document.querySelector('.loaderBox').classList.remove("d-none");
    const assignusers = status == 'Assigned' ? `${apiUrl}/api/admin/event/un-assign-user` : `${apiUrl}/api/admin/event/assign-user`
    fetch(assignusers, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${LogoutData}`
      },
      body: formDataMethod
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data);
        setShowModal5(true)
        setAssignuser(data?.message)
        if (data?.status == true) {
          Volunteer()
        }
      })

      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  };

  const [topstatusmodal, setTopstatusmodal] = useState("")

  const handleTop = async (id,isTop) => {
    if(!isTop){
      try {
        // console.log("status", status); // Ensure `status` is defined
  
        const formDataMethod = new FormData();
        formDataMethod.append('user_id', id);
  
        document.querySelector('.loaderBox').classList.remove("d-none");
  
        const assignusers = `${apiUrl}/api/admin/top-volunteer`;
  
        const response = await fetch(assignusers, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${LogoutData}`
          },
          body: formDataMethod
        });
  
        const data = await response.json();
        document.querySelector('.loaderBox').classList.add("d-none");
  
        console.log(data);
        // setShowModal5(true);
  
        // Handle success response
        if (data?.status) {
          setTopstatusmodal(data?.message)
          setTopstatusmodalstatus(true)
          Volunteer()
        }
  
      } catch (error) {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.error("Error:", error);
      }

    }
  };


  useEffect(() => {
    projectlist()
  }, [])




  const [multiopction, setMultiopction] = useState([]);
  const option = [{title: 'Interested Volunteers'},{title : 'Active Volunteers'},{title:'Inactive Volunteers'}];
  const options = [
    { id: "all", title: "All Volunteer" },
    { id: "1", title: "Active Volunteers" },
    { id: "0", title: "Inactive Volunteers" },
  ];


  // useEffect(() => {
  //   setMultiopction(options1);
  // }, []);

  const handleChangeopt = (selectedOptions) => {
    setMultiopction(selectedOptions || []);
  };
  const handleChangeVolunteerType = (e) =>{
    const type = e.target.value;
    console.log("volunteer type", type , data);
    if(type !== 'all'){

      let newData = data.filter((volunteer) => volunteer.is_active == type)
      setTableData(newData);
    }
    else{
      setTableData(data);
    }
    
    // setData((prev) => prev.filter((volunteer) => volunteer.is_active == type));
    
  }





  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-3 mb-2">
                    <h2 className="mainTitle">Volunteer Management</h2>
                  </div>


                  {/* <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="available_slots"
                          label="Select slots"
                          // value={formData.available_slots}
                          required
                          // option={availabilityData}
                          onChange={handleChange}
                        />
                      </div> */}

                  <div className="col-md-3 mb-2">

                    {/* <SelectBox
                        selectClass="mainInput"
                        name="available_slots"
                        // label="Select slots"
                        // value={formData.available_slots}
                        required
                        option={eventlist}
                        onChange={(event) => {
                          serInputvalue({ ...inputValues, project_id: event.target.value });
                          // console.log(formData);
                        }}
                      /> */}


                    {/* <CustomButton
                      text="Create Notification"
                      variant="primaryButton"
                      onClick={hanldeRoute}
                    />  */}
                  </div>

                  {/* <div className="col-md-3 mb-2">
                    <Select
                      onChange={handleChangeopt}
                      value={multiopction}
                      name="multibox"
                      isMulti
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div> */}

                  <div className="col-md-3 mb-2">
                    <SelectBox
                      label="Volunteers"
                      // placeholder="All Volunteer"
                      noPlaceholder={true}
                      multiple
                      selectClass="mainInput"
                      name="event_id"
                      // label="Select Project"
                      value={inputValues.event_id}
                      required
                      option={options}
                      // onChange={(event) => {
                      //   serInputvalue({ ...inputValues, event_id: event.target.value });
                      //   // console.log(formData);
                      // }} 
                      onChange={handleChangeVolunteerType} 
                      />
                  </div>
                  <div className="col-md-3   mb-2">

                    <CustomInput type="text" label='Search' placeholder="Search Volunteer..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                  </div>

                </div>
                <div className="row mb-3">

                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {currentItems?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={
                              item?.image
                                ? `${assetUrl}/${item.image}`
                                : placeholderimage
                            } className="avatarIcon" /></td>
                            <td className="text-capitalize">
                              {item?.name}
                            </td>
                            <td>{item?.email}</td>


                            <td className={item?.is_active == 1 ? 'greenColor' : "redColor"}>{item?.is_active == 1 ? 'Active' : "Inactive"}</td>
                            <td>{formatDate(item?.created_at)}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  {/* <Link to={`/volunteer-management/volunteer-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />Assign Event</Link> */}
                                  <Link to={`/volunteer-management/volunteer-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  {/* <Link to={`/volunteer-management/volunteer-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faTrash} className="tableActionIcon" />Delete</Link> */}
                                  {/* <Link to={`/volunteer-management/edit-volunteer/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link> */}



                                  {/* <Link to={`/volunteer-management/volunteer-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faTrash} className="tableActionIcon" />Delete</Link> */}
                                  {item?.is_top !== undefined && (<button
                                    type="button"
                                    className="tableAction"
                                    onClick={() => Volusteeractiveinactive(item?.id)}
                                  >
                                    {item?.is_active == 1 ? <FontAwesomeIcon
                                      icon={faUserSlash} className="me-2"
                                    ></FontAwesomeIcon> : <FontAwesomeIcon
                                      icon={faUser} className="me-2"
                                    ></FontAwesomeIcon>}

                                    {item?.is_active == 1 ? 'Inactive' : "Active"}
                                  </button>)}

                                      {item?.status && (

                                  <button
                                    type="button"
                                    className="tableAction"
                                    onClick={() => handleAssign(item?.id, item?.status)}
                                  >

                                    {  
                                      item.status === "Assigned" ? (
                                        <>
                                          <FontAwesomeIcon icon={faUserTimes} /> Unassigned
                                        </>
                                      ) : (
                                        <>
                                          <FontAwesomeIcon icon={faTasks} /> Assigned
                                        </>
                                      )
                                    }

                                    {/* {item?.status ? (item.status === "Assigned" ? "Unassigned" : "Assigned") : ""} */}



                                  </button>
                                      )}




                                  <button
                                    type="button"
                                    className="tableAction"
                                    onClick={() => handleTop(item?.id,item?.is_top)}
                                  >
                                    {item?.is_top ? "Already added to Top Volunteer" : "Add to Top Volunteer"}


                                  </button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={tableData?.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />




          {/* <CustomModal show={showModal5} close={() => { setShowModal5(false) }} action={ActiveMale} heading={assignuser} /> */}
          {/* <CustomModal show={showModal4} close={() => { setShowModal6(false) }} success heading='Marked as Active' /> */}
          <CustomModal show={showModal5} close={() => { setShowModal5(false) }} success heading={assignuser} />
          <CustomModal show={topstatusmodalstatus} close={() => { setTopstatusmodalstatus(false) }} success heading={topstatusmodal} />





        </div>
      </DashboardLayout >
    </>
  );
};
