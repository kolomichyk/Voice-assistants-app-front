import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

export type CardProps = {
  id?: number,
  img?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  handleButtonClick: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({id, img, title, description, handleButtonClick}) => {
    <img src={img} alt="&&&" style={{ height: '200px' }}/>
    return (
      <div style = {{ marginLeft: "60px", maxWidth: "350px", height:"400px", textAlign:"center"}}>
        <Link to={`/details/${id}`}>
          <img src={img} alt="&&&" style={{ height: '200px' }}/>
          <p className="cardTitle" style={{ color:"white" }}>{title}</p>
        </Link>
        <Button style={{backgroundColor: "#F5001D", padding: "0 30px", marginLeft: "5px", borderColor: "#000", height: 40}} onClick={handleButtonClick}>Добавить</Button>
      </div>
    );
  };
  
  export default Card;