import './styles/App.css';
import { AppStoreContext } from './store-config/context/AppStoreContext';
import { createAppStore } from './store-config/mobx';
import { configure } from 'mobx'
import { observer } from 'mobx-react-lite'
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/styles';
import AppRoutes from './routes';
import PageLoader from './components/ui/Loader/PageLoader';
import { useEffect } from 'react';
import { Toaster } from './components/ui/Toaster/Toaster';

configure({ enforceActions: 'always' })

export const App = observer(()=>{
  const appStore = createAppStore()
  const { apiLoader, toaster, login } = appStore

  useEffect(()=>{
    if(localStorage.getItem("authtoken")){
      login.setLoggedIn(true)
    }
  }, [login])

  return (
    <AppStoreContext.Provider value={appStore}>
      <ThemeProvider theme={theme}>
        <Toaster message={toaster.message} type={toaster.type} />
        <PageLoader loading={apiLoader.loading.page} />
        <AppRoutes />
      </ThemeProvider>
    </AppStoreContext.Provider>
  )
})
