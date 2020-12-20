import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select } from '@material-ui/core/';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import moment from 'moment';

function formatDate(date) {
    return moment(date).format('L');
}

function formatAxis(tick) {
    return moment(tick).format('MM/YY');
}

export default function Chart() {
    const theme = useTheme();
    const [colonyInfo, setColonyInfo] = useState({});
    const [colonies, setColonies] = useState([]);
    const [colony, setInputColony] = useState("states");
    const [dataArr, setDataArr] = useState([
        { date: '01-01-20', cases: 4000 },
        { date: '02-01-20', cases: 3000 },
        { date: '03-01-20', cases: 2000 },
        { date: '04-01-20', cases: 2780 },
        { date: '05-01-20', cases: 1890 },
        { date: '06-01-20', cases: 2390 },
        { date: '07-01-20', cases: 3490 },
        { date: '08-01-20', cases: 4000 },
        { date: '09-01-20', cases: 3000 },
        { date: '10-01-20', cases: 2000 },
        { date: '11-01-20', cases: 2780 },
        { date: '12-01-20', cases: 1890 },


    ]);


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/states")
            .then((response) => response.json())
            .then((data) => {
                setColonyInfo(data);
                // console.log(colonyInfo);
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
                ? "https://disease.sh/v3/covid-19/nyt/states?lastdays=all"
                : `https://disease.sh/v3/covid-19/nyt/states/${newColonyCode}?lastdays=all`

        // API Call using updated 
        const getStateHistory = async () => {
            console.log(url)
            await fetch(url)
                .then((response) => response.json())
                .then((results) => {
                    const stateHistory = results;
                    // console.log('this is stateHistory', stateHistory);
                    // console.log('this is dataArr', dataArr);
                    // setChartdataArr(stateHistory);
                    const newDataArr = [];
                    // console.log('this is dataArr', dataArr);
                    stateHistory.map((day) => {
                        const dayObject = { date: day.date, cases: day.cases };
                        newDataArr.push(dayObject);
                    })
                    setDataArr(newDataArr);
                    console.log('this is newdataArr', newDataArr);
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
                    {colonies.map((colony, id) => (
                        <MenuItem key={id} value={colony.name}>{colony.name}</MenuItem>
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
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} labelFormatter={formatDate} />
                    <XAxis dataKey="date" dy={10} tickFormatter={formatAxis} tickCount={8} stroke={theme.palette.text.white} />
                    <YAxis yAxisId="left" dx={-5} tickFormatter={(tick) => { return tick.toLocaleString(); }} stroke={theme.palette.text.white}>

                    </YAxis>
                    <Line yAxisId="left" type="monotone" dataKey="cases" stroke={'#000000'} dot={true} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );

}
