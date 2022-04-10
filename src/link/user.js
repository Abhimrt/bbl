const host = "http://localhost:5001/api/";

//  Create user


const Create = async (props) => {
  let credentials = {
    name: props.name,
    password: props.password,
    phone: props.phone,
    pincode: props.pincode,
    zone: props.zone,
    latitude: props.latitude,
    longitude: props.longitude
  };
  let response = await fetch(`${host}user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  let res = await response.json();
  if (!res.success) {
    alert(res.error);
  } else {
    alert("done");
  }
  return res
};

// Login User

const Login = async (props) => {
  let credentials = {
    password: props.password,
    phone: props.phone,
  };
  let response = await fetch(`${host}user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  let res = await response.json();
  if (!res.success) {
    alert(res.error)
  } else {
    alert("done")
    localStorage.setItem("authtoken", res.authtoken);
  }
  return res.success
};


// pending requests


const pending = async () => {
  let auth = localStorage.getItem('authtoken')
  if (!auth) {
    alert('Please login')
    return false
  }
  let response = await fetch(`${host}requests/pending`, {
    method: "GET",
    headers: {
      'auth-token': auth
    },
  });
  let res = await response.json();
  console.log(res)
  if (!res.success) {
    alert(res.error)
  } else {
    // alert("done")
  }
  return res
};


// Fetch user details


const Fetchuser = async () => {
  let auth = localStorage.getItem('authtoken')
  if (!auth) {
    alert('Please login')
    return false
  }
  let response = await fetch(`${host}user/fetch`, {
    method: "POST",
    headers: {
      'auth-token': auth
    },
  });
  let res = await response.json();
  if (!res.success) {
    alert(res.error);
    
  } else {
    alert("done")
  }
  return res
};


export default { Create, Login, pending, Fetchuser };
