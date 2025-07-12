import React from 'react';
import { useAuth } from './authHelper/auth';
import { motion } from 'framer-motion';
import { formatDate } from '../date';
import './Dashboard.css'; // Import our custom CSS

const Dashboard = () => {
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.6 }}
			className="dashboard-container"
		>
			<motion.div
				className="dashboard-card"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<h2 className="dashboard-title">Welcome, {user.name}</h2>

				<div className="dashboard-grid">
					<motion.div
						className="dashboard-section"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<h3 className="section-title">Profile Information</h3>
						<p className="info">📧 Email: {user.email}</p>
					</motion.div>

					<motion.div
						className="dashboard-section"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
					>
						<h3 className="section-title">Account Activity</h3>
						<p className="info">
							📅 Joined:{' '}
							{new Date(user.createdAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<p className="info">🕒 Last Login: {formatDate(user.lastLogin)}</p>
					</motion.div>
				</div>

				<motion.div
					className="logout-container"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
				>
					<motion.button
						onClick={handleLogout}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="logout-button"
					>
						Logout
					</motion.button>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Dashboard;
