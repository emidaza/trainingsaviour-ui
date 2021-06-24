import { blackColor } from "assets/jss/material-dashboard-react";

const { hexToRgb } = require("@material-ui/core");
const { grayColor } = require("assets/jss/material-dashboard-react");

const macroCycleListStyle = {
    actionRow: {
        "&:hover": {
            backgroundColor: grayColor[0],
            boxShadow:
                "0 14px 26px -12px rgba(" +
                hexToRgb(grayColor[0]) +
                ", 0.42), 0 4px 23px 0px rgba(" +
                hexToRgb(blackColor) +
                ", 0.12), 0 8px 10px -5px rgba(" +
                hexToRgb(grayColor[0]) +
                ", 0.2)"
        }
    }
}

export default macroCycleListStyle;