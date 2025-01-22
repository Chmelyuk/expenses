import { useState, useEffect } from "react";
import NewCost from "./components/NewCost/NewCost";
import ItemList from "./components/ItemList";
import { supabase } from './supabaseClient';
import Auth from "./components/Auth";

function App() {
  const [costs, setCosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          return;
        }

        const currentUser = sessionData?.session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          fetchCosts(currentUser.id);
        }

        // Подписка на изменения сессии
        supabase.auth.onAuthStateChange((event, session) => {
          const updatedUser = session?.user || null;
          setUser(updatedUser);

          if (updatedUser) {
            fetchCosts(updatedUser.id);
          } else {
            setCosts([]); // Очищаем данные при разлогине
          }
        });
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    initializeUser();
  }, []);

  const fetchCosts = async (userId) => {
    try {
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const { data, error } = await supabase
        .from("costs")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching costs:", error);
        return;
      }

      const transformedData = data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
      setCosts(transformedData);
    } catch (error) {
      console.error("Error in fetchCosts:", error);
    }
  };

  const addCostHandler = async (cost) => {
    try {
      const { error } = await supabase.from("costs").insert({
        user_id: user.id,
        description: cost.description,
        price: cost.price,
        date: cost.date.toISOString(),
      });

      if (error) {
        console.error("Error adding cost:", error);
        return;
      }

      fetchCosts(user.id);
    } catch (error) {
      console.error("Error in addCostHandler:", error);
    }
  };

  const deleteCostHandler = async (costId) => {
    try {
      const { error } = await supabase.from("costs").delete().eq("id", costId);

      if (error) {
        console.error("Error deleting cost:", error);
        return;
      }

      fetchCosts(user.id);
    } catch (error) {
      console.error("Error in deleteCostHandler:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error logging out:", error);
        return;
      }

      setUser(null);
      setCosts([]);
    } catch (error) {
      console.error("Error in handleLogout:", error);
    }
  };

  return (
    <div>
      {user && (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
      {!user && <Auth />}
      {user && (
        <>
          <NewCost onAddCost={addCostHandler} />
          <ItemList costs={costs} onDeleteCost={deleteCostHandler} />
        </>
      )}
    </div>
  );
}

export default App;
