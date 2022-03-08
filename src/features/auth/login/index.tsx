import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import {
	Alert,
	Button,
	CircularProgress,
	Collapse,
	Container,
	Divider,
	Grid,
	IconButton,
	Link,
	Paper,
	Stack,
	Tooltip,
	Typography
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../../assets/images/login.svg";
import AppSnackBar from "../../../components/SnackBar/AppSnackBar";
import AuthService from "../../../services/AuthService";
import { ILoginResponse, IUserLogin } from "../../../types/AuthModels";

function LoginPage() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [isShowSnackBar, setIsShowSnackBar] = useState(false);

	const [userLogin, setUserLogin] = useState<IUserLogin>({
		username: "",
		password: "",
	});

	const [userLoginError, setUserLoginError] = useState({
		username: false,
		password: false,
	});

	const [openAlert, setOpenAlert] = useState(false);

	const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target;

		setUserLogin({
			...userLogin,
			[target.name]: target.value,
		});
	};

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (userLoginError.username || userLoginError.password) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await AuthService.postLoginAsync(
				userLogin.username,
				userLogin.password,
			);

			setIsLoading(false);

			if (response.statusCode === 200) {
				AuthService.setLocalData(response.data as ILoginResponse);
				navigate("/");
			} else if (response.statusCode === 401) {
				setOpenAlert(true);
			} else if (response.statusCode === 500) {
				setIsShowSnackBar(true);
			}
		} catch (error: any) {
			setIsLoading(false);
			console.log(error);
			setIsShowSnackBar(true);
		}
	};

	const handleValidateField = (event: React.FocusEvent<HTMLInputElement>) => {
		const target = event.target;
		if (!target.value) {
			return;
		}

		const rule = target.dataset["rule"] || "";

		if (!target.value.trim() || !target.value.match(new RegExp(rule))) {
			setUserLoginError({
				...userLoginError,
				[target.name]: true,
			});
			return;
		}

		setUserLoginError({
			...userLoginError,
			[target.name]: false,
		});
	};

	return (
		<Box
			className="wrapper"
			sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
		>
			<Container fixed>
				<Grid container spacing={0}>
					<Grid item lg={8} md={7} sx={{ display: { xs: "none", md: "block" } }}>
						<Box
							sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
						>
							<img
								src={loginImage}
								alt="login_image"
								style={{ width: "80%", height: "80%" }}
							/>
						</Box>
					</Grid>

					<Grid item lg={4} md={5} xs={12}>
						<Paper
							sx={{
								boxShadow: "-24px 24px 72px -8px rgb(145 158 171 / 24%)",
								padding: 4,
								borderRadius: 4,
							}}
						>
							<Stack direction="column" sx={{ marginBottom: 4 }}>
								<Collapse in={openAlert}>
									<Alert
										severity="warning"
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
												onClick={() => {
													setOpenAlert(false);
												}}
											>
												<CloseIcon fontSize="inherit" />
											</IconButton>
										}
										sx={{ mb: 2 }}
									>
										Tên đăng nhập hoặc mật khẩu không hợp lệ
									</Alert>
								</Collapse>
								<Typography variant="h3" component="h3" sx={{ marginBottom: 2 }}>
									Đăng Nhập
								</Typography>
								<Typography variant="subtitle2">
									Chưa có tài khoản?{" "}
									<Link
										href="/register"
										underline="hover"
										sx={{ fontWeight: 600 }}
									>
										Đăng ký
									</Link>
								</Typography>
							</Stack>

							<form onSubmit={handleSubmit}>
								<Stack direction="column" sx={{ marginBottom: 4 }}>
									<TextField
										label="Tên đăng nhập"
										variant="filled"
										type="text"
										required
										sx={{ marginBottom: 4 }}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<PersonOutlineRoundedIcon />
												</InputAdornment>
											),
										}}
										name="username"
										value={userLogin.username}
										onChange={handleChangeField}
										error={userLoginError.username}
										onBlur={handleValidateField}
										helperText={
											userLoginError.username &&
											"Tên đăng nhập không được bỏ trống"
										}
									/>
									<TextField
										label="Mật khẩu"
										variant="filled"
										type="password"
										required
										sx={{ marginBottom: 4 }}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<KeyRoundedIcon />
												</InputAdornment>
											),
										}}
										name="password"
										value={userLogin.password}
										onChange={handleChangeField}
										error={userLoginError.password}
										onBlur={handleValidateField}
										inputProps={{
											"data-rule":
												"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.,]).{8,}$",
										}}
										helperText={
											userLoginError.password && (
												<Tooltip
													title={`Mật khẩu có ít nhất 8 ký tự, bao gồm số, chữ cái, ít nhất 1 chữ in hoa và 1 trong các ký tự sau: #?!@$%^&*.,`}
													placement="bottom"
												>
													<Typography
														variant="caption"
														sx={{
															color: "#FF4842",
															fontSize: "0.8rem",
															display: "flex",
															alignItems: "center",
														}}
													>
														<span>Mật khẩu không đúng định dạng</span>
														<HelpOutlineRoundedIcon />
													</Typography>
												</Tooltip>
											)
										}
									/>
									<Typography
										sx={{ marginBottom: 4 }}
										textAlign="start"
										variant="subtitle2"
									>
										<Link href="forget-password" variant="subtitle2">
											Quên mật khẩu?
										</Link>
									</Typography>
									<Button
										variant="contained"
										color="primary"
										size="large"
										type="submit"
									>
										{isLoading ? (
											<CircularProgress sx={{ color: "#FFF" }} size={30} />
										) : (
											"Đăng nhập"
										)}
									</Button>
								</Stack>
							</form>

							<Divider textAlign="center" sx={{ color: "#A4AFB9", marginBottom: 4 }}>
								<Typography variant="subtitle2">Hoặc tiếp tục với</Typography>
							</Divider>

							{/* <Stack direction="row" spacing={2}>
									<Button>

									</Button>
							</Stack> */}
							<AppSnackBar
								open={isShowSnackBar}
								message={"Đã có lỗi xảy ra"}
								type="error"
								onClose={() => setIsShowSnackBar(false)}
							/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default LoginPage;
