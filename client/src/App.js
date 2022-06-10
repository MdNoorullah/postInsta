import React,{useEffect,createContext,useReducer, useContext} from 'react';
import NavBar from './components/navbar';
import "./App.css"
import {BrowserRouter,Routes,Route,Switch,useNavigate} from "react-router-dom"

import Explore from './components/screens/explore'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Createpost from './components/screens/Createpost'
import UserProfile from './components/screens/UserProfile'
import {initialState, reducer} from './reducers/userReducer'
import Home from './components/screens/home'
export const UserContext=createContext()
 
const Routing= ()=>{
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    // as user is if type string so we parsed in object by JSON.parse
    if(user){
      dispatch({type:"USER",payload:user})
      //navigate('/') //as user can see profile
    }
    else{
      navigate('/signin')
    }
  },[])
  return(
    <>
    <Routes>
    <Route exact path="/explore" element={<Explore />} > </Route>
    <Route exact path="/followingPost" element={<Home />} > </Route>
    <Route exact path="/signin" element={<Signin />} ></Route>
    <Route exact path="/signup" element={<Signup />} ></Route>
    <Route exact path="/profile" element={<Profile />} ></Route>
    <Route exact path="/" element={<Explore />} />
    <Route  path="/profile/:userid" element={<UserProfile />} ></Route>
    <Route exact path="/Createpost" element={<Createpost />} ></Route>
    </Routes>

    </>
  )
}

function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
     <NavBar />
     <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
