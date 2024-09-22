import { useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

function Users() {
    const token = Cookies.get("token")
    useEffect(() => {
        axios.defaults.withCredentials = false;
        axios.get('http://localhost:8000/api/private', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then(response => console.log(response.data))
          .catch(error => console.error(error));
    }, [])


  return (
    <div>test</div>
  )
}

export default Users