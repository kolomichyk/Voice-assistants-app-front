import { FC } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header: FC = () => {
 const dispatch = useDispatch();
 const draft_id = useSelector((state) => state.draft_id);
 const login = useSelector((state) => state.login);;
 const navigate = useNavigate();
 const handleLogout = async () => {
   try {
     axios({
       url: 'http://127.0.0.1:8000/logout/',
       method: 'POST',
       data: {
      },
       withCredentials: true
     });
     
     // Redirect to home page after successful logout
     navigate('/');
     dispatch({ type: "UPDATE_LOGIN", payload: "Гость" });
     dispatch({ type: "LOGGEDCHANGE", payload: false });

     Cookies.set("sessionid", '', {
        path: "/",
        expires: new Date(Date.now() - 10000000),
       });

   } catch (error) {
     console.error('Failed to logout', error);
   }
 };

 return (
   <div className='header'>
     <div className="contentHeader">
       <Link to={`/`} style={{marginRight: '300px'}}>
         <p className='buttonHeader'> Voice assistants!</p>
       </Link>
       <Link to={`/about`}>
         <p className='buttonHeader'> О нас</p>
       </Link>
       <p className='buttonHeader'>Контакты</p>
       <p className='buttonHeader'>Консультация</p>
       {draft_id !== -1 && (
         <Link to={`/Draft`}>
           <img src="../../../public/img/sales.png" alt="Sales" style={{height: '65px', paddingBottom: 15, paddingRight: 50}}/>
         </Link>
       )}
       <p className='buttonHeader'>{login}</p>
       <button style={{backgroundColor: "skyblue", padding: "0 30px", marginLeft: "5px", borderColor: "#000", height: 40}} onClick={handleLogout}>Выйти</button>
     </div>
   </div>
 )
}
export default Header;