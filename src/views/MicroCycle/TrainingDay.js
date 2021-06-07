import { Card, CardContent, Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import styles from "assets/jss/material-dashboard-react/views/micro-cycle.js";
import CardHeader from 'components/Card/CardHeader';
import DateField from 'components/DateField/date-field';
import PropTypes from 'prop-types';
import React from 'react';
import TrainingSession from './TrainingSession';

const useStyles = makeStyles(styles);
function TrainingDay(props) {
    const classes = useStyles();
    const { data } = props;
    const { trainingSessions } = data;


    return (
        <Card className={classes.dayWrapper}>
            <CardHeader className={classes.dayHeader}>
                <Typography variant="subtitle1">
                    <DateField date={data.date}></DateField>
                </Typography>
            </CardHeader>
            <CardContent className={classes.dayContent}>
                <List dense className={classes.turnsList}>
                    {
                        trainingSessions.map((trainingSession, index) => (
                            <React.Fragment key={index}>
                                <ListItem className={classes.turnsItem}>
                                    <ListItemText primary={trainingSession.title}
                                        secondary={
                                            <TrainingSession trainingDayId={data._id} showWorkoutDialog={props.showWorkoutDialog} trainingSession={trainingSession} />
                                        } />
                                </ListItem>
                                { index !== (trainingSessions.length - 1) ? <Divider light /> : ''}
                            </React.Fragment>
                        )
                        )
                    }
                </List>
            </CardContent>
        </Card>
    );
}

TrainingDay.propTypes = {
    data: PropTypes.any,
    showWorkoutDialog: PropTypes.func
}

export default TrainingDay;