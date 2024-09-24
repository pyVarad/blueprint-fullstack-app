import { LoginButton } from "./loginButton";
import { LogoutButton } from "./logoutButton";
import { SignUpButton } from "./signUpButton";
import { useAuth0 } from "@auth0/auth0-react";

export const NavBarButtons = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="nav-bar__buttons">
            {!isAuthenticated && (
                <>
                    <span className="px-4">
                        <SignUpButton />
                    </span>
                    <span className="px-4">
                        <LoginButton />
                    </span>
                </>
            )}
            {isAuthenticated && (
                <>
                    <LogoutButton />
                </>
            )}
        </div>
    );
};