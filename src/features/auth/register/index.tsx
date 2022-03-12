import CloseIcon from "@mui/icons-material/Close";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
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
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../../assets/images/google.svg";
import loginImage from "../../../assets/images/login.svg";
import AppSnackBar from "../../../components/SnackBar/AppSnackBar";
import AppConfigs from "../../../configs/AppConfigs";
import AuthService from "../../../services/AuthService";
import { IGoogleLoginResponse, IUserRegister } from "../../../types/AuthModels";

function RegisterPage() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [isShowSnackBar, setIsShowSnackBar] = useState(false);

	const [user, setUser] = useState<IUserRegister>({
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	});

	const [userError, setUserError] = useState({
		password: false,
		firstName: false,
		lastName: false,
		email: false,
	});

	const [alert, setAlert] = useState({ open: false, msg: "" });

	const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		setUser({ ...user, [target.name]: target.value });
	};

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (userError.email || userError.password || userError.firstName || userError.lastName) {
			return;
		}

		setIsLoading(true);
		try {
			const response = await AuthService.postRegisterAsync(user);
			setIsLoading(false);

			if (response.statusCode === 201) {
				navigate("/login");
			} else if (response.statusCode === 400) {
				let msg = "";
				if (response.message === "existed_email") {
					msg = "Email đã tồn tại";
				}

				setAlert({ ...alert, open: true, msg });
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
			setUserError({ ...userError, [target.name]: true });
			return;
		}

		setUserError({ ...userError, [target.name]: false });
	};

	const responseOk = async (response: any) => {
		try {
			// console.log(response);
			const res = await AuthService.getLoginGoogleAsync(
				response.tokenObj.id_token,
				response.tokenObj.token_type,
			);

			if (res.statusCode === 200) {
				AuthService.setGoogleLocalData(res.data as IGoogleLoginResponse);
				navigate("/");
			} else if (res.statusCode === 401) {
				setAlert({
					...alert,
					open: true,
					msg: "Không thể xác thực tài khoản Google, vui lòng thử lại sau",
				});
			} else if (res.statusCode === 500) {
				setIsShowSnackBar(true);
			}
		} catch (error) {
			console.log(error);
			setIsShowSnackBar(true);
		}
	};

	const responseFailure = (response: any) => {
		// console.log(response);
		if (response.error === "popup_closed_by_user") {
			return;
		}
		setAlert({
			...alert,
			open: true,
			msg: "Không thể xác thực tài khoản Google, vui lòng thử lại sau",
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
								<Collapse in={alert.open}>
									<Alert
										severity="warning"
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
												onClick={() => {
													setAlert({ open: false, msg: "" });
												}}
											>
												<CloseIcon fontSize="inherit" />
											</IconButton>
										}
										sx={{ mb: 2 }}
									>
										{alert.msg}
									</Alert>
								</Collapse>
								<Typography variant="h3" component="h3" sx={{ marginBottom: 2 }}>
									Đăng Ký
								</Typography>
								<Typography variant="subtitle2">
									Đã có tài khoản?{" "}
									<Link href="/login" underline="hover" sx={{ fontWeight: 600 }}>
										Đăng nhập
									</Link>
								</Typography>
							</Stack>

							<form onSubmit={handleSubmit}>
								<Stack direction="column" sx={{ marginBottom: 2 }}>
									<Stack direction="row" spacing={1}>
										<TextField
											label="Họ"
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
											name="lastName"
											value={user.lastName}
											onChange={handleChangeField}
											error={userError.lastName}
											onBlur={handleValidateField}
											helperText={
												userError.lastName && "Họ không được bỏ trống"
											}
										/>
										<TextField
											label="Tên"
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
											name="firstName"
											value={user.firstName}
											onChange={handleChangeField}
											error={userError.firstName}
											onBlur={handleValidateField}
											helperText={
												userError.firstName && "Tên không được bỏ trống"
											}
										/>
									</Stack>

									<TextField
										label="Email"
										variant="filled"
										type="email"
										required
										sx={{ marginBottom: 4 }}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<EmailRoundedIcon />
												</InputAdornment>
											),
										}}
										name="email"
										value={user.email}
										onChange={handleChangeField}
										error={userError.email}
										onBlur={handleValidateField}
										inputProps={{
											"data-rule": "^[\\w-.]+@([\\w-]+.)+[\\w-]{2,4}$",
										}}
										helperText={
											userError.email &&
											"Email không đúng định dạng"
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
										value={user.password}
										onChange={handleChangeField}
										error={userError.password}
										onBlur={handleValidateField}
										inputProps={{
											"data-rule":
												"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.,]).{8,}$",
										}}
										helperText={
											userError.password && (
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
														<span style={{ marginRight: "5px" }}>
															Mật khẩu không đúng định dạng
														</span>
														<HelpOutlineRoundedIcon fontSize="small" />
													</Typography>
												</Tooltip>
											)
										}
									/>

									<Button
										variant="contained"
										color="primary"
										size="large"
										type="submit"
									>
										{isLoading ? (
											<CircularProgress sx={{ color: "#FFF" }} size={30} />
										) : (
											"Đăng ký"
										)}
									</Button>
								</Stack>
							</form>

							<Divider textAlign="center" sx={{ color: "#A4AFB9", marginBottom: 2 }}>
								<Typography variant="subtitle2">Hoặc tiếp tục với</Typography>
							</Divider>

							<Stack
								direction="row"
								spacing={0}
								sx={{ height: "50px", display: "flex", justifyContent: "center" }}
							>
								<GoogleLogin
									clientId={AppConfigs.GOOGLE_AUTH_CLIENT_ID}
									onSuccess={responseOk}
									onFailure={responseFailure}
									cookiePolicy={"single_host_origin"}
									render={(renderProps) => (
										<Button
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
											sx={{ backgroundColor: "#919eab14" }}
										>
											<img
												src={googleIcon}
												alt="google_icon"
												style={{ width: "80%", height: "80%" }}
											/>
											<Typography variant="subtitle2" marginLeft={0.5}>
												Google
											</Typography>
										</Button>
									)}
								/>
							</Stack>
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

export default RegisterPage;
