import {  useState } from 'react';
import './App.scss';
import axios from 'axios';
import Login from './components/login/Login';
import Tabs from './components/tabs/Tabs';
axios.defaults.baseURL = "https://git.heroku.com/namajwt.git/api"

function App() {
  
  const [user, setUser] = useState(null);
  let accessToken = localStorage.getItem("accessToken");
  
  if(accessToken !== '0' && accessToken !== null){
    axios.post("/auth/verifyToken", {
      headers: {"token": accessToken, "onlyVerify": true} //this is cnot working as of now for some reason
    }).then(res => {
      if(res.status == 200){
        setUser(res.data);
      }
    }).catch(err => {
      accessToken = '0';
      localStorage.setItem("accessToken", '0');
      // alert("Sessionn Expired, you need to login again");
      console.log(err);
    });
  }

  return (
    !user ? <Login setUser={setUser} /> : <Tabs token={user.accessToken || accessToken}/>
  );
}

export default App;
