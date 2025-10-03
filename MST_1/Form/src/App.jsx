import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from "react-dom/client";
import "./App.css"; // import the CSS file

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", course: "" });
  const [entries, setEntries] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.course) return;
    setEntries([...entries, formData]);
    setFormData({ name: "", email: "", course: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center p-6">
      {/* Form Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Student Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col items-center">
  <input
    type="text"
    name="name"
    placeholder="Enter Name"
    value={formData.name}
    onChange={handleChange}
    className="w-3/4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
  />
  <input
    type="email"
    name="email"
    placeholder="Enter Email"
    value={formData.email}
    onChange={handleChange}
    className="w-3/4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
  />
  <input
    type="text"
    name="course"
    placeholder="Enter Course"
    value={formData.course}
    onChange={handleChange}
    className="w-3/4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
  />
  <button
    type="submit"
    className="w-3/4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition duration-300 shadow-lg"
  >
    Submit
  </button>
</form>

      </div>

      {/* Entries Table */}
      {entries.length > 0 && (
        <div className="mt-10 w-full max-w-3xl">
          <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">Submitted Entries</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-purple-200">
                <tr>
                  <th className="py-3 px-6 border">Name</th>
                  <th className="py-3 px-6 border">Email</th>
                  <th className="py-3 px-6 border">Course</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="bg-white hover:bg-purple-50 transition">
                    <td className="py-2 px-6 border">{entry.name}</td>
                    <td className="py-2 px-6 border">{entry.email}</td>
                    <td className="py-2 px-6 border">{entry.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
