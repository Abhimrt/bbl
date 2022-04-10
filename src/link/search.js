const host = "http://localhost:5001/api/";

// Search user pincode/zone

const User = async (props)=>{
      let auth=localStorage.getItem('authtoken')
      if(!auth){
          alert('Please login')
          return false
      }
      let response = await fetch(`${host}user/${props.pincode}/${props.zone}`, {
        method: "GET",
        headers: {
          "auth-token":auth
        },
      });
      let res = await response.json();
       if (!res.success) {
         alert(res.error)
         return false
       } else {
         return res
       }
}


// Search driver pincode/zone

const Driver = async (props)=>{
      let auth=localStorage.getItem('authtoken')
      if(!auth){
          alert('Please login')
          return false
      }
      let response = await fetch(`${host}driver/${props.pincode}/${props.zone}`, {
        method: "GET",
        headers: {
          "auth-token":auth
        },
      });
      let res = await response.json();
       if (!res.success) {
         alert(res.error)
         return false
       } else {
         return res
       }
}


// Search request pincode/zone

const Request = async (props)=>{
      let auth=localStorage.getItem('authtoken')
      if(!auth){
          alert('Please login')
          return false
      }
      let response = await fetch(`${host}requests/${props.pincode}/${props.zone}`, {
        method: "GET",
        headers: {
          "auth-token":auth
        },
      });
      let res = await response.json();
       if (!res.success) {
         alert(res.error)
         return false
       } else {
         return res
       }
}


// Search request pincode/zone/date/time

const Datetime = async (props)=>{
      let auth=localStorage.getItem('authtoken')
      if(!auth){
          alert('Please login')
          return false
      }
      let response = await fetch(`${host}requests/${props.pincode}/${props.zone}/${props.date}/${props.time}`, {
        method: "GET",
        headers: {
          "auth-token":auth
        },
      });
      let res = await response.json();
       if (!res.success) {
         alert(res.error)
         return false
       } else {
         alert("done")
         return res
       }
}

const driverRequest = async (props)=>{
      let auth=localStorage.getItem('authtoken')
      if(!auth){
          alert('Please login')
          return false
      }
      let response = await fetch(`${host}driver/requests/all`, {
        method: "GET",
        headers: {
          "auth-token":auth
        },
      });
      let res = await response.json();
       if (!res.success) {
         alert(res.error)
         return false
       } else {
        //  alert("done")
         return res
       }
}
const userById =async (props)=>{
  let auth=localStorage.getItem('authtoken')
      if(!auth){
          alert('Please login')
          return false
      }
      let response = await fetch(`${host}user/${props.id}`, {
        method: "GET",
        headers: {
          "auth-token":auth
        },
      });
      let res = await response.json();
       if (!res.success) {
         alert(res.error)
         return false
       } else {
         alert("done")
         return res
       }
}

export default { User,Driver,Request,Datetime,driverRequest,userById};