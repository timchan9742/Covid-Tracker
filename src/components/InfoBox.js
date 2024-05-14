import React from "react"
import {Card, CardContent, Typography} from "@material-ui/core"
import "./InfoBox.css"

function InfoBox(props) {

  return (
    <Card className="infoBox">
      <CardContent>
        <Typography variant="subtitle1" className="infoBox-title">
          {props.title}
        </Typography>
        <h2 className="infoBox-cases">+ {props.newCases}</h2>
        <Typography className="infoBox-total">
          {props.total}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
