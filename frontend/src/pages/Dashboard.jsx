import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext.jsx";

import api from "../utils/axios.js";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user?.role === "admin") {
          const { data } = await api.get("/dashboard");

          setStats(data);
        } else {
          const { data } = await api.get("/issues");

          setIssues(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      loadData();
    }
  }, [user]);

  return (
    <main className="container">
      <h1>Welcome, {user?.name}</h1>

      {user?.role === "admin" ? (
        <section className="stats">
          {stats &&
            Object.entries(stats).map(([key, value]) => (
              <div className="stat card" key={key}>
                <span>{key}</span>

                <strong>{value}</strong>
              </div>
            ))}
        </section>
      ) : (
        <section className="card">
          <h2>My Library</h2>

          <p>
            Active books:{" "}
            {issues.filter((issue) => issue.status === "issued").length}
          </p>

          <p>Total records: {issues.length}</p>
        </section>
      )}
    </main>
  );
}
