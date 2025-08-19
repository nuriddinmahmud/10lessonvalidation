import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Header = lazy(() => import('../../components/header/Header'))

const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default React.memo(Layout)
