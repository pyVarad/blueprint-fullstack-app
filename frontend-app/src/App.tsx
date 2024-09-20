import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>
}

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout </button>
}


export default function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <img src={user!.picture} alt={user!.name} />
          <h2>{user!.name}</h2>
          <p>{user!.email}</p>
          <LogoutButton />
        </div>
      ) :
        (
          <div>
            isAuthenticated: {isAuthenticated}
            <LoginButton />
          </div>
        )}
    </div>
  )
}