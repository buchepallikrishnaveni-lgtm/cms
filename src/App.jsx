import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setPage("dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!signupName || !signupEmail || !signupPassword) {
      alert("Please fill all fields");
      return;
    }

    alert("Account created successfully!");
    setPage("login");
  };

  const handleArticle = (e) => {
    e.preventDefault();

    if (!title || !author || !category || !content) {
      alert("Please fill all article fields");
      return;
    }

    if (editingId) {
      setArticles(
        articles.map((article) =>
          article.id === editingId
            ? {
                ...article,
                title,
                author,
                category,
                content,
              }
            : article
        )
      );

      setEditingId(null);
    } else {
      const newArticle = {
        id: Date.now(),
        title,
        author,
        category,
        content,
      };

      setArticles([...articles, newArticle]);
    }

    setTitle("");
    setAuthor("");
    setCategory("");
    setContent("");
  };

  const handleEdit = (article) => {
    setTitle(article.title);
    setAuthor(article.author);
    setCategory(article.category);
    setContent(article.content);
    setEditingId(article.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const logout = () => {
    setUsername("");
    setPassword("");
    setPage("login");
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  if (page === "signup") {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h1>Create Account</h1>
          <p>Content Management System</p>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <button type="submit">Sign Up</button>
          </form>

          <p className="switch-text">
            Already have an account?
            <button
              className="link-button"
              onClick={() => setPage("login")}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h1>Welcome Back</h1>
          <p>Login to Content Management System</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>

          <p className="switch-text">
            Don't have an account?
            <button
              className="link-button"
              onClick={() => setPage("signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <div>
          <h1>Content Management System</h1>
          <p>Welcome, {username}</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <main>
        <section className="form-card">
          <h2>{editingId ? "Edit Article" : "Create Article"}</h2>

          <form onSubmit={handleArticle}>
            <input
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              placeholder="Write your article..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <button type="submit">
              {editingId ? "Update Article" : "Add Article"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setAuthor("");
                  setCategory("");
                  setContent("");
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        <section className="articles-section">
          <div className="article-heading">
            <h2>Articles</h2>

            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredArticles.length === 0 ? (
            <div className="empty">
              <h3>No Articles Found</h3>
              <p>Create your first article above.</p>
            </div>
          ) : (
            <div className="article-grid">
              {filteredArticles.map((article) => (
                <div className="article-card" key={article.id}>
                  <h3>{article.title}</h3>

                  <p className="article-info">
                    By {article.author} | {article.category}
                  </p>

                  <p>{article.content}</p>

                  <div className="actions">
                    <button onClick={() => handleEdit(article)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;