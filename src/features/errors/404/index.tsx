import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../../assets/images/404.svg";

function PageNotFound() {
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
					<img src={notFoundImage} alt="not_found_image" />
				</div>
				<Typography variant="h3" component="h3">
					Không tìm thấy trang!
				</Typography>

				<Typography variant="subtitle1">
					Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã nhập
					sai URL? Hãy chắc chắn để kiểm tra chính tả.
				</Typography>

				<Stack spacing={1} direction="row">
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

export default PageNotFound;
