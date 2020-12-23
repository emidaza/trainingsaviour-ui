import { IconButton, TableCell, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Table from "components/Table/Table.js";
import { API_URLS } from "constants/ApiUrls";
import React, { useEffect, useState } from "react";
import * as moment from 'moment';
import { Link } from "react-router-dom";

export default function MacroCycleList() {
    const [macrocycleList, setMacrocycleList] = useState([]);

    useEffect(async () => {
        fetch(API_URLS.macrocycleApi, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response => {
                response.json().then(
                    jsonResponse => {
                        setMacrocycleList(jsonResponse.data)
                    }
                );
            },
            error => {
                console.error("no conexion a la api", error);
            }
        );

    }, [])

    function getRows(dataList) {
        return dataList.map((macrocycle) => (
            <TableRow key={macrocycle._id}>
                <TableCell>
                    {macrocycle.name}
                </TableCell>
                <TableCell >
                    {macrocycle.initDate ? moment(macrocycle.initDate).format('DD-MM-yyyy') : ''}
                </TableCell>
                <TableCell >
                    {macrocycle.endDate ? moment(macrocycle.endDate).format('DD-MM-yyyy') : ''}
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
        )
        )
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>Microciclos</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Nombre", "Fecha de inicio", "Fecha de fin", "Semanas"]}
                            tableRows={getRows(macrocycleList)}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}