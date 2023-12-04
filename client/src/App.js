import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Post from './Pages/Post';
import Registration from './Pages/Registration';
import Login from './Pages/Login';

function App() {

  return (
    <div className="App">   
        <Router>
        <div className='navbar'>
        <Link to="/">Homepage</Link>
        <Link to="/createpost"> Create a Post</Link>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
        </div>
          <Routes>
                <Route path="/" exact Component={Home}  />
                <Route path="/createpost" exact Component={CreatePost}  /> 
                <Route path="/post/:id" exact Component={Post}  /> 
                <Route path="/login" exact Component={Login}  />
                <Route path="/registration" exact Component={Registration}  />
          </Routes>

        </Router>

    </div>
  );
}

export default App;
