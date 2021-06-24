import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DateField from "components/DateField/date-field";
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from "react-router-dom";
import styles from "assets/jss/material-dashboard-react/views/macro-cycle-list.js";

const useStyles = makeStyles(styles);

function MicroCycleList(props) {
    const classes = useStyles();
    const { microcycles } = props;
    const history = useHistory();

    if (!microcycles) {
        return;
    }

    function navigateTo(microcycle) {
        history.push('/admin/micro-ciclo/'+microcycle._id);
    }

    return (
        <Table size="small" aria-label="microciclos">
            <TableHead>
                <TableRow>
                    <TableCell>Init Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Objective</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {microcycles.map((microcycle, index) => (
                    <TableRow key={index} className={classes.actionRow} onClick={() => navigateTo(microcycle)}>
                        <TableCell><DateField date={microcycle.initDate} /></TableCell>
                        <TableCell><DateField date={microcycle.endDate} /></TableCell>
                        <TableCell>{microcycle.objective}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    )
}

MicroCycleList.propTypes = {
    microcycles: PropTypes.any
}

export default MicroCycleList;