import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PageLoader } from "../pageLoader/pageLoader";
import Layout from "../../container/basic/layout";

export const AuthenticationGuard = ({ component }: { component: any }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="page-layout">
                <PageLoader />
            </div>
        ),
    });

    return <Layout>
        <Component />
    </Layout>;
};