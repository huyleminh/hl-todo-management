import { Box } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "../../components/header";
import AppSidebar from "../../components/sidebar";
import HomePage from "../home";

function Dashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const handleToogleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<Box
			className="app-dashboard"
			sx={{
				display: "flex",
				width: "100%",
				height: "100%",
				minHeight: "100vh",
			}}
		>
			<AppSidebar open={sidebarOpen} onToggle={handleToogleSidebar} />
			<Box
				sx={{
					flexGrow: 1,
				}}
			>
				<AppHeader />
				<Routes>
					<Route index element={<HomePage />} />
				</Routes>
			</Box>
		</Box>
	);
}

export default Dashboard;
