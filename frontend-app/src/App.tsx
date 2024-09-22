import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Users from "./pages/test";




export default function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("")
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN_NAME;

      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `https://${domain}/api/v2/`
            },
          });

          setToken(accessToken);
          Cookies.set('token', token, { expires: 1, secure: true });
        } catch (e) {
          console.log(e);
        }
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}