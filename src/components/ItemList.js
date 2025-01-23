import './ItemList.css';
import Card from './Card';
import CostsFilter from './CostsFilter';
import React, { useState } from 'react';
import CostList from './CostList';
import CostDiagram from './CostDiagram';

function ItemList(props) {
    // Устанавливаем текущий год по умолчанию
    const currentYear = new Date().getFullYear().toString();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const yearChangeHandler = (year) => {
        console.log('Year updated in ItemList:', year); // Для отладки
        setSelectedYear(year); // Обновляем состояние
    };

    const filteredCosts = props.costs.filter((cost) => {
        const costDate = new Date(cost.date); // Преобразуем дату, если она строка
        return costDate.getFullYear().toString() === selectedYear;
    });

    return (
        <div>
            <Card className="costs">
                <CostsFilter year={selectedYear} onChangeYear={yearChangeHandler} />
                <CostDiagram costs={filteredCosts} />
            </Card>
            <CostList costs={filteredCosts} onDeleteCost={props.onDeleteCost} />
        </div>
    );
}

export default ItemList;
