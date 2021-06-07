import { Dialog, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/views/micro-cycle.js";
import selectStyles from "assets/jss/material-dashboard-react/components/selectStyle";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import DateField from "components/DateField/date-field.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { useFormik } from "formik";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FunctionalAreaService } from "services/functional-area.service.js";
import { MicroCycleService } from "services/micro-cycle.service.js";
import objectives from '../../constants/objectives.js';
import TrainingDay from "./TrainingDay.js";
import WorkoutDialog from "./WorkoutDialog.js";

const useStyles = makeStyles(styles);
const useSelectStyles = makeStyles(selectStyles);

function MicroCycle() {
    const { microCycleId } = useParams();
    const [microCycle, setMicroCycle] = useState();
    const [functionalAreas, setFunctionalAreas] = useState();
    const [workoutDialogOpen, setWorkoutDialogOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [sessionOrder, setSessionOrder] = useState(null);
    const [trainingDayId, setTrainingDayId] = useState(null);
    const classes = useStyles();
    const selectClasses = useSelectStyles();
    const formik = useFormik({
        initialValues: {
            objective: ""
        },
        onSubmit: (values) => submit(values),
    });

    function submit(values) {
        console.log(values);
    }

    useEffect(() => {
        if (microCycleId) {
            loadMicrocycle(microCycleId);
            FunctionalAreaService.getAll().then(
                response => {
                    setFunctionalAreas(response.data);

                },
                error => handleApiError(error)
            );
        }
    }, []);

    function loadMicrocycle(microCycleId) {
        MicroCycleService.getAll({ _id: microCycleId }).then(
            response => {
                setMicroCycle(response.data[0])
                formik.setValues({
                    objective: response.data[0].objective ? response.data[0].objective : ''
                });
            },
            error => handleApiError(error)
        );
    }

    function handleApiError(error) {
        console.log("sin conexion a la api", error)
    }

    function handleObjectiveChange(event) {
        MicroCycleService.put(microCycleId, { objective: event.target.value }).then(
            () => {
                formik.handleChange(event);
            },
            error => handleApiError(error)
        );
    }

    function showEditModal(workout, trainingDayId, sessionOrder) {
        setSelectedWorkout(workout);
        setTrainingDayId(trainingDayId);
        setSessionOrder(sessionOrder);
        setWorkoutDialogOpen(true);
    }

    const handleClose = () => {
        loadMicrocycle(microCycleId)
        setWorkoutDialogOpen(false);
    };


    return (
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4>Microciclo</h4>
                            <p className="card-category-white"><DateField date={microCycle?.initDate} /> a <DateField date={microCycle?.endDate} /></p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={4}>
                                    <form>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel id="objective-label">Objetivo</InputLabel>
                                            <Select
                                                labelId="objective-label"
                                                id="objective"
                                                name="objective"
                                                value={formik.values.objective}
                                                onChange={handleObjectiveChange}
                                                classes={selectClasses}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {objectives.map((obj, key) => <MenuItem key={key} value={obj}>{obj}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </GridItem>
                                {microCycle ?
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Grid container spacing={1}>
                                            {microCycle.trainingDays.map((t, i) =>
                                                <Grid item key={i} xs={12} sm={6} md={4}>
                                                    <TrainingDay showWorkoutDialog={showEditModal} microCycleId={microCycle.microCycleId} data={t}></TrainingDay>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </GridItem>
                                    : ''}
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer >
            <Dialog open={workoutDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <WorkoutDialog workout={selectedWorkout} onClose={handleClose} functionalAreas={functionalAreas}
                    sessionOrder={sessionOrder} trainingDayId={trainingDayId}></WorkoutDialog>
            </Dialog>
        </React.Fragment>
    )
}

export default MicroCycle;