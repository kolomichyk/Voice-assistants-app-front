import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/BreadScrumbs/BreadScrumbs';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

const HistoryPage: React.FC = () => {
    const [applications, setApplications] = useState([]);
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const [trigger, setTrigger] = useState(false);
    const isModerator = useSelector((state) => state.isModerator);

    const handleAccept = (applicationId: number) => {
        const currentDateTime = moment().toISOString();
        
        const data = {
            application_id: applicationId,
            status: "принято",
            completed_at: currentDateTime
        };
        
        axios({
            method: 'put',
            url: 'http://localhost:8000/applications/put/moderator/',
            data: data,
            withCredentials: true
        }).then((response) => {
            console.log(response.data);
            setTrigger(!trigger);
        }).catch((error) => {
            console.error('Error making PUT request:', error);
        });

        axios.post(`http://localhost:8000/actions/play/${applicationId}/`, {}, {});
    };  

    const handleDecline = (applicationId: number) => {
        console.log(`Application ${applicationId} accepted.`);
        const currentDateTime = moment().toISOString();
        
        const data = {
            application_id: applicationId,
            status: "отказано",
            completed_at: currentDateTime
        };
        
        axios({
            method: 'put',
            url: 'http://localhost:8000/applications/put/moderator/',
            data: data,
            withCredentials: true
        }).then((response) => {
            console.log(response.data);
            setTrigger(!trigger);
        }).catch((error) => {
            console.error('Error making PUT request:', error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/`, {
                withCredentials: true
                });
                const result = response.data;
                setApplications(result[0])
            } catch (error) {
                console.log("Error fetching data")
            }
        };
        fetchData();

        // const intervalId = setInterval(fetchData, 2000);
        // return () => clearInterval(intervalId);
    }, [trigger]);

    const handleDetails = (id) => {
        console.log(id);
        navigate(`/History/${id}`)
    };

   return (
       <div>
           <Header></Header>
           <table style={{margin: 'auto'}}>
               <thead>
                  <tr>
                      <th>ID заявки</th>
                      <th>Статус</th>
                      <th>Создана</th>
                      <th>Сформирована</th>
                      <th>Завершена</th>
                      <th>Подробная информация</th>
                      {isModerator &&(<th>Действия</th>)}
                  </tr>
               </thead>
               <tbody>
                    {applications.map((application) => (
                        <tr key={application.application_id} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                            <td>{application.application_id}</td>
                            <td>{application.status}</td>
                            <td>{application.created_at}</td>
                            <td>{application.formed_at}</td>
                            <td>{application.completed_at === application.created_at ? 'Пока пусто' : application.completed_at}</td>
                            <td><button onClick={() => handleDetails(application.application_id)}>Подробнее</button></td>
                            {isModerator &&(<td>
                                { application.status === "зарегистрирован" && (
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <button style={{backgroundColor: 'green'}} onClick={() => handleAccept(application.application_id)}>Принять</button>
                                    <button style={{backgroundColor: 'red'}} onClick={() => handleDecline(application.application_id)}>Отклонить</button>
                                </div>
                                )}
                            </td>
                            )}
                        </tr>
                    ))}
               </tbody>
           </table>
       </div>
   );
};

export default HistoryPage;

