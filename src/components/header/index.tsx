import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Button,
	Divider,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import "./styles.scss";

export interface IAppHeader {}

function AppHeader(props: IAppHeader) {
	const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

	const handleOpenProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setProfileAnchor(event.currentTarget);
	};

	const handleCloseProfileMenu = () => {
		setProfileAnchor(null);
	};

	return (
		<AppBar
			position="static"
			sx={{ backgroundColor: "#fff", boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 15%)" }}
		>
			<Toolbar>
				<Typography variant="h6" color="primary" noWrap sx={{ textTransform: "uppercase" }}>
					Todo Management
				</Typography>

				<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, padding: "0 24px" }}>
					<Button
						variant="text"
						sx={{
							color: "#5b5760",
							marginRight: "0.5rem",
							"&:hover": { color: "#6E00FF" },
						}}
					>
						Tạo mới
					</Button>
					<Button
						variant="text"
						sx={{
							color: "#5b5760",
							marginRight: "0.5rem",
							"&:hover": { color: "#6E00FF" },
						}}
					>
						Tạo mới
					</Button>
					<Button color="primary" variant="contained">
						Tạo mới
					</Button>
				</Box>

				<Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
					<Tooltip title="Thông báo">
						<IconButton
							size="medium"
							aria-label="show 17 new notifications"
							color="primary"
							sx={{ marginRight: "0.25rem", color: "#344563" }}
						>
							<Badge badgeContent={17} color="error">
								<NotificationsIcon sx={{ transform: "rotate(45deg)" }} />
							</Badge>
						</IconButton>
					</Tooltip>

					<Tooltip title="Hồ sơ và Cài đặt">
						<IconButton size="medium" onClick={handleOpenProfileMenu}>
							<Avatar
								alt="Remy Sharp"
								src="https://mui.com/static/images/avatar/2.jpg"
								sx={{ width: 30, height: 30 }}
							/>
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={profileAnchor}
						open={Boolean(profileAnchor)}
						onClose={handleCloseProfileMenu}
						PaperProps={{
							sx: {
								overflow: "visible",
								boxShadow:
									"0 4px 8px -2px rgb(9 30 66 / 25%), 0 0 1px rgb(9 30 66 / 31%)",
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						<MenuItem sx={{ fontSize: "15px", padding: "0.5rem 1.25rem" }}>
							<AccountBoxRoundedIcon
								fontSize="small"
								sx={{ marginRight: "0.5rem", color: "#344563" }}
							/>
							Hồ sơ
						</MenuItem>

						<MenuItem sx={{ fontSize: "15px", padding: "0.5rem 1.25rem" }}>
							<VisibilityRoundedIcon
								fontSize="small"
								sx={{ marginRight: "0.5rem", color: "#344563" }}
							/>
							Giao diện
						</MenuItem>

						<Divider />
						<MenuItem
							sx={{ fontSize: "15px", padding: "0.5rem 1.25rem", color: "#F84843" }}
						>
							<LogoutRoundedIcon
								fontSize="small"
								sx={{ marginRight: "0.5rem", color: "#F84843" }}
							/>
							Đăng xuất
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default AppHeader;
