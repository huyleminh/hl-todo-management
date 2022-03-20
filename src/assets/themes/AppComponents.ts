import { Components } from "@mui/material/styles";

export const AppComponents: Components = {
	MuiFilledInput: {
		styleOverrides: {
			root: {
				fontSize: "0.875rem",
				backgroundColor: "#919eab14",
				"&.Mui-error": {
					color: "#FF4842",
					backgroundColor: "#fddad9a6",
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
				fontWeight: 600,
				boxShadow: "none",
				textTransform: "none",
				"&:hover": {
					boxShadow: "none",
				}
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
	// MuiAccordion: {
	// 	styleOverrides: {
	// 		root: {
	// 			"&.Mui-expanded": {
	// 				margin: "0 !important",
	// 			},
	// 		},
	// 	},
	// },
	// MuiAccordionSummary: {
	// 	styleOverrides: {
	// 		content: {
	// 			"&.Mui-expanded": {
	// 				margin: 0,
	// 			},
	// 		},
	// 	},
	// },
};
