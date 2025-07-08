import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./authHelper/auth";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import "./ResetPasswordPage.css";
import PasswordStrengthChecklist from "../components/PasswordStrengthChecklist";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { resetPassword, error, isLoading, message } = useAuth();
	const { token } = useParams();
	const navigate = useNavigate();

	const isPasswordValid = () => {
		return (
			password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/[0-9]/.test(password) &&
			/[^A-Za-z0-9]/.test(password)
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!isPasswordValid()) {
			toast.error("Password does not meet strength requirements");
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			await resetPassword(token, password);
			toast.success("Password reset successfully! Redirecting...");
			setTimeout(() => navigate("/login"), 2000);
		} catch (error) {
			console.error(error);
			toast.error(error?.message || "Error resetting password");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="reset-password-wrapper"
		>
			<div className="reset-password-container">
				<h2 className="reset-password-title">Reset Password</h2>

				{error && <p className="reset-error">{error}</p>}
				{message && <p className="reset-success">{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type="password"
						placeholder="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Input
						icon={Lock}
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<PasswordStrengthChecklist password={password} />

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="reset-submit-button"
						type="submit"
						disabled={isLoading || !isPasswordValid()}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};

export default ResetPasswordPage;
