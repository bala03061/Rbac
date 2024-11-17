import React, { useState } from "react";
import "./AddEmployee.css";

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: "",
        employeeId: "",
        username: "",
        password: "",
        role: "manager",
        permissions: {
            canView: false,
            canCreate: false,
            canEdit: false,
            canDelete: false,
        },
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                permissions: { ...prev.permissions, [name]: checked },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/employees/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="add-employee-container" onSubmit={handleSubmit}>
            <h1 className="add-employee-title">Add Employee</h1>
            <input
                type="text"
                name="name"
                className="add-employee-input"
                placeholder="Name"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="employeeId"
                className="add-employee-input"
                placeholder="Employee ID"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="username"
                className="add-employee-input"
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                className="add-employee-input"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <select
                name="role"
                className="add-employee-select"
                onChange={handleChange}
            >
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
                <option value="designer">Designer</option>
                <option value="management">Management</option>
            </select>
            <div className="add-employee-permissions">
                <label className="add-employee-label">
                    <input type="checkbox" name="canView" onChange={handleChange} /> Can View
                </label>
                <label className="add-employee-label">
                    <input type="checkbox" name="canCreate" onChange={handleChange} /> Can Create
                </label>
                <label className="add-employee-label">
                    <input type="checkbox" name="canEdit" onChange={handleChange} /> Can Edit
                </label>
                <label className="add-employee-label">
                    <input type="checkbox" name="canDelete" onChange={handleChange} /> Can Delete
                </label>
            </div>
            <button type="submit" className="add-employee-button">
                Submit
            </button>
        </form>
    );
};

export default AddEmployee;
