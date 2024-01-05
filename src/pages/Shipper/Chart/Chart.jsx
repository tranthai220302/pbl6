import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

class Chart extends Component {
  render() {
    const { data, dateTitle } = this.props;
    console.log(data)
    const chartData = data?.map((value, index) => ({
      name: dateTitle[index],
      "Dữ liệu": value,
    }));

    return (
      <div>
        <ResponsiveContainer className="chart" height={300}>
          <LineChart
            height={400}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Dữ liệu" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
