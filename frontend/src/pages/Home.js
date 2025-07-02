import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async (searchTerm = "") => {
    try {
      const res = await API.get(
        `/books${searchTerm ? `?title=${searchTerm}` : ""}`
      );
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to load books", err);
    }
  };

  useEffect(() => {
    fetchBooks(); // initial load
  }, []);

  const handleSearch = () => {
    fetchBooks(search); // pass the current search term
  };

  const issueBook = async (bookId) => {
    try {
      await API.post(`/transactions/issue/${bookId}`);
      alert("Book issued successfully!");
      fetchBooks(search); // refresh with current search filter
    } catch (err) {
      alert(err.response?.data?.message || "Issue failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Books</h2>

      {/* 🔍 Search */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 📚 Book List */}
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-3" key={book._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author} <br />
                  <strong>Category:</strong> {book.category || "N/A"} <br />
                  <strong>Available:</strong> {book.availableCopies}/
                  {book.totalCopies}
                </p>

                <button
                  className="btn btn-primary"
                  disabled={book.availableCopies < 1}
                  onClick={() => issueBook(book._id)}
                >
                  Issue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
