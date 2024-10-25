// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import ReletedDoctors from '../components/ReletedDoctors'

const Appointment = () => {

 const {docId} = useParams()
 const {doctors,currencySymbol} = useContext(AppContext)
 const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

 const [docInfo,setDocInfo] = useState(null)
 const [docSlots,setDocSlots] = useState([])
 const [slotIndex,setSlotIndex] = useState(0)
 const [slotTime,setSlotTime] = useState('')

 const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    
 }

 const getAvailableSlots = async () => {
  setDocSlots([]); // Clear previous slots

  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    // If the date is today, start the slots from the next available time slot (30 mins after the current time)
    let startTime = new Date(currentDate);
    if (i === 0) { // If today
      let now = new Date();
      now.setMinutes(now.getMinutes() + 30); // Move 30 mins ahead from now
      startTime.setHours(now.getHours(), now.getMinutes(), 0, 0); // Set start time from next 30 min slot
    } else {
      startTime.setHours(0, 0, 0, 0); // Set to midnight for future days
    }

    let endTime = new Date(currentDate);
    endTime.setHours(23, 59, 0, 0); // Set the end of the day

    let timeSlots = [];

    while (startTime < endTime) {
      let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      timeSlots.push({
        datetime: new Date(startTime),
        time: formattedTime,
      });

      startTime.setMinutes(startTime.getMinutes() + 30); // Increment time by 30 minutes
    }

    setDocSlots((prev) => [...prev, timeSlots]); // Add new slots for the day
  }
};
const { user } = useContext(AppContext);

const bookAppointment = async () => {
  if (!slotTime || !docInfo || !user?.patientId) return;

  const appointmentData = {
    doctorId: docInfo._id,
    patientId: user.patientId,
    appointmentTime: new Date(`${docSlots[slotIndex][0].datetime.toDateString()} ${slotTime}`),
  };

  try {
      const response = await fetch('http://localhost:8085/api/appointments', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Ensure these headers are correct
              'Accept': 'application/json',
          },
          body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
          const appointment = await response.json();
          alert('Appointment booked successfully!');
      } else {
          console.error('Failed to book appointment:', response.statusText);
          alert('Failed to book appointment');
      }
  } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error booking your appointment.');
  }
};

 useEffect(()=>{
   fetchDocInfo()
 },[doctors,docId])

 useEffect(()=>{
   getAvailableSlots()
 },[docInfo])

 useEffect(()=>{
   console.log(docSlots);
 },[docSlots])

  return docInfo && (
    <div className='mt-10'>
      {/* ---Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=''/>
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
           {/* ----Doc Info : name ,degree , experience----- */}
           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
           {docInfo.name} 
           <img className='w-5' src={assets.verified_icon} alt=''/>
           </p>
           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
               <p>{docInfo.degree} - {docInfo.speciality}</p>
               <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
           </div>

           {/* -----Doctor About----- */}
           <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
            About <img src={assets.info_icon} alt=""/>
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
           </div>
           <p className='text-gray-500 font-medium mt-4'>
             Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
           </p>
        </div>
      </div>

      {/* ---Booking slots-- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
            <p>Booking slots</p>
            <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
              {
                docSlots.length && docSlots.map((item,index)=>(
                     <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}  `}  key={index}>
                       <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                       <p>{item[0] && item[0].datetime.getDate() }</p>
                     </div>
                ))
              }
            </div>

            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 '>
                {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                       <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300 '}`} key={index}>
                         {item.time.toLowerCase()}
                       </p>
                )) }
            </div>
            <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Your Channeling</button>
        </div>

           {/*---Listing Related Doctors-----  */}
           <ReletedDoctors docId={docId} speciality ={docInfo.speciality}/>

    </div>
  )
}

export default Appointment
