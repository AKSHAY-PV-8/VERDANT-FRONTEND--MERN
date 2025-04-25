import { useState } from "react";
import axios from "axios";

const AddAdvisor = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post(`${ServerURL}/api/about/createAdvisor`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Advisor added successfully!");
      setName("");
      setRole("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding advisor:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Advisor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Role" className="input" value={role} onChange={(e) => setRole(e.target.value)} required />
        <textarea placeholder="Description" className="input" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" className="input" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddAdvisor;
