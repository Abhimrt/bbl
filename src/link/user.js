    const host  = "http://localhost:5000/api/";
    export const create = async (props) => {
        let credentials = {
            "name": props.name,
            "password": props.password,
            "phone": props.phone,
            "pincode": props.pincode,
            "zone": props.zone,
        }
        let response = await fetch(`${host}/user/create`, {
            method: 'POST',
            header: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(credentials)
        })
        if (!response.success) {
            navigate('/login')
            return false
        }
        else {
            return response
        }
    }