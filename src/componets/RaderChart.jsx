import React from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from "recharts";


const RaderChart = ({ userInfo }) => {

    const data = [
        {
            subject: "最高得点",
            A: userInfo.highscore,
            B: 110,
            fullMark: 150
        },
        {
            subject: "クリア数",
            A: userInfo.point,
            B: 10,
            fullMark: 150
        },
        {
            subject: "ミス数",
            A: userInfo.miss,
            B: 130,
            fullMark: 150
        },
    ];

    return (
        <div>
            <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                width={500}
                height={500}
                data={data}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                    name="Mike"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </div>
    )
}

export default RaderChart