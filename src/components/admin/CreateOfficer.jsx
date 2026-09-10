import { useState } from "react";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const CreateOfficer = ({ departments, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department_id: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("access_token");

            const response = await fetch(
                `${API_BASE_URL}/admin/officers`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        department_id: Number(formData.department_id),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Failed to create officer"
                );
            }

            setMessage("Officer created successfully.");

            setFormData({
                name: "",
                email: "",
                password: "",
                department_id: "",
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-t border-orange-100 bg-[#FFFCF9] p-6">
            <h3 className="text-lg font-bold text-slate-900">
                Create New Officer
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                Add a new officer and assign them to a department.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-5 grid gap-4 md:grid-cols-2"
            >
                {/* Name */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Officer name"
                        required
                        className="w-full rounded-lg border border-orange-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="officer@example.com"
                        required
                        className="w-full rounded-lg border border-orange-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                        minLength={6}
                        className="w-full rounded-lg border border-orange-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                </div>

                {/* Department */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Department
                    </label>

                    <select
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-orange-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    >
                        <option value="">
                            Select department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Messages */}
                {message && (
                    <div className="md:col-span-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Button */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Officer"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateOfficer;