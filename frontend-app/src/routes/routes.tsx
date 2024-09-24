import React from 'react'
import { AuthenticationGuard } from '../components/auth/auth0Guards'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { ProfilePage } from '../pages/profile'
import { LoginPage } from '../pages/login'
import Layout from '../container/basic/layout'
import { NotFoundPage } from '../pages/notfound'

export const RenderRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthenticationGuard component={HomePage} />} />
            <Route path="/profile" element={<AuthenticationGuard component={ProfilePage} />} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
