import { useState, useEffect } from "react";

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faCalendarDays,
  faHandshake,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";
import {useApi} from "../../Api";
import program from '../../Assets/images/program.png'

import "./style.css";

export const Dashboard = () => {
  const [data, setData] = useState('');
  const [lead, setLead] = useState('');
  const [recived, setReceived] = useState('');
  const [amount, setAmount] = useState('');
  const [volunteers, setVolunteers] = useState('');
  const [events, setEvents] = useState('');
  const [programs, setPrograms] = useState('');
  const [sponsors, setSponsors] = useState('');
  const { apiData: leadsAmountData, loading: dataLoading } = useApi('admin/leads-amount');
  const { apiData: leadsAmountMonthlyData, loading: leadLoading} = useApi('admin/leads-amount-monthly');
  const { apiData: leadsAmountReceivedData, loading: receivedLoading} = useApi('admin/leads-amount-received');
  const { apiData: leadsAmountReceivedMonthlyData, loading: AmountLoading } = useApi('admin/leads-amount-received-monthly');
  const { apiData: volunteerData, loading: volunteerLoading } = useApi('admin/volunteer');

  const  fetchVolunteers = (LogoutData) =>{
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/volunteer`
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }).then(res => res.json())
      .then((data)=>{
        console.log(data.data);
        setVolunteers(data?.data)
      }).catch((error)=>{
        console.log('Error in fetching Error' , error);
        
      })

  }
  
  const  fetchEvents = (LogoutData) =>{
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/event`
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }).then(res => res.json())
      .then((data)=>{
        console.log(data.data);
        setEvents(data?.data)
      }).catch((error)=>{
        console.log('Error in fetching Error' , error);
        
      })

  }
  const  fetchPrograms = (LogoutData) =>{
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/program`
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }).then(res => res.json())
      .then((data)=>{
        console.log(data.data);
        setPrograms(data?.data)
      }).catch((error)=>{
        console.log('Error in fetching Error' , error);
        
      })

  }
  const  fetchSponsors = (LogoutData) =>{
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/sponsored-program`
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }).then(res => res.json())
      .then((data)=>{
        console.log(data.data);
        setSponsors(data?.data)
      }).catch((error)=>{
        console.log('Error in fetching Error' , error);
        
      })

  }
  useEffect(()=>{
    // try {
      const LogoutData = localStorage.getItem("login");
      fetchVolunteers(LogoutData);
      fetchEvents(LogoutData);
      fetchPrograms(LogoutData);
      fetchSponsors(LogoutData);
    // } catch (error) {
      
    // }
  },[])


  useEffect(() => {

    document.title = 'Hisoc Admin | Dashboard';
  }, []);


  useEffect(() => {
    setData(leadsAmountData)
    setLead(leadsAmountMonthlyData)
    setReceived(leadsAmountReceivedData)
    setAmount(leadsAmountReceivedMonthlyData)
    setVolunteers(volunteerData);
    

  }, [leadsAmountData, leadsAmountMonthlyData, leadsAmountReceivedData, leadsAmountReceivedMonthlyData, volunteerData])
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    console.log('volunteers',volunteers);
    const dateCounts = {};
    if(volunteers.length > 0){

    volunteers.forEach((volunteer) => {
      const createdAt = new Date(volunteer.created_at);
      const createdDate = createdAt.toISOString().split('T')[0]; // Format to "YYYY-MM-DD"

      // Increment the count for this specific date
      if (!dateCounts[createdDate]) {
        dateCounts[createdDate] = 0;
      }
      dateCounts[createdDate] += 1;
    });

    const labels = Object.keys(dateCounts).sort(); // Sort the dates in ascending order
    const data = Object.values(dateCounts);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Volunteers",
          backgroundColor: "rgb(0 41 59 / 81%)",
          borderColor: "#00293B",
          pointBackgroundColor: "#00293B",
          pointBorderColor: "#00293B",
          borderWidth: 2,
          data: data,
          tension: 0.5,
        },
      ],
    });
  }


  },[volunteers])

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {leadLoading ? 'Loading...' : <h3 className="statsNumber">{`$ ${data?.totalSum}`}</h3>} */}
                          <h3 className="statsNumber">{volunteers?.length}</h3>
                          <p className="statsText">Total Volunteers</p>
                        </div>
                      </div>
                      <div className="statsChange">
                      <FontAwesomeIcon icon={faUsers} className="me-2  fs-3" />
                        {/* <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {receivedLoading ? 'Loading... ' : <h3 className="statsNumber">{`$ ${recived?.totalSumReceivedAmount}`}</h3>} */}
                          <h3 className="statsNumber">{events.length}</h3>
                          <p className="statsText">Total Events</p>
                        </div> 
                      </div>
                      <div className="statsChange">
                      <FontAwesomeIcon icon={faCalendarDays} className="me-2  fs-3" />
                        {/* <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {AmountLoading ? 'Loading...' : 
                          <h3 className="statsNumber">{`$ ${amount?.sumAmountMonthlyReceived}`}</h3>
                          } */}
                          <h3 className="statsNumber">{programs.length}</h3>
                          <p className="statsText">Total Programs</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <img src={program} style={{width:'30px'}} className="me-2" />
                        {/* <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {AmountLoading ? 'Loading...' : 
                          <h3 className="statsNumber">{`$ ${amount?.sumAmountMonthlyReceived}`}</h3>
                          } */}
                          <h3 className="statsNumber">{sponsors.length}</h3>
                          <p className="statsText">Total Sponsor Programs</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          {/* <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          /> */}
                          <FontAwesomeIcon icon={faHandshake} className="me-2  fs-3" />

                          {/* 100 % */}
                        </p>
                        {/* <p>Since last week</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="d-flex flex-wrap justify-content-between">
                  <h3 className="mainTitle">Total Users</h3>
                  {/* <SelectBox  selectClass="mainInput" name="Monthly" required option={'optionData'}

                  /> */}
                </div>
                <div className="graph-wrapper">
                  {/* <CChart
                    type="line"
                    height="90"
                    options={{
                      scales: {
                        y: {
                          suggestedMin: 0,
                          suggestedMax: 40,
                        },
                      },
                    }}
                    data={{
                      labels: ["Nov 2010", "Dec 2010", "Jan 2011", "Feb 2011","Jul 2011", "Dec 2011"],
                      tension: "0.5",
                      datasets: [
                        {
                          label: "Active Users",

                          backgroundColor: "rgb(0 41 59 / 81%)",
                          borderColor: "#00293B",
                          pointBackgroundColor: "#00293B",
                          pointBorderColor: "#00293B",
                          borderWidth: 2,
                          data: [35,20,30,38,45,52],
                          tension: 0.5,
                        },
                        {
                          label: "Inactive Users",
                          backgroundColor: "rgb(1 22 215 / 81%)",
                          borderColor: "#0116d7",
                          pointBackgroundColor: "#0116d7",
                          borderWidth: 2,
                          pointBorderColor: "#0116d7",
                          data: [20,23,30,26,34,35],
                          tension: 0.5,
                        },
                      ],
                    }}
                  /> */}
                  {volunteers.length === 0 ? <p className="text-center">No data available</p> : (
                    <CChart
                      type="line"
                      height="90"
                      options={{
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: "Date",
                            },
                          },
                          y: {
                            title: {
                              display: true,
                              text: "Number of Volunteers",
                            },
                            suggestedMin: 0,
                            // suggestedMax: Math.max(...Object.values(chartData).map(dataset => Math.max(...dataset.data))) + 5, // Dynamically adjust max Y axis
                          },
                        },
                      }}
                      data={chartData}
                    />

                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mb-3">

          </div> */}
        </div>
      </DashboardLayout >
    </>
  );
};
