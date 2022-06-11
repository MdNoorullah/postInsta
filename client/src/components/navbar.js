import React,{useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../App'
const NavBar=()=>{
  const navigate = useNavigate();
     const {state,dispatch}=useContext(UserContext)
     const renderList=()=>{
       if(state){
         return [
          <li key="3"><Link to="/followingPost"><i className="material-icons" >favorite</i></Link></li>,
          <li key="1"><Link to="/createpost"><i className="material-icons" style={{color:""}}>add_box</i> </Link></li>,
          <li key="2"><Link to="/explore"><i className="material-icons" >explore</i></Link></li>,
          
          <li key="7"><Link to="/profile"><i className="material-icons" >account_circle</i></Link></li>,
          <li key="4">
            <button className="btn waves-effect waves-light #dd2c00 deep-orange accent-4" 
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                navigate('/signin');
                window.location.reload();
              }}
            >
              Log out
            </button>
          </li>
         ]
       }
       else{
         return[
          <li key="5"><Link to="/signin">Signin</Link></li>,
          <li key="6"><Link to="/signup">Signup</Link></li>
         ]
       }

     }
    return(
        <nav>
    <div className="nav-wrapper white" >
      <Link to={state?"/":"/signin"} className="brand-logo left">Insta</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}
        {/* in place of anchor tag a and href use link in a anf to in href */}
      </ul>
    </div>
  </nav>
    )
}


export default NavBar
