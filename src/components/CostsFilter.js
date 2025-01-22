


import './CostsFilter.css';

const CostsFilter = (props) => {
const yearChangeHandler = (event) => {
    console.log("Year selected:", event.target.value); // Проверяем, вызывается ли событие
    props.onChangeYear(event.target.value);
};

    return (
        <div className="costs-filter">
            <div className="costs-filter__control">
                <label>Filter by year</label>
                <select value={props.year} onChange={yearChangeHandler}>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
            </div>
        </div>
    );
};

export default CostsFilter;
