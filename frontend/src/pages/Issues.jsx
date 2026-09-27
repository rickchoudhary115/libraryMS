import { useEffect, useState } from "react";

import IssueTable from "../components/issues/IssueTable.jsx";

import api from "../utils/axios.js";

export default function Issues() {
  const [issues, setIssues] = useState([]);

  const loadIssues = async () => {
    try {
      const { data } = await api.get("/issues");

      setIssues(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <main className="container">
      <h1>My Issued Books</h1>

      <IssueTable issues={issues} />
    </main>
  );
}
