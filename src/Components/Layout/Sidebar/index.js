import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Dashbord from "../../../Assets/Icons/Dashbord.svg";
import VolunteersManagement from "../../../Assets/Icons/Volunteers-Management.svg";
import ProgramsManagement from "../../../Assets/Icons/Programs-Management.svg";
import EventManagement from "../../../Assets/Icons/Event-Management.svg";
import PodcastManagement from "../../../Assets/Icons/Podcast-Management.svg";
import SponsorshipManagement from "../../../Assets/Icons/Sponsorship-Management.svg";
import AnnouncementManagement from "../../../Assets/Icons/Announcement-Management.svg";
import BrandManagement from "../../../Assets/Icons/Brand-Management.svg";
import MemberManagement from "../../../Assets/Icons/Member-Management.svg";
import Users from "../../../Assets/Icons/Users.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faEye,
  faTasks,
  faMountainCity,
  faMoneyBill,
  faHeadphonesAlt,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

import "./style.css";
import { allSidebarNavlinks } from "./MenuLinks";
import { useEffect, useState } from "react";
import { useProfileData } from "../../../context/UserProfileContext";

export const Sidebar = (props) => {
  const  { permissions } = useProfileData();
  let role = localStorage.getItem("role");
  // let permissions = localStorage.getItem("permissions");
  const [sideBarNavlinks, setSideBarNavlinks] = useState([]);
  useEffect(() => {
    if (role == 1) {
      setSideBarNavlinks(allSidebarNavlinks);
    } else {
      // const selectedIds = permissions.split(',');

      const filteredNavlinks = allSidebarNavlinks.filter((item) =>
        permissions?.includes(String(item.id))
      );
      
      setSideBarNavlinks(filteredNavlinks);
    }
  }, [permissions]);

  const location = useLocation();
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        {sideBarNavlinks.map((linkItem) => (
          <li className="sidebar-li" key={linkItem.link}>
            <Link
              className={`sideLink ${
                location.pathname.includes(linkItem.link) ? "active" : ""
              }`}
              to={linkItem.link}
            >
              <span className="sideIcon">
                <img src={linkItem.icon} alt="Side Icon" />
              </span>
              <span className="sideLinkText">{linkItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
