import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Dashbord from "../../../Assets/Icons/Dashbord.svg"
import VolunteersManagement from "../../../Assets/Icons/Volunteers-Management.svg"
import ProgramsManagement from "../../../Assets/Icons/Programs-Management.svg"
import EventManagement from "../../../Assets/Icons/Event-Management.svg"
import PodcastManagement from "../../../Assets/Icons/Podcast-Management.svg"
import SponsorshipManagement from "../../../Assets/Icons/Sponsorship-Management.svg"
import AnnouncementManagement from "../../../Assets/Icons/Announcement-Management.svg"
import BrandManagement from "../../../Assets/Icons/Brand-Management.svg"
import MemberManagement from "../../../Assets/Icons/Member-Management.svg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faEye,
  faTasks,
  faMountainCity,
  faMoneyBill,
  faHeadphonesAlt,
  faHeadset
} from "@fortawesome/free-solid-svg-icons"; 
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">


        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faBorderAll} /> */}
              <img src={Dashbord} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>


        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/volunteer-management') ? 'active' : ''}`} to="/volunteer-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faMessage} /> */}
              <img src={VolunteersManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Volunteers Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/create-notification') ? 'active' : ''}`} to="/create-notification">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faMessage} /> */}
              <img src={VolunteersManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Create Notification</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/programs-management') ? 'active' : ''}`} to="/programs-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faMessage} /> */}
              <img src={ProgramsManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Programs Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/event-management') ? 'active' : ''}`} to="/event-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faEye} /> */}
              <img src={EventManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Event Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/podcast-management') ? 'active' : ''}`} to="/podcast-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faTasks} /> */}
              <img src={PodcastManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Podcast Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/sponsor-program') ? 'active' : ''}`} to="/sponsor-program">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faTasks} /> */}
              <img src={SponsorshipManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Sponsor Program</span>
          </Link>
        </li>



        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/top-volunteer-management') ? 'active' : ''}`} to="/top-volunteer-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faTasks} /> */}
              <img src={VolunteersManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Top Volunteer Management</span>
          </Link>
        </li>



         



        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/announcement-management') ? 'active' : ''}`} to="/announcement-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faMountainCity} /> */}
              <img src={AnnouncementManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Announcement Management</span>
          </Link>
        </li>

        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/customer-support') ? 'active' : ''}`} to="/customer-support">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHeadset} />
            </span>
            <span className="sideLinkText">Customer Support</span>
          </Link>
        </li> */}

        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/currency-management') ? 'active' : ''}`} to="/currency-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Leadership Management</span>
          </Link>
        </li>
        
        */}


        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/sponsorship-management') ? 'active' : ''}`} to="/sponsorship-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faUser} /> */}
              <img src={SponsorshipManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Sponsorship   Management</span>
          </Link>
        </li>


        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/notification-list') ? 'active' : ''}`} to="/notification-list">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText"> Notification Management</span>
          </Link>
        </li> */}


        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/project-management') ? 'active' : ''}`} to="/project-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faEye} /> */}
              <img src={Dashbord} alt="Side Icon" />
            </span>
            <span className="sideLinkText">
              
              
              
            Our Works    Management</span>
          </Link>
        </li>



        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/brand-management') ? 'active' : ''}`} to="/brand-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faEye} /> */}
              <img src={BrandManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Brand  Management</span>
          </Link>
        </li>





        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/member-management') ? 'active' : ''}`} to="/member-management">
            <span className="sideIcon">
              {/* <FontAwesomeIcon icon={faEye} /> */}
              <img src={MemberManagement} alt="Side Icon" />
            </span>
            <span className="sideLinkText">Member  Management</span>
          </Link>
        </li>


        {/* 
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="sideLinkText">User  Management</span>
          </Link>
        </li> */}
        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/target-listing') ? 'active' : ''}`} to="/target-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Project</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};
