import { getDatabase, set, ref, get, child } from 'firebase/database';
//import { getStorage, ref as stRef, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-storage.js";
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebaseConfig';

initializeApp(firebaseConfig);

const fetchLogs = async (user) => {
  const { year, rollNumber } = user;
  let presentDates = [];

  // logic to fetch present dates from DB
  
  var joiningYear, name, section;


  const db = getDatabase();
  const dbref = ref(db);
  let snapshot;
  try {
    snapshot = await get(child(dbref, 'RollNo/' + rollNumber));
  } catch (error) {
    console.log(error);
  }
  
  if (snapshot.exists()) {
    var data = snapshot.val()
    console.log('VALUE',data)
    joiningYear = data.JoiningYear;
    name = data.Name;
    section = data.Section;
  } else
    alert('No data available')

  var path = 'CVR College/' + joiningYear + '/' + section + '/' + rollNumber + '/Attendance' + '/' + year;
  console.log(path)
  try {
    snapshot = await get(child(dbref, path));
  } catch (error) {
    console.log(error);
  }
  if (snapshot.exists()) {
    var data = snapshot.val()
    console.log(data);
    let limit = 10 //0*6*60*60;// 7hr limit to be marked as present
    for (let i of Object.keys(data)) {
      console.log(i);
      let logs = data[i];
      let len = logs.length;
      let totalTime = 0;
      for (let j = 1; j < len; j++) {
        console.log(logs[j]);
        let inTime = logs[j].inTime;;
        let outTime = logs[j].outTime;
        console.log(typeof (outTime));
        console.log(inTime && outTime);
        if (inTime && outTime) {

          let d1 = new Date("02-07-2011 " + inTime);
          let d2 = new Date("02-07-2011 " + outTime);
          console.log(d2 + " " + d1);
          var diff = Math.abs(d2 - d1) / 1000;
          totalTime += diff;
        }
      }
      if (totalTime >= limit) {
        presentDates.push(i + "-" + year);
      }
    }
  } else
    alert('No data available')
  console.log("PRESENt DATES");
  console.log(presentDates);
  //data = data.shift()
  return { presentDates: new Set(presentDates), days: data, name, section };
};

export default fetchLogs;