import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const BarChart = (props: any) => {
  const [ options, setOptions ] = useState<any>(null);
  const [ series, setSeries ] = useState<any>(null);

  useEffect(() => {
    setSeries([
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]);
    setOptions({
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    })
  }, []);
  return series && options && 
    <Chart
      options={options}
      series={series}
      type="bar"
      // width="500"
    />
}

export default BarChart