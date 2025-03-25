import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { DashboardLayout } from '../../Components/Layout/DashboardLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import BackButton from '../../Components/BackButton';

const StatsDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const stats = ()=>{
        const LogoutData = localStorage.getItem('login');
        let url = `${process.env.REACT_APP_BASE_URL}/api/admin/stats/${id}`
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
  return (
    <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                {id == 1 ? 'Mobile':'Web'} Stats
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <h5>Stat 1</h5>
                      <div className="col-md-6 mb-4">{data?.title}
                        
                      </div>
                      <div className="col-md-6 mb-4">{data?.value}
                        
                      </div>

                      <h5>Stat 2</h5>
                      <div className="col-md-6 mb-4">{data?.guide}
                        
                      </div>
                      <div className="col-md-6 mb-4">{data?.percentage}
                        
                      </div>
                      <h5>Stat 3</h5>
                      <div className="col-md-6 mb-4">{data?.help}
                        
                      </div>
                      <div className="col-md-6 mb-4">{data?.number}
                        
                      </div>
                      {/* <div className="col-md-6 mb-4">
                        <SelectBox
                        selectClass="mainInput"
                        name="targetDevice"
                        label="Select Target Device"
                        value={targetDevice}
                        required
                        option={deviceOptions}
                        onChange={(e)=>setTargetDevice(e.target.value)}>
                        
                        </SelectBox>
                      </div> */}



                      

                      



                     
                      
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default StatsDetail
