import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
// usecontext for user data
const Profile=()=>{
  
  const [image,setImage]=useState("")
  const [mypics,setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
     fetch("/myposts",{
      method:"get",
         headers:{
             "Authorization":'Bearer '+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
         //console.log(result)
         setPics(result.mypost)
     })
  },[])
  useEffect(()=>{
    if(image)
    {
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
       
        //console.log(data);
        //localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
        //dispatch({type:"UPDATEPIC"})
        fetch('/updatepic',{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            "Authorization":'Bearer '+localStorage.getItem("jwt")
           },
           body:JSON.stringify({
             pic:data.url
       })
        }).then(res=>res.json())
        .then(result=>{
          console.log(result)
          localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
          dispatch({type:"UPDATEPIC",payload:result.pic})
          window.location.reload();// without reloading it is giving error
        })
      // window.location.reload();// without reloading it is giving error
    })
    .catch(err=>{
        console.log(err);
    })
    }
  },[image])
const uploadPic= (file)=>{
  setImage(file) 
  }  
  return(
    
      <div style={{maxWidth:"550px",margin:"0px auto " }}>
      
           <div style={{
             margin:"18px 0px",
             borderBottom:"1px solid grey "
           }}>
             <div style={{
               display:'flex',
               justifyContent:'space-around',
              
           }}>
             <div>
             <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
             src={state?state.pic:"loading"}
             />
              
           </div>
           <div>
           <h4>{state?state.name:"loading"}</h4>
           <h5>{state?state.email:"loading"}</h5>
           <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
             <h6>{mypics.length} posts</h6>
             <h6>{state?state.followers.length:0} follower</h6>
             <h6>{state?state.following.length:0} following</h6>
           </div>
           </div>
        </div>
              
            <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn #2196f3 blue darken-1">
                    <span>Update Profile Pic</span>
                    <input type="file"
                    onChange={(e)=>uploadPic(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                    
                </div>
                </div>
            </div>
        <div className="gallery">
          {
            mypics.map(item=>{
              return(
                  <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
              )
            })
          }
       
      </div>
      </div>
  )
}

export default Profile