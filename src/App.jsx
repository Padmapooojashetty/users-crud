import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const initialForm = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: ""
  };

  const [form, setForm] = useState(initialForm);

  // READ: fetch 10 users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) =>
        setUsers(
          data.slice(0, 10).map((u) => ({
            id: u.id,
            name: u.name,
            username: u.username,
            email: u.email,
            phone: u.phone,
            website: u.website,
            company: u.company.name
          }))
        )
      );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setUsers(users.map((u) => (u.id === editId ? { id: editId, ...form } : u)));
      setEditId(null);
    } else {
      const newUser = { id: users.length + 1, ...form };
      setUsers([...users, newUser]);
    }

    setForm(initialForm);
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company
    });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    if (editId === id) setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(initialForm);
  };

  const formFields = [
    { name: "name", placeholder: "Full Name" },
    { name: "username", placeholder: "Username" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "phone", placeholder: "Phone" },
    { name: "website", placeholder: "Website" },
    { name: "company", placeholder: "Company" }
  ];

  return (
    <div className="container">
      <h1>✨ Unique User Management App ✨</h1>

      <form className="form" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            required={field.name === "name" || field.name === "username" || field.name === "email"}
          />
        ))}

        <button type="submit" className="btn-submit">
          {editId ? "💾 Save Changes" : "➕ Add User"}
        </button>

        {editId && (
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            ❌ Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.website}</td>
              <td>{u.company}</td>
              <td>
                <button onClick={() => handleEdit(u)} className="btn-edit">✏️ Edit</button>
                <button onClick={() => handleDelete(u.id)} className="btn-delete">🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;