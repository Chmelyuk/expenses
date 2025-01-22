import { useState } from 'react';
import './CostForm.css';

const CostForm = (props) => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        if (price <= 0) {
            alert("Price must be greater than zero.");
            return;
        }
        const costData = {
            description: description,
            price: parseFloat(price),
            date: new Date(date)
        };
        props.onSaveCostData(costData);
        setDescription('');
        setPrice('');
        setDate('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-cost__controls">
                <div className="new-cost__control">
                    <label>Name</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                   
                </div>
                <div className="new-cost__control">
                    <label>Price</label>
                    <input type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="new-cost__control">
                    <label>Date</label>
                    <input type="date" min="2022-01-01" max="2025-12-31" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="new-cost__actions">
                    <button type="submit">Add consumption</button>
                    <button type="button" onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default CostForm;