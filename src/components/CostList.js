

import CostItem from "./CostItem";
import './CostList.css';
import { supabase } from '../supabaseClient'; // импортируем supabase для получения текущего пользователя
import { useState,useEffect } from "react";

const CostList = (props) => {
  const [userId, setUserId] = useState(null);

  // Получаем текущего пользователя
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser(); // Получаем пользователя
      setUserId(user?.data?.user?.id); // Сохраняем user_id
    };
    getUser();
  }, []); // Выполняем это только один раз при монтировании компонента

  // Фильтрация расходов по user_id
  const filteredCosts = props.costs.filter(cost => cost.user_id === userId);

  const deleteCostHandler = (costId) => {
    props.onDeleteCost(costId);
  };

  if (filteredCosts.length === 0) {
    return <h2 className="cost-list__fallback">No data available</h2>; // или другой подходящий компонент
  }

  return (
    <ul className="cost-list">
      {filteredCosts.map((cost) => (
        <CostItem
          key={cost.id}
          date={cost.date}
          description={cost.description}
          price={cost.price}
          id={cost.id}
          onDelete={deleteCostHandler}
        />
      ))}
    </ul>
  );
};

export default CostList;
