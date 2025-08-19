  import React, { lazy } from 'react'

  const MainRoutes = lazy(() => import('./pages'))

  const App = () => {
    return (
      <div>
        <MainRoutes />
      </div>
    )
  }

  export default React.memo(App)