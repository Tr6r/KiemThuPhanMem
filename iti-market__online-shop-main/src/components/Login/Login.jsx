import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";

// import signal
import { authSignal } from "../../signals";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [CurrentPassVisibility, SetPassVisibility] = useState(false);
	const navigate = useNavigate(); //hook dieu huong

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// ⚡ gọi API login
			const res = await fetch("http://172.16.17.130:5555/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			console.log("Response status:", res.status);
			const data = await res.json();
			console.log("Response data:", data);

			if (!res.ok) {
				setMessage(data.message || "Đăng nhập thất bại");

				// ✅ Cập nhật signal khi login thành công
				
				return;
			}

			authSignal.value = {
				isLoggedIn: true,
				user: data.user, // lấy user từ backend trả về
			};
				setMessage("Login successful!");

				// ⚡ Cập nhật signal => user đã đăng nhập
				authSignal.value = data.user; // lưu thông tin user thay vì true

				// reset form
				setUsername("");
				setPassword("");

				// ⚡ điều hướng sang trang chủ
				setTimeout(() => navigate("/"), 1000);

		} catch (error) {
			console.error("Fetch error:", error);
			setMessage("Có lỗi xảy ra khi gọi API.");
		}
	};

	//password visibility function
	const togglePasswordVisibility = () => {
		SetPassVisibility(!CurrentPassVisibility);
	};

	return (
		<div className="admin-wrapper">
			<div className="container login-page">
				{/* <header>
				<img src="./favicon.svg" alt="Site-Logo" />
			</header> */}
				<div className="form-wrapper" style={{ marginTop: "60px" }}>
					<form onSubmit={handleLogin}>
						<h1 className="form-heading">Login</h1>
						<div className="input-box">
							<input
								type="text"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<FaUser className="icon" />
						</div>
						<div className="input-box">
							<input
								type={CurrentPassVisibility ? "text" : "password"}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<FaLock
								className="icon"
								id="Lock"
								onClick={togglePasswordVisibility}
							/>
						</div>
						<div className="remember-forgot">
							<label>
								<input type="checkbox" /> Remember me
							</label>
							<a href="#">Forgot Password?</a>
						</div>
						<div className="submit-btn">
							<button type="submit">Login</button>
						</div>
						<div className="register-link" style={{ marginBottom: "20px" }}>
							<p>
								Don't have an account? <a href="/register">Register</a>
							</p>
						</div>
						{message && (
							<p className="message" style={{ marginBottom: "20px" }}>
								{message}
							</p>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
