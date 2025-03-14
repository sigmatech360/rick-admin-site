import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import { usePost, useApi, useEditpost, usePostUpdate } from "../../Api";

import "./style.css";

export const Roles = () => {

  const [data, setData] = useState('');
  const [userForm, setUserFrom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [dataEdited, setDataEdited] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const { apiData: roleData, loading: rolesListingLoading, error: rolesError, updateDataForm: rolesLitingResponse } = usePost('admin/role-add-edit');
  const { apiData: rolesListing, loading: rolesLoading } = useApi('admin/role-listing');
  const { apiData: roleEditData, loading: rolesListingEditLoading, error: rolesEditError, updateDataForm: rolesLitingEditResponse, editParam: editDataParam } = useEditpost('admin/view-role/');

  const { apiData: roleUpdateData, loading: rolesListingUpdateLoading, error: rolesUpdateError, updateDataForm: rolesUpdateResponse, editParam: updateDataParam } = usePostUpdate('admin/role-add-edit/');

  const [formData, setFormData] = useState({
    name: '',
    status: '1'
  });

  const optionData = [
    {
      name: "Active",
      code: "1"
    },
    {
      name: "Inactive",
      code: "0"
    },
  ]

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleChange = (e) => {
    setInputValue(e.target.value);
  }


  const filterData = data && (
    data.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  )

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    document.title = 'Hisoc Admin | Role Management';

  }, []);

  useEffect(() => {
    setData(rolesListing?.roles);
    // console.log(data)
  }, [rolesListing])



  //  Add roles 
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData)
    rolesLitingResponse(formData);
    roleData ? setShowModal(true) || setUser(false) : setShowModal(false)
  }

  //  Edit Roles 

  const editUnit = (unitID) => {
    editDataParam(unitID);
    setDataEdited(true)
  }

  useEffect(() => {
    if (dataEdited) {
      console.log(roleEditData);
      setIdUser(roleEditData?.roles.id)
      setEditUser(true)
      setFormData({
        ...formData,
        name: roleEditData?.roles.name,
        status: roleEditData?.roles.status
      });
    }

  }, [roleEditData, dataEdited])


  // Update roles 

  const handleEditSubmit = (event) => {
    event.preventDefault();
    console.log(formData)

    updateDataParam(idUser);
    rolesUpdateResponse(formData);
    setDataSubmitted(true)
  }

  useEffect(() => {
    if (dataSubmitted) {
      setEditUser(false)
      setData(rolesListing?.roles)
      console.log(data)
    }
  }, [roleUpdateData, dataSubmitted, rolesListing])

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "roles",
      title: "Roles",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Roles Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {/* <CustomButton text="Add Role" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} /> */}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>

                        {
                          rolesLoading ? 'Loading' : (
                            currentItems && currentItems?.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-capitalize">
                                  {item.name}
                                </td>
                                <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td>
                                <td>
                                  <Dropdown className="tableDropdown">
                                    <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                      <FontAwesomeIcon icon={faEllipsisV} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end" className="tableDropdownMenu">
                                      <button onClick={() => {
                                        editUnit(item.id)
                                        setUserFrom(true)
                                      }} className="tableAction"><FontAwesomeIcon icon={faTimes} className="tableActionIcon" />Edit</button>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))
                          )
                        }
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
          {/* add roles  */}

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <CustomInput
              label="Add Roles"
              type="text"
              placeholder="Add Roles"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                console.log(formData);
              }}

            />
            <CustomButton variant='primaryButton' text='Add' type='submit' onClick={handleSubmit} />
          </CustomModal>

          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <CustomInput
              label="Edit Roles"
              type="text"
              disabled
              placeholder="Edit Roles"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                console.log(formData);
              }}

            />

            <SelectBox
              selectClass="mainInput"
              name="Status"
              label="Status"
              value={formData.status}
              required
              option={optionData}
              onChange={(event) => {
                setFormData({ ...formData, status: event.target.value });
                console.log(formData);
              }}
            />
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleEditSubmit} />
          </CustomModal>
          <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Role added Successfully.' />

        </div>
      </DashboardLayout>
    </>
  );
};
