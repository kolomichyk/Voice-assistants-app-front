import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Header/Header';
import './DraftPage.css'
export type ActionsApplicationsProps = {
    id: number,
    type_action: string,
    description:string,
    action_id: number,
    application_id: number,
}

const DraftPage: FC = () => {
    const dispatch = useDispatch();

    const draft_id = useSelector((state) => state.draft_id);

    const [actions, setActions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/applications/${draft_id}/`, {
                   withCredentials: true
                });
                const result = response.data;
                setActions(result)
                console.log(result)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        dispatch({ type: "UPDATE_DRAFT_ID", payload: -1 })
    }, []);

    return (
        <div>
            <Header>
            </Header>
            <div className='Table'>
                <table>
                    <thead>
                        <tr>
                        <th>Action_id</th>
                        <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actions.map((action:ActionsApplicationsProps) => (
                        <tr key={action.id}>
                            <td>{action.action_id}</td>
                            <td>{action.description}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
 }
 export default DraftPage;