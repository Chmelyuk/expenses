

import { useState } from 'react';
import CostForm from './CostForm';
import './NewCost.css'


const NewCost = (props) =>{
    const [isFormVisible, setVisible] =  useState(false);

   const saveCostDataHandler =(inputCostData) => {
    const costData = {
        ...inputCostData,
        id: Math.random().toString()
    }
       
        props.onAddCost(costData);
        setVisible(false);
   }

   const inputCostDataHandler = () => {
    setVisible(true);
   }

   const cancelCostHandler = () => {
    setVisible(false);
   }
    return(
        <div className="new-cost">
            {!isFormVisible &&
            <button onClick={inputCostDataHandler}>Add new consumption</button>}
             {isFormVisible && <CostForm onSaveCostData={saveCostDataHandler} onCancel={cancelCostHandler} />}
        </div>

    )
}


export default NewCost;