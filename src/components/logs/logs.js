import "./logs.css";
import "../register/register.css";
import Modal from "./modal";
import { useState } from 'react';
import Calendar from "react-calendar";
import fetchLogs from "../../utils/fetchLogs";
import moment from 'moment';

const Logs = () => {

  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    rollNumber: ""
  });

  const [dates, setDates] = useState(new Set());
  const [open, setOpen] = useState(false);
  const [attendance, setAttend] = useState([]);
  const [day, setDay] = useState([]);
  const { year, section, rollNumber } = form;

  const onChange = (e) =>  setForm({ ...form, [e.target.name]: e.target.value });
  
  const onSubmit = async(e) => {
    e.preventDefault();
    let obj = await fetchLogs(form);
    console.log(obj)
    let {presentDates,days,name,section} = obj;
    console.log("LOGS: ", presentDates,days)
    // const presentDates = new Set([
    //   "02-05-2022",
    //   "04-05-2022",
    //   "10-05-2022",
    //   "06-05-2022",
    // ])
    setDates(presentDates);
    setAttend(days);
  };
  const openTimeLogs=(obj)=>{
    console.log(obj.getDate()+"-"+(obj.getMonth()+1))
    let mon =obj.getMonth()+1;
    let day1 =obj.getDate()
    let key =(day1<10? `0${day1}`:day1)+"-"+(mon<10? `0${mon}`:mon);
    if(attendance[key])setDay(attendance[key].slice(1))
    else setDay([])
    console.log("BYEEEE",attendance)
    console.log(day)
    setOpen(true);
  }
  const onDayClick =()=>{
    console.log("HIIII")
    setOpen(true);
  }
  const onClose=()=>{
    setOpen(false)
  }


  console.log("rendered");

  return (
    <>
    <Modal timeData={day} open={open} onClose={onClose}/>
    <div style={{ padding: "100px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div className="heading">Enter details</div><br />
        <div className="auth-form">
          <form onSubmit={onSubmit}>
            <div className="register-label"><i className="fas fa-calendar"></i> Year</div>
            <input className="form-input" type="number" name="year" value={year} onChange={onChange} required />
            <div className="register-label"><i className="fas fa-id-badge"></i> Roll Number</div>
            <input className="form-input" type="text" name="rollNumber" value={rollNumber} onChange={onChange} required placeholder='18B81A0556' />
            <br /><br />
            <button className="submit-button"><i className="fas fa-user-plus"></i> submit</button>
          </form>
          
        </div>
      </div>
      <div>
        <div className="heading"> Attendance Logs</div><br />
        <Calendar
          onClickDay={day => openTimeLogs(day)}
          value={year ? new Date(year, 0, 1) : new Date()}
          onChange={() => {}}
          tileClassName={({ date, view }) => {
            if(dates.has(moment(date).format("DD-MM-YYYY"))){
              return 'highlight';
            }
          }}
          >
        </Calendar>
        
      </div>
    </div>
    </>
  );
};

export default Logs;