const host = "http://localhost:5001/api/";

    //  create truck


const Create = async (props) => {
  let credentials = {
    name: props.name,
    password: props.password,
    truckID: props.truckID,
    zone:props.zone,
    pincode:props.pincode
  };
  let auth = localStorage.getItem('authtoken')
  if(!auth){
      alert('Please login')
      return false
  }
  let response = await fetch(`${host}driver/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":auth
    },
    body: JSON.stringify(credentials),
  });
  let res = await response.json();
  console.log(res);
  if (!res.success) {
    alert(res.error);
    return false
  } else {
    alert("done");
    return res.success
  }
};

//    Login Truck

const Login = async (props) => {
  let credentials = {
    password: props.password,
    truckID: props.truckID,
  };
  let response = await fetch(`${host}driver/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
     return res.success
   }
};

// Fetch driver details


const Fetchdriver = async () => {
  let auth = localStorage.getItem('authtoken')
  if (!auth) {
    alert('Please login')
    return false
  }
  let response = await fetch(`${host}driver/fetch`, {
    method: "POST",
    headers: {
      'auth-token': auth
    },
  });
  let res = await response.json();
  if (!res.success) {
    alert(res.error)
  } else {
    alert("done")
  }
  return res
};



export default { Create, Login,Fetchdriver };