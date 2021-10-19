import './styles/App.css';
import AppRoutes from './routes'
import PageLoader from './components/ui/Loader/PageLoader'
import { useSelector } from 'react-redux';

const App = ()=>{
  const loading = useSelector(state => state.loadingReducer.loading)

  return (
    <>
      {loading && <PageLoader loading={loading}/>}
      <AppRoutes />
    </>
  );
}

export default App;
