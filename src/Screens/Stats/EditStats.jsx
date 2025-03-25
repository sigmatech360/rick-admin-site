import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../Components/Layout/DashboardLayout';
import BackButton from '../../Components/BackButton';
import CustomInput from '../../Components/CustomInput';
import { OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { SelectBox } from '../../Components/CustomSelect';
import CustomButton from '../../Components/CustomButton';
import CustomModal from '../../Components/CustomModal';
import moment from 'moment/moment';
import { useParams } from 'react-router';


export  const EditStats = () => {
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
    const handleChange = (e)=>{
      const {name , value } = e.target;
      setData((prev)=> ({ ...prev, [name]:value }))
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log("form data : " , data);
      let time = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]");
      setData({...data, updated_at : time })
      const LogoutData = localStorage.getItem("login");
      
      try {
        // let id = 
        const formDataMethod = new FormData();

        // for (const [key, value] of Object.entries(data)) {
        //   formDataMethod.append(key, value);
        // }
        for (const key in data) {
          formDataMethod.append(key, data[key]);
        }
        formDataMethod.updated_at = time;
        
        let url = `${process.env.REACT_APP_BASE_URL}/api/admin/stats/update/${id}`
        console.log('URL' , url , formDataMethod);
        
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${LogoutData}`
          },
          body: formDataMethod
        })
        .then(response=> response.json())
        .then((data) => {
          console.log(data)
          document.querySelector('.loaderBox').classList.add("d-none");
          // setData(data?.data[0]);
        })
        .catch((error) => {
          document.querySelector('.loaderBox').classList.add("d-none");
          console.error("Error during fetch:", error);
        })
      } catch (error) {
        console.error("Error in handleSubmit:", error);
    document.querySelector('.loaderBox').classList.add("d-none");
        
      }
    }
    
    
    
  return (
    <>
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <h5>Stat 1</h5>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          // label={data?.title}
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name='value'
                          value={data?.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          // label={data?.title}
                          required
                          id="name"
                          type="text"
                          placeholder="Enter value"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name='value'
                          value={data?.value}
                          onChange={handleChange}
                        />
                      </div>

                      <h5>Stat 2</h5>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          // label={data?.guide}
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name='percentage'
                          value={data?.guide}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          // label={data?.guide}
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name='percentage'
                          value={data?.percentage}
                          onChange={handleChange}
                        />
                      </div>
                      <h5>Stat 3</h5>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          // label={data?.help}
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name='number'
                          value={data?.help}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          // label={data?.help}
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name='number'
                          value={data?.number}
                          onChange={handleChange}
                        />
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



                      

                      



                     
                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
            // navigate(-1)
          }}
          success
          heading={Message}
        /> */}
      </DashboardLayout>
    </>
  )
}

