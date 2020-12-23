import {
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    whiteColor,
    blackColor,
    hexToRgb,
    grayColor
} from "assets/jss/material-dashboard-react.js";

const collapsibleListItemStyle = {
    list: {
        marginLeft: "30px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset"
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "0px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        ...defaultFont
    },
    whiteFont: {
        color: whiteColor
    },
    purple: {
        backgroundColor: primaryColor[0],
        ...primaryBoxShadow,
        "&:hover,&:focus": {
            backgroundColor: primaryColor[0],
            ...primaryBoxShadow
        }
    },
    collapseContianer: {
        backgroundColor: grayColor[1]
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:hover,&:focus,&:visited,&": {
            color: whiteColor
        }
    },
    itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
    },
    itemIconRTL: {
        marginRight: "3px",
        marginLeft: "15px",
        float: "right"
    },
    itemExpandIcon: {
        float: "right",
    },
    itemText: {
        ...defaultFont,
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: whiteColor
    },
    itemTextRTL: {
        textAlign: "right"
    },
    blue: {
        backgroundColor: infoColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(infoColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(infoColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: infoColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.2)"
        }
    },
    green: {
        backgroundColor: successColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(successColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(successColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: successColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(successColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(successColor[0]) +
                ",.2)"
        }
    },
    orange: {
        backgroundColor: warningColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(warningColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(warningColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: warningColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(warningColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(warningColor[0]) +
                ",.2)"
        }
    },
    red: {
        backgroundColor: dangerColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(dangerColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(dangerColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: dangerColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(dangerColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(dangerColor[0]) +
                ",.2)"
        }
    },
}

export default collapsibleListItemStyle;