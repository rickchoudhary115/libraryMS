export default function IssueTable({ issues, admin = false, onReturn }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Book</th>

            <th>Member</th>

            <th>Issue Date</th>

            <th>Due Date</th>

            <th>Return Date</th>

            <th>Status</th>

            <th>Fine</th>

            {admin && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id}>
              <td>{issue.book?.title}</td>

              <td>{issue.member?.name}</td>

              <td>{new Date(issue.issueDate).toLocaleDateString()}</td>

              <td>{new Date(issue.dueDate).toLocaleDateString()}</td>

              <td>
                {issue.returnDate
                  ? new Date(issue.returnDate).toLocaleDateString()
                  : "-"}
              </td>

              <td>{issue.status}</td>

              <td>₹{issue.fine}</td>

              {admin && (
                <td>
                  {issue.status === "issued" && (
                    <button
                      className="small"
                      onClick={() => onReturn(issue._id)}
                    >
                      Return
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
