import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core/';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

export default function Chart() {
    const theme = useTheme();
    const [colonyInfo, setColonyInfo] = useState({});
    const [colonies, setColonies] = useState([]);
    const [colony, setInputColony] = useState("states");
    const [dataArr, setDataArr] = useState([
        { date: 'Day1', cases: 4000 },
        { date: 'Page B', cases: 3000 },
        { date: 'Page C', cases: 2000 },
        { date: 'Page D', cases: 2780 },
        { date: 'Page E', cases: 1890 },
        { date: 'Page F', cases: 2390 },
        { date: 'Page G', cases: 3490 },
        { date: 'Day1', cases: 4000 },
        { date: 'Page B', cases: 3000 },
        { date: 'Page C', cases: 2000 },
        { date: 'Page D', cases: 2780 },
        { date: 'Page E', cases: 1890 },
        { date: 'Page F', cases: 2390 },
        { date: 'Page G', cases: 3490 },
        { date: 'Day1', cases: 4000 },
        { date: 'Page B', cases: 3000 },
        { date: 'Page C', cases: 2000 },
        { date: 'Page D', cases: 2780 },
        { date: 'Page E', cases: 1890 },
        { date: 'Page F', cases: 2390 },
        { date: 'Page G', cases: 3490 },
        { date: 'Day1', cases: 4000 },
        { date: 'Page B', cases: 3000 },
        { date: 'Page C', cases: 2000 },
        { date: 'Page D', cases: 2780 },
        { date: 'Page E', cases: 1890 },
        { date: 'Page F', cases: 2390 },
        { date: 'Page G', cases: 3490 },
        { date: 'Page F', cases: 2390 },
        { date: 'Page G', cases: 3490 },
    ]);


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
                : `https://disease.sh/v3/covid-19/nyt/states/${newColonyCode}?lastdays=30`

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
