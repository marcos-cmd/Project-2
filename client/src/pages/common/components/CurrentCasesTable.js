import React, { useState, useEffect } from 'react';
import numeral from 'numeral';
import Title from './Title';
import './TestSite.css';


export default function CurrentCasesTable() {
    const [colonyInfo, setColonyInfo] = useState({});
    const [colonies, setColonies] = useState([]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/states")
            .then((response) => response.json())
            .then((data) => {
                setColonyInfo(data);
                console.log(colonyInfo);
            });
    }, []);

    useEffect(() => {
        const getColoniesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/states")
                .then((response) => response.json())
                .then((data) => {
                    const colonies = data.map((colony) => (
                        {
                            name: colony.state,
                            cases: colony.cases,
                            population: colony.population,
                            casePM: colony.casesPerOneMillion,
                        }
                    ));
                    setColonies(colonies);
                    console.log('this is colonies', colonies);
                });
        };
        getColoniesData();
    }, []);



    return (
        <React.Fragment>
            <Title style={{ color: 'white' }}>United States Cases</Title>

            <table className="table">
                {colonies.map((colony) => (
                    <tr>
                        <td>{colony.name}</td>
                        <td>
                            <strong>{numeral(colony.cases).format("0,0")}</strong>
                        </td>
                    </tr>
                ))}
            </table>
        </React.Fragment >
    );
}
