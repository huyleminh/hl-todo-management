import { Alert, AlertColor, Snackbar } from "@mui/material";

export interface IAppSnackBarProps {
	open: boolean;
	onClose?: any;
	message: string;
	type?: AlertColor;
}

function AppSnackBar(props: IAppSnackBarProps) {
	const { open, onClose, message } = props;
	let { type } = props;
	if (!type) {
		type = "success";
	}

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={open}
			onClose={onClose}
			key={`topcenter`}
			autoHideDuration={4000}
		>
			<Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default AppSnackBar;
