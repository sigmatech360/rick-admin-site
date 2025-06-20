import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../Components/Layout/DashboardLayout';
import BackButton from '../../Components/BackButton';
import CustomInput from '../../Components/CustomInput';
import { Dropdown, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisV, faEye, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { SelectBox } from '../../Components/CustomSelect';
import CustomButton from '../../Components/CustomButton';
import CustomModal from '../../Components/CustomModal';
import moment from 'moment/moment';
import { useNavigate } from 'react-router';
import CustomTable from "../../Components/CustomTable";
import { Link } from 'react-router-dom';
import CustomPagination from '../../Components/CustomPagination';


export  const CMSStats = () => {
    const [data, setData] = useState();
    const [targetDevice, setTargetDevice] = useState();

    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

    const stats = ()=>{
        const LogoutData = localStorage.getItem('login');
        let url = `${process.env.REACT_APP_BASE_URL}/api/admin/stats`
        fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${LogoutData}`
            },
          })
          .then(response=> response.json())
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
    useEffect(()=>{
        stats();
    },[]);
    // const handleChange = (e)=>{
    //   const {name , value } = e.target;
    //   setData((prev)=> ({ ...prev, [name]:value }))
    // }
    // const handleSubmit = (e)=>{
    //   e.preventDefault();
    //   console.log("form data : " , data);
    //   let time = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]");
    //   setData({...data, updated_at : time })
    //   const LogoutData = localStorage.getItem("login");
      
    //   try {
    //     // let id = 
    //     const formDataMethod = new FormData();

    //     // for (const [key, value] of Object.entries(data)) {
    //     //   formDataMethod.append(key, value);
    //     // }
    //     for (const key in data) {
    //       formDataMethod.append(key, data[key]);
    //     }
    //     formDataMethod.updated_at = time;

    //     console.log('targetDevice' , targetDevice);
        
    //     let url = `${process.env.REACT_APP_BASE_URL}/api/admin/stats/update/${targetDevice}`
    //     console.log('URL' , url , formDataMethod);
        
    //     document.querySelector('.loaderBox').classList.remove("d-none");
    //     fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         // 'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${LogoutData}`
    //       },
    //       body: formDataMethod
    //     })
    //     .then(response=> response.json())
    //     .then((data) => {
    //       console.log(data)
    //       document.querySelector('.loaderBox').classList.add("d-none");
    //       // setData(data?.data[0]);
    //     })
    //     .catch((error) => {
    //       document.querySelector('.loaderBox').classList.add("d-none");
    //       console.error("Error during fetch:", error);
    //     })
    //   } catch (error) {
    //     console.error("Error in handleSubmit:", error);
    // document.querySelector('.loaderBox').classList.add("d-none");
        
    //   }
    // }
    // const deviceOptions = [
    //   { id : 1, name: 'Web'},
    //   { id : 6, name: 'Mobile'},
    // ]
    // useEffect(()=>console.log('targetDevice',targetDevice)
    // ,[targetDevice])

    

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_BASE_URL;

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    // const filterData = data?.filter(item =>
    //   item?.title.toLowerCase().includes(inputValue.toLowerCase())
    // );

    const maleHeaders = [
      {
        key: "id",
        title: "S.No",
      },
      {
        key: "device",
        title: "Device",
      }, 
      {
        key: "action",
        title: "Action",
      },
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
    
  return (
    <>
      <DashboardLayout>
      <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Stats Management</h2>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {currentItems?.map((item, index) => {
                          
                          return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td><img src={
                              item?.image
                                ? `${apiUrl}/${item.image}`
                                : placeholderimage
                            } className="avatarIcon" /></td> */}
                            <td className="text-capitalize">
                              {item?.show_in_mobile == 1 ? 'Mobile Stats':'Web Stats'}
                            </td>
                            {/* <td className="text-capitalize">
                              {formatDate(item?.created_at)}
                            </td> */}
                            {/* <td>{`$ ${item?.price}`}</td> */}
                            {/* <td>{item?.title}</td>
                            <td>{item?.chapters?.length > 0 ? item?.chapters?.length : '0'}</td> */}
                            {/* <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  
                                  <Link to={`/stats/stats-detail/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <Link to={`/stats/edit-stats/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>

                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        )})}
                      </tbody>
                    </CustomTable>
                    {data?.length / itemsPerPage > 1 && 
                      <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={data?.length}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </>
  )
}

