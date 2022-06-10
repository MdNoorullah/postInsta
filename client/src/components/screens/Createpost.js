import React,{useState,useEffect} from 'react' 
//use effect come in pic when url of pic is updated
import {useNavigate } from 'react-router-dom'
import  M from 'materialize-css'
const Createpost=()=>{
    const navigate = useNavigate();
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl] =useState("")
    useEffect(()=>{
      if(url){
      fetch("/createpost",{
        method:"post",
        headers:{
          "content-Type":"application/json",
          "Authorization":'Bearer '+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          title,
          body,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"
          })
        }
        else{
          M.toast({html:"created post successfully",classes:"#689f38 light-green darken-2"})
          navigate('/');
        }
      }).catch(err=>{
        console.log(err);
      })
    }
    },[url])
    const postDetails=()=>{
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
    return(
        <div className='card input-filed'
        style={{
            margin:"20px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <input type="text" placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #2196f3 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file"
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                    
                </div>
                </div>
                <button className="btn waves-effect waves-light #2196f3 blue darken-1" 
                onClick={()=>postDetails()}
                >
                    Submit Post 
                </button>
        </div>
    )
}

export default Createpost