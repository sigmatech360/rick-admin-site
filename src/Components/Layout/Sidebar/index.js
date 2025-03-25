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

const sideBarNavlinks = [
  { title: 'Dashboard', link: '/dashboard', icon: Dashbord },
  { title: 'Volunteers Management', link: '/volunteer-management', icon: VolunteersManagement },
  { title: 'Event Assign Management', link: '/interested-volunteer-management', icon: VolunteersManagement },
  { title: 'Create Notification', link: '/create-notification', icon: VolunteersManagement },
  { title: 'CMS Stats', link: '/stats', icon: EventManagement },
  { title: 'Programs Management', link: '/programs-management', icon: ProgramsManagement },
  { title: 'Event Management', link: '/event-management', icon: EventManagement },
  { title: 'Podcast Management', link: '/podcast-management', icon: PodcastManagement },
  { title: 'Sponsor Program', link: '/sponsor-program', icon: SponsorshipManagement },
  { title: 'Top Volunteer Management', link: '/top-volunteer-management', icon: VolunteersManagement },
  { title: 'Announcement Management', link: '/announcement-management', icon: AnnouncementManagement },
  { title: 'Sponsorship Management', link: '/sponsorship-management', icon: SponsorshipManagement },
  { title: 'Our Works Management', link: '/project-management', icon: Dashbord },
  { title: 'Brand Management', link: '/brand-management', icon: BrandManagement },
  { title: 'Member Management', link: '/member-management', icon: MemberManagement }
];

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        {sideBarNavlinks.map((linkItem) => (
          <li className="sidebar-li" key={linkItem.link}>
            <Link
              className={`sideLink ${location.pathname.includes(linkItem.link) ? 'active' : ''}`}
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
