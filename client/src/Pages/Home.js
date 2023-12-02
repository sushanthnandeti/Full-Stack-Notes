import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  
  const [listOfPorts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3001/posts').then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div> 
        {listOfPorts.map((value, key)=>{
    
    return (
            <div className="post" onClick={()=> {
                navigate(`/post/${value.id}`);
            }}>
                <div className="title">   {value.title}  </div>
                <div className="body">   {value.postText}  </div>
                <div className="footer">   {value.username}  </div>
            </div> 
    );
})}
    </div>
  )
}

export default Home