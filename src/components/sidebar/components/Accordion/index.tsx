import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Box, Typography } from "@mui/material";
import React from "react";
import "./styles.scss";

export interface ISidebarAccordionProps {
	title?: string;
}

export interface ISidebarAccordionState {
	open: boolean;
}

class SidebarAccordion extends React.Component<ISidebarAccordionProps, ISidebarAccordionState> {
	private contentRef: React.RefObject<HTMLDivElement>;
	private arrowRef: React.RefObject<any>;

	constructor(props: ISidebarAccordionProps) {
		super(props);
		this.state = {
			open: false,
		};

		this.contentRef = React.createRef();
		this.arrowRef = React.createRef();

		this.handleAccordion = this.handleAccordion.bind(this);
	}

	handleAccordion() {
		const { current } = this.contentRef;
		if (!current) {
			return;
		}

		const { maxHeight } = current.style;
		if (maxHeight) {
			current.style.maxHeight = "";
			current.style.overflow = "hidden";
			this.arrowRef.current.style.transform = "rotate(-90deg)";
			this.setState({ open: false });
		} else {
			current.style.maxHeight = current.scrollHeight + "px";
			this.arrowRef.current.style.transform = "rotate(0deg)";
			this.setState({ open: true });
			setTimeout(() => {
				current.style.overflow = "visible";
			}, 300);
		}
	}

	render() {
		const className = this.state.open ? "active" : "";
		return (
			<>
				<Box className={`sidebar-body-title ${className}`} onClick={this.handleAccordion}>
					<Box>
						<ExpandMoreOutlinedIcon ref={this.arrowRef} />
						<Typography>Todo</Typography>
					</Box>
				</Box>

				<Box className="sidebar-body-submenu" ref={this.contentRef}>
					{this.props.children}
				</Box>
			</>
		);
	}
}

export default SidebarAccordion;
