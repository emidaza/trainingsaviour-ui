import { Button, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import selectStyles from 'assets/jss/material-dashboard-react/components/selectStyle';
import styles from 'assets/jss/material-dashboard-react/views/micro-cycle';
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { useFormik } from "formik";
import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import * as yup from 'yup';
import { WorkoutService } from '../../services/workout.service';

const useStyles = makeStyles(styles);
const useSelectStyles = makeStyles(selectStyles);

const validationSchema = yup.object({
    name: yup
        .string('Nombre del entrenamiento')
        .required('El nombre es obligatorio'),
    functionalArea: yup
        .string('Area funcional')
        .required('El area funcional es obligatoria')
});

function WorkoutDialog(props) {
    const classes = useStyles();
    const selectClasses = useSelectStyles();
    const { functionalAreas, workout, trainingDayId, sessionOrder } = props;

    const formik = useFormik({
        initialValues: {
            name: '',
            repetitions: 0,
            series: 0,
            amount: 0,
            micropauseMinutes: 0,
            micropauseSeconds: 0,
            macropauseMinutes: 0,
            macropauseSeconds: 0,
            functionalArea: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => submit(values),
    });

    useEffect(() => {
        if (workout) {
            formik.setValues(workout);
            formik.setFieldValue('micropauseMinutes', workout.micropause?.minutes);
            formik.setFieldValue('micropauseSeconds', workout.micropause?.seconds);
            formik.setFieldValue('macropauseMinutes', workout.macropause?.minutes);
            formik.setFieldValue('macropauseSeconds', workout.macropause?.seconds);
            formik.setFieldValue('functionalArea', workout.functionalArea._id);
        }
    }, [])

    function submit(values) {
        const workoutDto = { ...values };
        workoutDto.micropause = {
            minutes: values.micropauseMinutes,
            seconds: values.micropauseSeconds
        }
        workoutDto.macropause = {
            minutes: values.macropauseMinutes,
            seconds: values.macropauseSeconds
        }
        delete workoutDto.micropauseMinutes;
        delete workoutDto.micropauseSeconds;
        delete workoutDto.macropauseSeconds;
        delete workoutDto.macropauseMinutes;
        if (workoutDto._id) {
            WorkoutService.put(workout._id, workoutDto).then(
                () => {
                    props.onClose();
                }
            )
        } else {
            WorkoutService.post(workoutDto, trainingDayId, sessionOrder).then(
                () => {
                    props.onClose();
                }
            )
        }
    }

    function handleFunctionalAreaChange(event) {
        formik.setFieldValue('functionalArea', event.target.value);
    }

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="form-dialog-title">Entrenamiento</DialogTitle>
                <DialogContent>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                id="name"
                                labelText="Nombre"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    name: "name",
                                    error: (formik.touched.name && Boolean(formik.errors.name)),
                                    value: formik.values.name,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl className={classes.fullWidth}>
                                <InputLabel id="functional-area-label">Area funcional</InputLabel>
                                <Select
                                    classes={selectClasses}
                                    labelId="functional-area-label"
                                    id="functionalArea"
                                    name="functionalArea"
                                    value={formik.values.functionalArea}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    onChange={handleFunctionalAreaChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {
                                        functionalAreas.map(fa => <MenuItem key={fa._id} value={fa._id}>{fa.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                id="series"
                                labelText="Series"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    name: "series",
                                    error: (formik.touched.series && Boolean(formik.errors.series)),
                                    value: formik.values.series,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                    type: 'number'
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                id="repetitions"
                                labelText="Repeticiones"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    name: "repetitions",
                                    error: (formik.touched.repetitions && Boolean(formik.errors.repetitions)),
                                    value: formik.values.repetitions,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                    type: 'number'
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                id="amount"
                                labelText="Distancia (m)"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    name: "amount",
                                    error: (formik.touched.amount && Boolean(formik.errors.amount)),
                                    value: formik.values.amount,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                    type: 'number'
                                }}
                            />
                        </GridItem>
                        <GridItem xs={6} >
                            <label className={`${classes.fullWidth} ${classes.dBlock}`}>Macropausa</label>
                            <div className={classes.halfInput}>
                                <CustomInput
                                    id="macropauseMinutes"
                                    labelText="Minutos"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "macropauseMinutes",
                                        error: (formik.touched.macropauseMinutes && Boolean(formik.errors.macropauseMinutes)),
                                        value: formik.values.macropauseMinutes,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                        type: 'number'
                                    }}
                                />
                            </div>
                            <span className={classes.timeSeparator}>:</span>
                            <div className={classes.halfInput}>
                                <CustomInput
                                    id="macropauseSeconds"
                                    labelText="Segundos"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "macropauseSeconds",
                                        error: (formik.touched.macropauseSeconds && Boolean(formik.errors.macropauseSeconds)),
                                        value: formik.values.macropauseSeconds,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                        type: 'number'
                                    }}
                                />
                            </div>
                        </GridItem>


                        <GridItem xs={6} >
                            <label className={`${classes.fullWidth} ${classes.dBlock}`}>Micropausa</label>
                            <div className={classes.halfInput}>
                                <CustomInput
                                    id="micropauseMinutes"
                                    labelText="Minutos"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "micropauseMinutes",
                                        error: (formik.touched.micropauseMinutes && Boolean(formik.errors.micropauseMinutes)),
                                        value: formik.values.micropauseMinutes,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                        type: 'number'
                                    }}
                                />
                            </div>
                            <span className={classes.timeSeparator}>:</span>
                            <div className={classes.halfInput}>
                                <CustomInput
                                    id="micropauseSeconds"
                                    labelText="Segundos"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "micropauseSeconds",
                                        error: (formik.touched.micropauseSeconds && Boolean(formik.errors.micropauseSeconds)),
                                        value: formik.values.micropauseSeconds,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                        type: 'number'
                                    }}
                                />
                            </div>
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
          </Button>
                    <Button type="submit" color="primary">
                        Save
          </Button>
                </DialogActions>

            </form>
        </React.Fragment>
    )
}

WorkoutDialog.propTypes = {
    onClose: PropTypes.func,
    workout: PropTypes.object,
    trainingDayId: PropTypes.string,
    sessionOrder: PropTypes.number,
    functionalAreas: PropTypes.arrayOf(PropTypes.object)
}

export default WorkoutDialog;