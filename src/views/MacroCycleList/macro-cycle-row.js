import { Box, Collapse, IconButton, TableCell, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DateField from "components/DateField/date-field";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import MicroCycleList from "./micro-cycle-list";

function MacroCycleRow(props) {
    const { macrocycle } = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow key={macrocycle._id}>
                <TableCell>
                    {
                        macrocycle.microcycles.length ?
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton> : ''
                    }
                </TableCell>
                <TableCell>
                    {macrocycle.name}
                </TableCell>
                <TableCell >
                    <DateField date={macrocycle.initDate} />
                </TableCell>
                <TableCell >
                    <DateField date={macrocycle.endDate} />
                </TableCell>
                <TableCell >
                    {macrocycle.weekCount}
                </TableCell>
                <TableCell>
                    <Link to={{
                        pathname: '/admin/macro-ciclo',
                        state: { macrocycleId: macrocycle._id }
                    }}>
                        <IconButton aria-label="edit">
                            <EditIcon color="primary" />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <MicroCycleList microcycles={macrocycle.microcycles}></MicroCycleList>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

MacroCycleRow.propTypes = {
    macrocycle: PropTypes.any
}

export default MacroCycleRow;