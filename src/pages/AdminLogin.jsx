
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//import Footer from "../components/Footer";
export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await fetch("https://vi-code.onrender.com/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("adminToken", data.token);
                alert("✅ Login successful");
                navigate("/dashboard");
            } else {
                alert(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("❌ Failed to connect to the server.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e2e8f0] via-[#f0f4f8] to-[#cbd5e1] text-black font-['BIANKA']">

            {/* Header Section */}
            <div className="flex-grow flex items-center justify-center">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg p-10 border border-gray-200 transition
                    hover:shadow-2xl hover:border-blue-400 w-full max-w-lg"
                >

                    <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#374151] text-transparent bg-clip-text">
                        🔑 Admin Login
                    </h1>

                    <div className="space-y-6">
                        
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogin}
                            className="w-full bg-[#029193] text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-lg"
                        >
                            🚀 Login
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            
        </div>
    );
}
