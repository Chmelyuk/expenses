import "./CostItem.css";
import CostDate from "./CostDate";
import Card from "./Card";
 


function CostItem(props) {
    const deleteHandler = () => {
        props.onDelete(props.id);
    };

return  (   
<li>
<Card className="cost-item">
    <CostDate date={props.date}/>
<div className="cost-item__description">
    <h2>{props.description}</h2>
  
    </div>
     <div className="cost-item__price">${props.price}
     </div>
     <div className="cost-item__delete"><button onClick={deleteHandler}>Delete</button>
     </div>
    </Card>
</li>
);
}
 


export default CostItem;

