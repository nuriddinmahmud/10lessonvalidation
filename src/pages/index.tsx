import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const Layout = lazy(() => import('./layout/Layout'))
const Register = lazy(() => import('./register/RegisterPage'))
const UsersView = lazy(() => import('./users/UsersPage'))

const MainRoutes = () => {
    return (
        <Suspense>
            {
                useRoutes(
                    [
                        {
                            path: '/', element: <Layout />, children: [
                                { index: true, element: <Register /> },
                                { path: 'users', element: <UsersView /> }
                            ]
                        }
                    ]
                )
            }
        </Suspense>
    )
}

export default React.memo(MainRoutes)