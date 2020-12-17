import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select } from '@material-ui/core/';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

export default function Chart() {
    const theme = useTheme();
    const [colonyInfo, setColonyInfo] = useState({});
    const [colonies, setColonies] = useState([]);
    const [colony, setInputColony] = useState("states");
    const [dataArr, setDataArr] = useState([
        { date: 'Day1', cases: 4000 },
        { date: 'Day2', cases: 3000 },
        { date: 'Day3', cases: 2000 },
        { date: 'Day4', cases: 2780 },
        { date: 'Day5', cases: 1890 },
        { date: 'Day6', cases: 2390 },
        { date: 'Day7', cases: 3490 },
        { date: 'Day8', cases: 4000 },
        { date: 'Day9', cases: 3000 },
        { date: 'Day10', cases: 2000 },
        { date: 'Day11', cases: 2780 },
        { date: 'Day11', cases: 1890 },
        { date: 'Day12', cases: 2390 },
        { date: 'Day13', cases: 3490 },
        { date: 'Day14', cases: 4000 },
        { date: 'Day15', cases: 3000 },
        { date: 'Day16', cases: 2000 },
        { date: 'Day17', cases: 2780 },
        { date: 'Day18', cases: 1890 },
        { date: 'Day19', cases: 2390 },
        { date: 'Day20', cases: 3490 },
        { date: 'Day21', cases: 4000 },
        { date: 'Day22', cases: 3000 },
        { date: 'Day23', cases: 2000 },
        { date: 'Day24', cases: 2780 },
        { date: 'Day25', cases: 1890 },
        { date: 'Day26', cases: 2390 },
        { date: 'Day27', cases: 3490 },
        { date: 'Day28', cases: 2390 },
        { date: 'Day29', cases: 3490 },
        { date: 'Day30', cases: 3490 },
    ]);


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/states")
            .then((response) => response.json())
            .then((data) => {
                setColonyInfo(data);
                console.log(colonyInfo);
            });
    }, [colonyInfo]);

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
        let colonyCode = e.target.value;
        setInputColony(e.target.value);
        // remove whitespace from colonyCode
        let newColonyCode;
        const fixCode = (colonyCode) => {
            newColonyCode = colonyCode.replace(' ', `%20`).toLowerCase();
            console.log('this is the code', colonyCode);
        }
        fixCode(colonyCode);
        // change URL
        const url =
            newColonyCode === "states"
                ? "https://disease.sh/v3/covid-19/nyt/states?lastdays=30"
                : `https://disease.sh/v3/covid-19/nyt/states/${newColonyCode}?lastdays=all`

        // API Call
        const getStateHistory = async () => {
            console.log(url)
            await fetch(url)
                .then((response) => response.json())
                .then((results) => {
                    const stateHistory = results;
                    console.log('this is stateHistory', stateHistory);
                    console.log('this is dataArr', dataArr);
                    // setChartdataArr(stateHistory);
                    const newDataArr = [];
                    console.log('this is dataArr', dataArr);
                    stateHistory.map((day) => {
                        const dayObject = { date: day.date, cases: day.cases };
                        newDataArr.push(dayObject);
                    })
                    setDataArr(newDataArr);
                    console.log('this is dataArr', dataArr);
                    // Error, not loading first onChange
                    // console.log('this is chartdataArr', chartdataArr);
                });
        };
        getStateHistory();
    };

    return (
        <React.Fragment>
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
            <ResponsiveContainer>
                <LineChart
                    data={dataArr}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <Tooltip />
                    <XAxis dataKey="date" stroke={theme.palette.text.white} />
                    <YAxis stroke={theme.palette.text.white}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text, color: '#FF0344' }}
                        >
                            Active cases
            </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="cases" stroke={theme.palette.pink} dot={true} />
                    <Line type="monotone" dataKey="deaths" stroke={theme.palette.pink} dot={true} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );

}
