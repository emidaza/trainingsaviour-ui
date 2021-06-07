
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Table from "components/Table/Table.js";
import { API_URLS } from "constants/ApiUrls";
import React, { useEffect, useState } from "react";
import MacroCycleRow from "./macro-cycle-row";

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
        return dataList.map((macrocycle, key) => (
            <MacroCycleRow key={key}  macrocycle={macrocycle} />
        )
        )
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>Macrociclos</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Expander","Nombre", "Fecha de inicio", "Fecha de fin", "Semanas", "Acciones"]}
                            tableRows={getRows(macrocycleList)}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}