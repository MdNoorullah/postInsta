import React,{useState,useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom'
import  M from 'materialize-css'

const Signup=()=>{
  const navigate = useNavigate();
  //to redirect 
  const [name,setName]= useState("")
  const [Password,setPassword]= useState("")
  const [email,setEmail]= useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState(undefined)
  const [Bio,setBio]=useState("")
useEffect(()=>{
  if(url){
    uploadFields()
  }
},[url])
  const uploadPic= ()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","dranm")
    fetch("https://api.cloudinary.com/v1_1/dranm/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
        setUrl(data.url)
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    })
  }
  const uploadFields= ()=>{
    // below is to check valid email or not using emailregex.com
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
    return
    }
    
    fetch('/signup',{
      method:"post",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        Password,
        email,
        pic:url
    })
    })
    .then(res=>res.json())
    .then(data=>{
     console.log(data)
      if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"
        })
      }
      else{
        M.toast({html:data.message,classes:"#689f38 light-green darken-2"})
        navigate('/signin');
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  const PostData = ()=>{
    if(image){
      uploadPic()
    }
    else{
      uploadFields()
    }
   
  }
    return(
      <div className="mycard">
        
      <div className="card auth-card  input-field">
      <h2 className="brand-logo">Insta</h2>
      <input type="text" placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
        <input type="text" placeholder="Email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" placeholder="Password"
         value={Password}
         onChange={(e)=>setPassword(e.target.value)}
        />
        <div className="file-field input-field">
                <div className="btn #2196f3 blue darken-1">
                    <span>Upload Profile Pic</span>
                    <input type="file"
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                    
                </div>
                </div>
        <button className="btn waves-effect waves-light #2196f3 blue darken-1"
        onClick={()=>PostData()}
       >
        Sign up
      </button>
      <h5>
    Have an account?<Link to="/signin"><span id="light">Signin</span></Link>
  </h5>
    </div>
    </div>
    )
}

export default Signup
