import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faTrash, faCheck, faTimes, faFilter, faEdit, faSlash, faUserSlash, faUser } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import { SelectBox } from "../../Components/CustomSelect";
import placeholderimage from '../../Assets/images/placeholderimage.png'
import "./style.css";
import { formatDate } from "../../utils/dateUtils";

export const TopVolunteerManagement = () => {
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

  const filterData = data?.filter(item => item?.name?.toLowerCase().includes(inputValue.toLowerCase())
  );


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  const apiUrl = process.env.REACT_APP_BASE_URL;
  const Volunteer = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");


    const url = `${apiUrl}/api/admin/top-volunteer`
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
        console.log(data?.data)
        document.querySelector('.loaderBox').classList.add("d-none");
        setData(data?.data);
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




  const LogoutData = localStorage.getItem('login');

















  const [topstatusmodal, setTopstatusmodal] = useState("")


  const handleTop = async (id) => {
    try {
      if (!id) {
        console.error("Error: Missing user ID");
        return;
      }

      document.querySelector('.loaderBox').classList.remove("d-none");

      const assignusers = `${apiUrl}/api/admin/top-volunteer/${id}`; // Use dynamic ID

      const response = await fetch(assignusers, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        }
      });

      const data = await response.json();
      document.querySelector('.loaderBox').classList.add("d-none");

      console.log(data);

      // Handle success response
      if (data?.status) {
        setTopstatusmodal(data?.message);
        setTopstatusmodalstatus(true);
        Volunteer(); // Assuming this refreshes the list
        // setShowModal5(true); // Uncomment if needed
      } else {
        console.warn("API Response Error:", data?.message || "Unknown error");
      }

    } catch (error) {
      document.querySelector('.loaderBox').classList.add("d-none");
      console.error("Fetch Error:", error);
    }
  };




  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Top Volunteer Management</h2>
                  </div>

                  {/* 
                  <div className="col-md-3 mb-2">
 

                    <CustomButton
                      text="Create Notification"
                      variant="primaryButton"
                      onClick={hanldeRoute}
                    /> </div> */}

                  {/* 

                  <div className="col-md-3 mb-2">
                    <SelectBox
                      selectClass="mainInput"
                      name="event_id"
                      // label="Select Project"
                      value={inputValues.event_id}
                      required
                      option={eventlist}
                      onChange={(event) => {
                        serInputvalue({ ...inputValues, event_id: event.target.value });
                        // console.log(formData);
                      }} />
                  </div> */}
                  <div className="col-md-3   mb-2">

                    <CustomInput type="text" placeholder="Search Volunteers..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
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
                                ? `${apiUrl}/${item.image}`
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




                                  <button
                                    type="button"
                                    className="bg-transparent border-0 ps-lg-3 pt-1 d-flex gap-2  justify-content-center align-items-center"
                                    onClick={() => handleTop(item?.id)}
                                  >
                                    {"RemoveTop Volunteer"}


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
                      totalItems={data?.length}
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
