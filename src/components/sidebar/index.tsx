import HomeOutlined from "@mui/icons-material/HomeOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Box, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import appIcon from "../../assets/images/todo4.jpg";
import SidebarAccordion from "./components/Accordion";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "./styles.scss";

export interface IAppSidebar {
	open?: boolean;
	onToggle?: any;
}

function AppSidebar(props: IAppSidebar) {
	const { open, onToggle } = props;
	const activeClassName = open ? "" : "hide";

	const handleToggle = () => {
		if (!onToggle) {
			return;
		}

		onToggle();
	};

	return (
		<aside className={`sidebar ${activeClassName}`}>
			<Box className="sidebar-header">
				<Box className="sidebar-header-title">
					<Box>
						<img src={appIcon} alt="app_icon" />
					</Box>
					{/* <Typography variant="h4">HL Todo</Typography> */}
				</Box>

				<Box className="sidebar-header-toggle">
					<button className="sidebar-header-toggle-btn" onClick={handleToggle}>
						{open && <KeyboardDoubleArrowLeftOutlinedIcon />}
						{!open && <KeyboardDoubleArrowRightOutlinedIcon />}
					</button>
				</Box>
			</Box>

			<Box className="sidebar-body">
				<Box className="sidebar-body-item" sx={{ margin: "0.5rem 0" }}>
					<RouterLink to="#">
						<HomeOutlined />
						<span>Trang chủ</span>
					</RouterLink>
				</Box>

				<SidebarAccordion title="Hello">
					<Box className="sidebar-body-item">
						<RouterLink to="#" className="active">
							<HomeOutlined />
							<span>Trang chủ</span>
						</RouterLink>
					</Box>

					<Box className="sidebar-body-item">
						<RouterLink to="#">
							<HomeOutlined />
							<span>Trang chủ</span>
						</RouterLink>
					</Box>

					<Box className="sidebar-body-item">
						<RouterLink to="#">
							<HomeOutlined />
							<span>Trang chủ</span>
						</RouterLink>
					</Box>

					<Box className="sidebar-body-item">
						<RouterLink to="#">
							<HomeOutlined />
							<span>Trang chủ</span>
						</RouterLink>
					</Box>
				</SidebarAccordion>
			</Box>

			<Divider />

			<Box className="sidebar-footer">
				<Box className="sidebar-footer-item">
					<RouterLink to="#">
						<SettingsOutlinedIcon />
						<span>Cài đặt</span>
					</RouterLink>
				</Box>
			</Box>
		</aside>
	);
}

export default AppSidebar;
