import React, {useState, useEffect} from "react"
import { DataGrid } from "@material-ui/data-grid";
import "./Table.css"

function Table() {

  const [rowDate, setRowData] = useState([])

  useEffect(() => {
    const targetURL = "https://disease.sh/v3/covid-19/countries"
    const getCountries = async () => {
      await fetch(targetURL)
      .then(response => response.json())
      .then(data => {
        var id = 1
        setRowData(data.map(country => ({
          id: id++,
          countryName: country.country,
          cases: country.cases
        })))
      })
    }
    getCountries()
  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'countryName', headerName: 'Country', width: 130 },
    { field: 'cases', headerName: 'Cases', width: 130 },
  ];

  return (
    <div className="table" style={{ height: 380, width: '100%' }}>
      <DataGrid rows={rowDate} columns={columns} pageSize={5} checkboxSelection/>
    </div>
  )
}

export default Table
