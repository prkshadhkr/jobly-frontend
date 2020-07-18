import React, {useState, useEffect} from 'react';
// import { Cliploader } from 'react-spinners';
import { decode } from 'jsonwebtoken';
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from './Api';
import UserContext from './UserContext';
import Navbar from './Navbar';
import Routes from './Routes';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

export const TOKEN_IN_STORAGE = "jobly-token-secret";

function App() {
  const [ loaded, setLoaded ] = useState(false);
  const [ user, setUser ] = useState(null);
  // const [ token, setToken ] = useState(TOKEN_IN_STORAGE);
  const [token, setToken] = useLocalStorage(TOKEN_IN_STORAGE);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let resUser = await JoblyApi.getCurrentUser(username);
        setUser(resUser);
      } catch (e) {
        setUser(null);
      }
      setLoaded(true);
    }
    setLoaded(false);
    getCurrentUser();
  }, [token]);

  const handleLogOut = () =>{
    setUser(null);
    setToken(null);
  }

  if(!loaded){
    return(
      <div className="App">
          <h1>Loading ...</h1>
      </div>
    )
  }

  return (
    <div className="App">
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
     
        <Navbar handleLogout={handleLogOut}/>
        <Routes setToken={setToken} />

      </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
