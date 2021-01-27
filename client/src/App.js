import Loader from './components/Loader';

import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth.hook';
import { useRoutes } from './routes';
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "./hooks/http.hook";
import { setMyData } from "./redux/actions/setMyData";

import './App.css';


const App = () => {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuth = !!token


  const routes = useRoutes(isAuth, userId, token,)

  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuth,
    }}>
      <div>
        {routes}
      </div>
    </AuthContext.Provider>
  )
}

export default App;
