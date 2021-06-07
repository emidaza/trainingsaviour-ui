import { Button, Collapse, Divider, makeStyles, Paper } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import styles from 'assets/jss/material-dashboard-react/views/micro-cycle';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Muted from 'components/Typography/Muted';
import { FunctionalAreaTypes } from 'constants/functional-areas.const';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(styles)
export function TrainingSession(props) {
    const classes = useStyles();
    const [workoutsOpen, setWorkoutsOpen] = useState(false);
    const { trainingSession, trainingDayId } = props;

    function getLoad(functionalAreaType) {
        let load = 0;
        if (trainingSession) {
            trainingSession.workouts.forEach(workout => {
                const { amount, repetitions, series, functionalArea } = workout;
                if (functionalArea.type === functionalAreaType)
                    load += amount * repetitions * series;
            })
        }
        return load;
    }




    function getWorkouts(workouts) {
        if (workouts) {
            return workouts.map((workout, index) => {
                const { functionalArea, amount, repetitions, series } = workout;
                return (
                    <React.Fragment key={index}>
                        <GridContainer classes={{ root: classes.workoutRow }} onClick={() => props.showWorkoutDialog(workout, trainingDayId, trainingSession.order)}>
                            <GridItem md={6}>
                                <Muted>{functionalArea.name}</Muted>
                            </GridItem>
                            <GridItem md={6} >
                                <Muted> {`${series}x${repetitions}x${amount}m`}</Muted>
                            </GridItem>
                        </GridContainer>
                        {(index < workouts.length - 1) ? <Divider orientation="horizontal" light /> : ''}
                    </React.Fragment>
                )
            })
        }
    }

    return (
        <React.Fragment>
            <span className={classes.aerobicLoad}>Aerobico: {getLoad(FunctionalAreaTypes.aerobic)}m</span>
            <span className={classes.anaerobicLoad}>Anaerobico: {getLoad(FunctionalAreaTypes.anaerobic)}m</span>

            <Button className={classes.workoutsButton} variant="contained" onClick={() => setWorkoutsOpen(!workoutsOpen)}>Trabajos</Button>
            <Button variant="contained" startIcon={<PlaylistAddIcon />}
                onClick={() => props.showWorkoutDialog(undefined, trainingDayId, trainingSession.order)}>
                Agregar
                </Button>
            <Collapse in={workoutsOpen} timeout="auto" unmountOnExit>
                <Paper className={classes.workoutsPaper} variant="outlined" square>
                    {getWorkouts(trainingSession?.workouts)}
                </Paper>
            </Collapse>
        </React.Fragment>
    );
}

TrainingSession.propTypes = {
    trainingSession: PropTypes.any,
    trainingDayId: PropTypes.string,
    showWorkoutDialog: PropTypes.func
}

export default TrainingSession;