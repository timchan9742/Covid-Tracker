import React, {useState, useEffect} from "react"
import {Line} from "react-chartjs-2"
import numeral from "numeral"

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0")
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLine: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a")
          },
        },
      },
    ],
  },
}

function Graph(props) {

  const [data, setData] = useState({})
  const [country, setCountry] = useState("worldwide")

  const getChartData = (data, caseType) => {
    const chartData = []
    let lastDataPoint;
    for(let date in data.cases) {
      if(lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDataPoint
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[caseType][date]
    }
    return chartData
  }

  useEffect(() => {
    const targetURL = country === "worldwide"? "https://disease.sh/v3/covid-19/historical/all" :
    `https://disease.sh/v3/covid-19/historical/${props.countryCode}`
    const getData = async () => {
      await fetch(targetURL)
      .then(response => response.json())
      .then(data => {
        let chartData = getChartData(data, props.caseType)
        setData(chartData)
      })
    }
    getData()
  }, [])


  return (
    <div>
      {data?.length > 0 && (
        <Line
          width={400}
          height={200}
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1032",
                fill: false,
              }
            ]
          }} />
      )}
    </div>
  )
}

export default Graph
