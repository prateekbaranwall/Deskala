import './App.css';
import Homepage from './component/HomePage/homepage'
import Login from './component/login/login'
import Sign_up from './component/sign_up/sign_up'
import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import Create from "./component/HomePage/create/create"
import Edit from "./component/HomePage/create/edit"

function App() {
  const [ user, setLoginUser] = useState({})
  const [contacts, setContacts] = useState([]);
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<Sign_up/>}/> 
         {user && user._id ? <Route path="/homepage" element={<Homepage/>} /> : <Route path="/homepage" element={<Login setLoginUser={setLoginUser}/>} />   }
         {user && user._id ? <Route path="/create" element={<Create setContacts={setContacts}/>} /> : <Route path="/homepage" element={<Login setLoginUser={setLoginUser}/>} />   }
        <Route path="/login" element={<Login setLoginUser={setLoginUser}/>} /> 
        <Route path="/edit/:id" element={<Edit/>}/> 
        {/* <Route path="/:id" element={<Edit/>}/>  */}
      </Routes>

    </div>
  );
}

export default App;
