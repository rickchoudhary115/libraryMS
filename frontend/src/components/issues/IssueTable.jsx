import { BookOpen, User, CheckCircle2, Clock, IndianRupee } from "lucide-react";

export default function IssueTable({ issues, admin = false, onReturn }) {
  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
    "
    >
      <div
        className="
        overflow-x-auto
      "
      >
        <table
          className="
          min-w-[850px]
          w-full
        "
        >
          <thead>
            <tr
              className="
              border-b
              border-slate-200
              bg-slate-50
            "
            >
              <th
                className="
                px-5
                py-4
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
              >
                Book
              </th>

              {admin && (
                <th
                  className="
                  px-5
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
                >
                  Member
                </th>
              )}

              <th
                className="
                px-5
                py-4
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
              >
                Issue Date
              </th>

              <th
                className="
                px-5
                py-4
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
              >
                Due Date
              </th>

              <th
                className="
                px-5
                py-4
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
              >
                Status
              </th>

              <th
                className="
                px-5
                py-4
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
              >
                Fine
              </th>

              {admin && (
                <th
                  className="
                  px-5
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
                >
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {issues.length === 0 ? (
              <tr>
                <td
                  colSpan={admin ? 7 : 5}
                  className="
                    px-6
                    py-16
                    text-center
                  "
                >
                  <BookOpen
                    size={35}
                    className="
                      mx-auto
                      text-slate-300
                    "
                  />

                  <p
                    className="
                    mt-3
                    text-sm
                    font-medium
                    text-slate-500
                  "
                  >
                    No issue records found
                  </p>
                </td>
              </tr>
            ) : (
              issues.map((issue) => (
                <tr
                  key={issue._id}
                  className="
                    border-b
                    border-slate-100
                    transition
                    hover:bg-slate-50
                  "
                >
                  <td className="px-5 py-4">
                    <div
                      className="
                      flex
                      items-center
                      gap-3
                    "
                    >
                      <div
                        className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-100
                        text-slate-600
                      "
                      >
                        <BookOpen size={17} />
                      </div>

                      <span
                        className="
                        max-w-48
                        truncate
                        text-sm
                        font-semibold
                        text-slate-800
                      "
                      >
                        {issue.book?.title || "Unknown book"}
                      </span>
                    </div>
                  </td>

                  {admin && (
                    <td className="px-5 py-4">
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                      "
                      >
                        <User
                          size={15}
                          className="
                            text-slate-400
                          "
                        />

                        <span
                          className="
                          text-sm
                          text-slate-600
                        "
                        >
                          {issue.member?.name || "-"}
                        </span>
                      </div>
                    </td>
                  )}

                  <td
                    className="
                    px-5
                    py-4
                    text-sm
                    text-slate-500
                  "
                  >
                    {new Date(issue.issueDate).toLocaleDateString()}
                  </td>

                  <td
                    className="
                    px-5
                    py-4
                    text-sm
                    text-slate-500
                  "
                  >
                    {new Date(issue.dueDate).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      ${
                        issue.status === "issued"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }
                    `}
                    >
                      {issue.status === "issued" ? (
                        <Clock size={13} />
                      ) : (
                        <CheckCircle2 size={13} />
                      )}

                      {issue.status}
                    </span>
                  </td>

                  <td
                    className="
                    px-5
                    py-4
                  "
                  >
                    <span
                      className="
                      inline-flex
                      items-center
                      gap-1
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                    >
                      <IndianRupee size={14} />

                      {issue.fine || 0}
                    </span>
                  </td>

                  {admin && (
                    <td className="px-5 py-4">
                      {issue.status === "issued" && (
                        <button
                          onClick={() => onReturn(issue._id)}
                          className="
                            rounded-lg
                            bg-slate-900
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-slate-700
                          "
                        >
                          Return
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
