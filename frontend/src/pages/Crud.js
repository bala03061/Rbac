import React, { useState, useEffect } from "react";

const Crud = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [permissions, setPermissions] = useState({
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
    });

    useEffect(() => {
        // Fetch user permissions
        const token = localStorage.getItem("token");
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
        setPermissions(decodedToken.permissions);

        // Fetch existing items
        if (decodedToken.permissions.canView) {
            fetchItems();
        }
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/items");
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!permissions.canCreate) {
            alert("You do not have permission to create items.");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/items/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert(data.message);
            fetchItems(); // Refresh the item list
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!permissions.canDelete) {
            alert("You do not have permission to delete items.");
            return;
        }
        try {
            await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div>
            <h2>CRUD Operations</h2>
            {permissions.canCreate && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Item Description"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Item</button>
                </form>
            )}
            {permissions.canView && (
                <ul>
                    {items.map((item) => (
                        <li key={item._id}>
                            {item.name} - {item.description}
                            {permissions.canEdit && <button>Edit</button>}
                            {permissions.canDelete && (
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Crud;
