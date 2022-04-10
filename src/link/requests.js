const host = "http://localhost:5001/api/";

//    add a request

const Add = async (props) => {
  let credentials = {
    user:props.user,
    date:props.date,
    time:props.time,
    wasteType:props.wasteType,
    pincode:props.pincode,
    zone:props.zone,
    amount:props.amount
  };
  let auth=localStorage.getItem('authtoken')
  if(!auth){
      alert('Please login')
      return false
  }
  let response = await fetch(`${host}requests/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":auth
    },
    body: JSON.stringify(credentials),
  });
  let res = await response.json();

   if (!res.success) {
     alert(res.error)
     return false
   } else {
     alert("done")
     localStorage.setItem("authtoken", res.authtoken);
     return res
   }
};

//    edit a request

const Edit = async (props) => {
  let credentials = {}
    if(props.date){credentials.date=props.date}
    if(props.time){credentials.time=props.time}
    if(props.wasteType){credentials.wasteType=props.wasteType}
    if(props.pincode){credentials.pincode=props.pincode}
    if(props.zone){credentials.zone=props.zone}
    if(props.amount){credentials.zone=props.amount}
  let auth=localStorage.getItem('authtoken')
  if(!auth){
      alert('Please login')
      return false
  }
  let response = await fetch(`${host}requests/edited/${props.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":auth
    },
    body: JSON.stringify(credentials),
  });
  let res = await response.json();
   if (!res.success) {
     alert(res.error)
     return false
   } else {
     alert("done")
     localStorage.setItem("authtoken", res.authtoken);
     return res
   }
};

//  Delete a request

const Del = async (props) => {
  let auth=localStorage.getItem('authtoken')
  if(!auth){
      alert('Please login')
      return false
  }
  let response = await fetch(`${host}requests/delete/${props.id}`, {
    method: "DELETE",
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
     localStorage.setItem("authtoken", res.authtoken);
     return res
   }
};

export default { Add,Edit,Del };