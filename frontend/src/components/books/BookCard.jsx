export default function BookCard({ book }) {
  return (
    <article className="card">
      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong> {book.author}
      </p>

      <p>
        <strong>ISBN:</strong> {book.ISBN}
      </p>

      <p>
        <strong>Category:</strong> {book.category}
      </p>

      <p>{book.description}</p>

      <p className={book.availableCopies > 0 ? "available" : "unavailable"}>
        Available: {book.availableCopies}
        {" / "}
        {book.totalCopies}
      </p>
    </article>
  );
}
