import MomentUtils from '@date-io/moment';
import {
    DatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'assets/css/custom-styles.css';
import Card from "components/Card/Card.js";
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import CardHeader from 'components/Card/CardHeader';
import Button from "components/CustomButtons/Button.js";
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { useFormik } from 'formik';
import * as moment from 'moment';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { MacroCycleService } from 'services/macro-cycle.service';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string('Nombre del macro ciclo')
        .required('El nombre es obligatorio'),
    initDate: yup
        .date(null, '')
        .when(
            "endDate",
            (endDate, schema) => endDate ? schema.max(endDate, "La fecha de inicio debe ser menor que la de fin") : schema.getDefault())
        .nullable()
});

export default function MacroCycle(props) {

    const [macroCycleId, setMacroCycleId] = useState(null);
    const formik = useFormik({
        initialValues: {
            name: '',
            initDate: null,
            endDate: null,
            weekCount: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => submit(values),
    });

    useEffect(() => {
        if (props.location.state?.macrocycleId) {
            setMacroCycleId(props.location.state.macrocycleId);
            MacroCycleService.getAll({ _id: props.location.state.macrocycleId }).then(
                response => {
                    const { name, initDate, endDate, weekCount } = response.data[0];
                    formik.setValues({
                        name: name,
                        initDate: initDate ? moment(initDate) : null,
                        endDate: endDate ? moment(endDate) : null,
                        weekCount: weekCount
                    });
                },
                error => {
                    console.error("no conexion a la api", error);
                }
            );
        }
    }, [])

    useEffect(() => {
        const { initDate, endDate } = formik.values;
        if (initDate && endDate) {
            formik.setFieldValue('weekCount', endDate.diff(initDate, 'weeks'));
        }
    }, [formik.values.endDate, formik.values.initDate]);

    function handleDataChange(event, dateInput) {
        formik.setFieldValue(dateInput, event, false);
    }

    function submit(values) {
        if (macroCycleId) {
            values._id = macroCycleId;
            MacroCycleService.put(macroCycleId, values).then(
                res => {
                    console.log("updated", res)
                }
            )
        } else {
            MacroCycleService.post(values).then(
                res => {
                    console.log("creado", res);
                }
            )
        }
    }

    return (<div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                    <form onSubmit={formik.handleSubmit}>
                        <CardHeader color="primary">
                            {
                                !macroCycleId ?
                                    <h4 className="card-title-white">Crear Macro Ciclo</h4> :
                                    <h4 className="card-title-white">Actualizar {formik.values.name}</h4>
                            }

                            <p className="card-category-white" >Complete la información</p>
                        </CardHeader>
                        <CardBody>
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
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <GridContainer>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <DatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="DD/MM/yyyy"
                                            margin="normal"
                                            name="initDate"
                                            id="initDate"
                                            label="Fecha de inicio"
                                            fullWidth={true}
                                            value={formik.values.initDate}
                                            onChange={(event) => handleDataChange(event, 'initDate')}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.initDate}
                                            error={(formik.touched.initDate && Boolean(formik.errors.initDate))}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <DatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="DD/MM/yyyy"
                                            margin="normal"
                                            name="endDate"
                                            id="endDate"
                                            label="Fecha de fin"
                                            fullWidth={true}
                                            value={formik.values.endDate}
                                            onChange={(event) => handleDataChange(event, 'endDate')}
                                            onBlur={formik.handleBlur}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </MuiPickersUtilsProvider>
                            <CustomInput
                                id="weekCount"
                                labelText="Cantidad de semanas"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    name: "weekCount",
                                    disabled: true,
                                    value: formik.values.weekCount
                                }}
                            />
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" type="submit">Guardar</Button>
                        </CardFooter>
                    </form>
                </Card>
            </GridItem>
        </GridContainer>
    </div>);
}

MacroCycle.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            macrocycleId: PropTypes.string
        })
    }),
};