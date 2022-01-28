import { Home } from './features/home/Home';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Detail } from './features/detail/Detail';
import { useEffect } from 'react';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/home/' element={  <Home />} />
          <Route path='/home/:searchUrl' element={<Home />} />
          <Route path='/detail/:searchUrl/:movie/:moovieId' element={<Detail />} />
        </Routes>
      </Router>
  );
}

export function Root() 
{
  let navigate = useNavigate();

  useEffect(() => {
    navigate(`/home`)
  });

  return (<></>)
}

export default App;
