import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core/';
import numeral from 'numeral';
import Title from './Title';
import './TestSite.css';


export default function Chart() {
    const theme = useTheme();
    const [colony, setInputColony] = useState("states");
    const [colonyInfo, setColonyInfo] = useState({});
    const [colonies, setColonies] = useState([]);
    const [chartData, setChartData] = useState([]);

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

    const onColonyChange = async (e) => {
        const colonyCode = e.target.value;

        console.log('this is the code', colonyCode);

        const url =
            colonyCode === "states"
                ? "https://disease.sh/v3/covid-19/states/states"
                : `https://disease.sh/v3/covid-19/states/${colonyCode}`
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setInputColony(colonyCode);
                setColonyInfo(data);
            })

    }

    return (
        <React.Fragment>
            <Title textColor="424242">Today's Cases</Title>

            <FormControl className="chart__dropdown">
                <Select
                    variant="outlined"
                    value={colony}
                    onChange={onColonyChange}
                >
                    <MenuItem value="states">United States</MenuItem>
                    {colonies.map((colony) => (
                        <MenuItem value={colony.name}>{colony.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

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
