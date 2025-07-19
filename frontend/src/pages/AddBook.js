// src/pages/AddBook.js
import { useState } from "react";
import API from "../services/api";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    category: "",
    totalCopies: "",
    availableCopies: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numericBook = {
        ...book,
        totalCopies: Number(book.totalCopies),
        availableCopies: Number(book.availableCopies),
      };

      await API.post("/books", numericBook);
      alert("Book added successfully!");
      setBook({
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        category: "",
        totalCopies: "",
        availableCopies: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add book");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        {[
          "title",
          "author",
          "isbn",
          "publisher",
          "category",
          "totalCopies",
          "availableCopies",
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={book[field]}
            onChange={handleChange}
            className="form-control mb-2"
            required={["title", "totalCopies", "availableCopies"].includes(
              field
            )}
          />
        ))}
        <button className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
