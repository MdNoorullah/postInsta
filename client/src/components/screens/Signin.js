import React,{useState,useContext} from "react"
import {Link,useNavigate } from 'react-router-dom'
import {UserContext} from '../../App'
import  M from 'materialize-css'
const Signin=()=>{
  const {state,dispatch}=useContext(UserContext)
  const navigate = useNavigate();
  const [Password,setPassword]=useState("")
  const [email,setEmail]=useState("")
    
  const PostData = ()=>{
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
      return
      }
      fetch("/signin",{
        method:'POST',
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({
          Password,
          email
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"
          })
        }
        else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          M.toast({html:"signed in successfully",classes:"#689f38 light-green darken-2"})
          navigate('/explore');
        }
      }).catch(err=>{
        console.log(err);
      })
    }
      return(
      <div className="mycard">
        
      <div className="card auth-card  input-field ">
      <h2 className="brand-logo">insta</h2>
      <input type="text" placeholder="Email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" placeholder="Password"
         value={Password}
         onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #2196f3 blue darken-1" 
onClick={()=>PostData()}
>
  Sign in
  </button>
  <h5>
    Don't have account?<Link to="/signup"><span id="light">Signup</span></Link>
  </h5>
        
      
    </div>
    </div>
    )
}

export default Signin
