import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Post from './Pages/Post';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect} from 'react';
import axios from 'axios';
import PageNotFound from './Pages/PageNotFound';
import Profile  from './Pages/Profile';
import ChangePassword  from './Pages/ChangePassword';


function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/auth/auth", {
    headers: { 
      accessToken: localStorage.getItem("accessToken"),
  },
})
.then((response) => {

      if(response.data.error) {
        setAuthState({ ...authState, status: false});
      }
      else{
      setAuthState({
        username: response.data.username,
        id: response.data.id,
        status: true,
      });
      }
    });
  }, []);


  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false
    });
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div className="App">   
    <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
        <div className='navbar'>
        <div className='links'>
     
        {!authState.status ? (
          <>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
          </>
        ) : (
          <>
          <Link to="/">Homepage</Link>
          <Link to="/createpost"> Create a Post</Link>
          </>
        )}
        </div>
      <div className="loggedInContainer">
        <h1> {authState.username} </h1>
        {authState.status && <button onClick={logout}> Logout</button>}
        </div>
      </div>
          <Routes>
                <Route path="/" exact Component={Home}  />
                <Route path="/createpost" exact Component={CreatePost}  /> 
                <Route path="/post/:id" exact Component={Post}  /> 
                <Route path="/login" exact Component={Login}  />
                <Route path="/registration" exact Component={Registration}  />
                <Route path="/registration" exact Component={Registration}  />
                <Route path="/changepassword" exact Component={ChangePassword}  />
                <Route path="/profile/:id" exact Component={Profile}  />
                <Route path="*" exact Component={PageNotFound}  />
          </Routes>
          
        </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
