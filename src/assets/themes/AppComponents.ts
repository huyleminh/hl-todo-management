import { Components } from "@mui/material/styles";

export const AppComponents: Components = {
	MuiFilledInput: {
		styleOverrides: {
			root: {
				borderRadius: "8px",
				fontSize: "0.875rem",
				backgroundColor: "#919eab14",
				"&.Mui-error": {
					color: "#FF4842",
                    backgroundColor: "#fddad9a6"
				},
			},
			underline: {
				"&:before": {
					borderBottom: "unset",
				},
				"&:hover:not(.Mui-focused):before": {
					borderBottom: "unset",
				},
				"&:hover:not(.Mui-disabled):before": {
					borderBottom: "unset",
				},
				"&:after": {
					// focused
					borderBottom: "unset",
				},
			},
		},
	},
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: "8px",
				textTransform: "none",
			},
		},
	},
	MuiInputLabel: {
		styleOverrides: {
			root: {
				fontSize: "0.875rem",
			},
			asterisk: {
				color: "#FF4842",
			},
		},
	},
};
