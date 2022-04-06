const host = "http://localhost:5001/api/";
const create = async (props) => {
  let credentials = {
    name: props.name,
    password: props.password,
    phone: props.phone,
    pincode: props.pincode,
    zone: props.zone,
  };
  let response = await fetch(`${host}user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  let res = await response.json();
  console.log(res);
  if (!res.success) {
    alert(res.error);
  } else {
    alert("done");
    localStorage.setItem("authtoken", res.authtoken);
  }
};

const login = async (props) => {
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
};

export default { create, login };
