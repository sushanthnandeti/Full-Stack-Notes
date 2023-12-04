import React, {useState} from 'react';
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


const login = () => {
   const data = {username:username, password:password};
   axios.post("http://localhost:3001/auth/login",data).then((response) => {
        if(response.data.error) {
              alert(response.data.error);
        }
        else{
          sessionStorage.setItem("accessToken", response.data);
        }
   });
}

  return (
    <div className="loginContainer">
      <label> UserName </label>
      <input 
        type="text" 
        placeholder = "(Ex: Sushanth123...)"
        onChange={(event) => 
        {setUsername(event.target.value)}} 
      />
      <label> Password </label>
      <input 
        type="password" 
        placeholder = "Your Password..."
        onChange={(event) => 
        {setPassword(event.target.value)}} 
      />

      <button onClick = {login}> Login </button>
    </div>
  )
}

export default Login