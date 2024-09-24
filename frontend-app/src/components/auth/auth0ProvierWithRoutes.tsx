import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

 

export const Auth0ProviderWithNavigate = ({ children }: {children: React.ReactNode}) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: { returnTo: any; }) => {
    navigate(appState?.returnTo || window.location.pathname);
  };


  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN_NAME}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};