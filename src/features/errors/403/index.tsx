import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import forbiddenImage from "../../../assets/images/403.png";

function ForbiddenPage() {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				maxWidth: "100vw",
			}}
		>
			<Stack
				spacing={2}
				direction="column"
				justifyContent="center"
				alignItems="center"
				padding="2rem"
			>
				<div className="error-image-wrapper">
					<img src={forbiddenImage} alt="fobidden_image" />
				</div>
				<Typography variant="h3" component="h3" mt={2}>
					Xin lỗi
				</Typography>

				<Typography variant="h6" component="h6" mt={2}>Bạn không có quyền truy cập vào trang này</Typography>

				<Stack spacing={2} direction="row">
					<Button
						variant="outlined"
						startIcon={<ArrowBackIosNewRoundedIcon />}
						color="primary"
						size="large"
						onClick={handleGoBack}
					>
						Quay Lại
					</Button>
					<Button
						variant="contained"
						startIcon={<HomeRoundedIcon />}
						href="/"
						color="primary"
						size="large"
					>
						Trang Chủ
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}

export default ForbiddenPage;
