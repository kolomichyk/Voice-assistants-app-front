import { FC, useState, useEffect } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import InputField from '../InputField/InputField'
// import './Header.css'
import Card from '../Card/Card';
export type itemProps = {
    action_id: number,
    title: string,
    description:string,
    img: string,
}

const Content: FC = () => {

    const [inputValue, setInputValue] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    const [data, setData] = useState([
        { action_id: 1, title: 'Узнать погоду', description: 'Просто скажите :" Узнать погоду в..."', img: '../../../public/img/first.jpg', status: 0},
        { action_id: 2, title: 'Поставить будильник', description: 'Просто скажите :" Поставь будильник на..."', img: '../../../public/img/second.jpg', status: 0},
        { action_id: 3, title: 'Включить музыку', description: 'Просто скажите :" Включи музыку или включи каку-то песню"', img: '../../../public/img/third.jpg', status: 0},
        { action_id: 4, title: 'Записать заметку', description: 'Просто скажите :" Запиши в заметки..."', img: '../../../public/img/fourth.jpg', status: 0}
    ])
    
    const handleDeleteItem = (id: number) => {
        const updatedData = data.map(item => {
            if (item.action_id === id) {
            return { ...item, status: 1 }; // Устанавливаем статус 1 для удаленного элемента
            }
            return item;
        });
        console.log(id)
        setData(updatedData);
    };
    
    const handleSearchButtonClick = () => {
        setSearchTerm(inputValue); // Обновление значения поиска при нажатии кнопки
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await 
                fetch('http://127.0.0.1:8000/actions/', {
                    method: "GET"
                });
                const result = await response.json();
                try {
                    result.map((item:itemProps)=>{
                        item.img= 'http://127.0.0.1:9000/actionsimages/'+`${item.title}.jpg`
                    })
                }   catch (error) {
                    console.log('Error fetching data:', error);
                }
                setData(result)
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        console.log(data);  
    }, []);

    return (
        <div className="content">
            <InputField inputValue={inputValue} handleInputChange={setInputValue} handleSearchClick={handleSearchButtonClick}/>
            <div className='cards' style={{ display: 'inline-flex', paddingLeft: "50px", width: "1250px", flexWrap: 'wrap', margin:"0, auto", marginTop:"50px"}}>
                {data
                .filter(item => searchTerm.trim() === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(item =>
                    item.status === 0 && <Card id={item.action_id} title={item.title} description={item.description} img={item.img} handleDeleteButtonClick={() => handleDeleteItem(item.action_id)} key={item.action_id}/>
                )}
            </div>
        </div>
    )

    
}

export default Content