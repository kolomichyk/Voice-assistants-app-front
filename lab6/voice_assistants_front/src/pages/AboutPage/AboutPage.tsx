import { FC, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/BreadScrumbs/BreadScrumbs';

const AboutPage: FC = () => {

    const action_id = useParams().action_id

    return (
        <div className='mainPage'>
            <div className='mainPageWrapper'>
                <Header/>
                <Breadcrumbs/>
                <h1 style={{marginTop: '35px', marginLeft: '30px'}}> Эта лабораторная посвящена знакомству с фронтом на React </h1>
            </div>
            
        </div>
    )
}

export default AboutPage