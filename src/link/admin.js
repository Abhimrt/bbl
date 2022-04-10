const host = "http://localhost:5001/api/";

    // Login Admin

    
const Login = async (props) => {
  let credentials = {
    password: props.password,
    email: props.email,
  };
  let response = await fetch(`${host}admin/login`, {
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
     return res
   }
};

 // Fetch user details


 const Fetchadmin = async () => {
  let auth=localStorage.getItem('authtoken')
    if(!auth){
        alert('Please login')
        return false
    }
  let response = await fetch(`${host}admin/fetch`, {
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



export default { Login,Fetchadmin };