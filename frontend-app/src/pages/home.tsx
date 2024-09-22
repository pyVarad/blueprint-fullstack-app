import { useEffect, useState } from 'react'
import Layout from '../container/basic/layout'
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';


/* Login */
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>
}

/* Logout */
const LogoutButton = () => {
    const { logout } = useAuth0();
    return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout </button>
}

function home() {
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
        <Layout>
            <div>
                {isAuthenticated ? <>
                    <p>{token}</p>
                    <LogoutButton />
                </> : <LoginButton />}
            </div>
        </Layout>
    )
}

export default home