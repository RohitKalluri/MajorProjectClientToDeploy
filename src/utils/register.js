import { getDatabase, set, ref} from 'firebase/database';
import { getStorage, ref as stRef, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app"; 
import firebaseConfig from './firebaseConfig';

initializeApp(firebaseConfig);

const registerUser = (data) => {
  const { rollNumber, joiningYear, section, image } = data;
  const storage = getStorage();
  const metaData = {
    contentType: image.type
  };
  const storageRef = stRef(storage, `CVR College/${joiningYear}/${section}/${rollNumber}.jpg`);
  const upload = uploadBytesResumable(storageRef, image, metaData);
  upload.on('state-changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    },
    (error)=>{
      alert('error occured while uploading', error);
    },
    ()=>{
      getDownloadURL(upload.snapshot.ref)
      .then((downloadUrl)=>{
        data.image = downloadUrl;
        console.log(image);
        registerData(data);
      }).catch(error => console.log(error));
    }
  );
};

const registerData = (data) => {
  const { joiningYear, section, rollNumber, name, image } = data;
  console.log(image);
  const db = getDatabase();
  set(ref(db, `CVR College/${joiningYear}/${section}/${rollNumber}`), {
    Name: name,
    RollNumber: rollNumber,
    JoiningYear: joiningYear,
    Section: section,
    Image: image,
    Attendance: attendanceData(joiningYear)
  },
    alert('Details uploaded succesfully')
  ); 
  set(ref(db, `RollNo/${rollNumber}`), {
    Name: name,
    RollNumber: rollNumber,
    JoiningYear: joiningYear,
    Section: section,
  },
    alert('Details uploaded succesfully')
  );
};

const attendanceData = (year) => {
  let data = {};
  data[year] = {'count': 0};
  data[parseInt(year) + 1] = {'count': 0};
  data[parseInt(year) + 2] = {'count': 0};
  data[parseInt(year) + 3] = {'count': 0};
  data[parseInt(year) + 4] = {'count': 0};
  return data;
};

export default registerUser;


  