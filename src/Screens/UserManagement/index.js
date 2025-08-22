import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faTimes,
  faFilter,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import placeholderimage from "../../Assets/images/placeholderimage.png";

import "./style.css";

export const UserManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate("/user-management//add-user");
  };

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterData = data.filter((item) =>
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const apiUrl = process.env.REACT_APP_BASE_URL;

  const UsersList = async () => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/api/user/get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  }

  useEffect(() => {
    document.title = "Hisoc Admin | User Management";
    UsersList();
    
  }, []);

  const [showModal5, setShowModal5] = useState(false);

  const [handledeleteid, setHandledeleteid] = useState();

  const handledelete = (id) => {
    setShowModal5(true);
    setHandledeleteid(id);
  };

  const DeleteUser = ( ) => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}/api/user/delete/${handledeleteid}`, {
      method: "POST",
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
        UsersList();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

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
      key: "email",
      title: "Email Address",
    },

    {
      key: "action",
      title: "Action",
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
                    <h2 className="mainTitle">User Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      <CustomButton
                        text="Add User"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      />
                      <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={
                                  item?.image
                                    ? `${apiUrl}/${item.image}`
                                    : placeholderimage
                                }
                                className="avatarIcon"
                              />
                            </td>
                            <td className="text-capitalize">{item?.name}</td>
                            {/* <td>{item?.username}</td> */}
                            <td>{item?.email}</td>
                            {/* <td>{item?.unit_id}</td> */}
                            {/* <td>{item?.user_role == 3 ? 'User' : 'Sub Admin'}</td> */}
                            {/* <td className={item?.status == 1 ? 'greenColor' : 'redColor'}>{item?.status == 1 ? 'Active' : 'Inactive'}</td> */}
                            {/* <td className={item?.status == 1 ? 'greenColor' : "redColor"}>{item?.status == 1 ? 'Active' : "Inactive"}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle
                                  variant="transparent"
                                  className="notButton classicToggle"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                  align="end"
                                  className="tableDropdownMenu"
                                >
                                  <Link
                                    to={`/user-management/user-detail/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <Link
                                    to={`/user-management/edit-user/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faPencil}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link>
                                  <button
                                    type="button"
                                    className="tableAction"
                                    onClick={() => handledelete(item?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>{" "}
                                    Delete
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
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal
            show={showModal}
            close={() => {
              setShowModal(false);
            }}
            action={inActive}
            heading="Are you sure you want to mark this user as inactive?"
          />
          <CustomModal
            show={showModal2}
            close={() => {
              setShowModal2(false);
            }}
            success
            heading="Marked as Inactive"
          />

          <CustomModal
            show={showModal3}
            close={() => {
              setShowModal3(false);
            }}
            action={ActiveMale}
            heading="Are you sure you want to mark this user as Active?"
          />
          <CustomModal
            show={showModal4}
            close={() => {
              setShowModal4(false);
            }}
            success
            heading="Marked as Active"
          />
          <CustomModal
            show={showModal5}
            close={() => {
              setShowModal5(false);
            }}
            action={() => {
              setShowModal5(false);
              DeleteUser();
            }}
            heading={" Do you want to delete this user?"}
          />
        </div>
      </DashboardLayout>
    </>
  );
};
