import { Collapse } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from "assets/jss/material-dashboard-react/components/collapsibleMenuItemStyles.js";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export function CollapsibleMenuItem(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { menuItem, color } = props;

    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    function handleClick() {
        setOpen(!open);
    }

    function getWhiteFontClasses(menuChild) {
        return classNames({
            [" " + classes.whiteFont]: activeRoute(menuItem.layout + menuChild.path)
        });
    }

    function getListItemClasses(menuChild) {
        return classNames({
            [" " + classes[color]]: activeRoute(menuItem.layout + menuChild.path)
        });
    }

    return (
        <div className={classes.item}>
            <ListItem className={classes.itemLink} button onClick={handleClick}>
                {typeof menuItem.icon === "string" ? (
                    <Icon
                        className={classNames(classes.itemIcon, {
                            [classes.itemIconRTL]: props.rtlActive
                        })}
                    >
                        {menuItem.icon}
                    </Icon>
                ) : (
                        <menuItem.icon
                            className={classNames(classes.itemIcon, {
                                [classes.itemIconRTL]: props.rtlActive
                            })}
                        />
                    )}
                {open ?
                    <ExpandLess className={classes.itemIcon + ' ' + classes.itemExpandIcon} /> :
                    <ExpandMore className={classes.itemIcon + ' ' + classes.itemExpandIcon} />
                }
                <ListItemText
                    primary={props.rtlActive ? menuItem.rtlName : menuItem.name}
                    className={classNames(classes.itemText, {
                        [classes.itemTextRTL]: props.rtlActive
                    })}
                    disableTypography={true}
                />
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapseContianer}>
                <List component="div" disablePadding className={classes.list}>
                    {
                        menuItem.nestedChildrens.map((child, key) => {
                            return (
                                <NavLink
                                    to={child.layout + child.path}
                                    className={classes.item}
                                    activeClassName="active"
                                    key={key}
                                >
                                    <ListItem className={classes.itemLink + getListItemClasses(child)} button>
                                        <ListItemText
                                            primary={child.rtlActive ? child.rtlName : child.name}
                                            className={classNames(classes.itemText, getWhiteFontClasses(child), {
                                                [classes.itemTextRTL]: child.rtlActive
                                            })}
                                            disableTypography={true}
                                        />
                                    </ListItem>
                                </NavLink>
                            )
                        })
                    }
                </List>
            </Collapse>
        </div>
    )
}

CollapsibleMenuItem.propTypes = {
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    menuItem: PropTypes.object,
    color: PropTypes.string
};