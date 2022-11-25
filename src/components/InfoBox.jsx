/** @format */

import { Card, CardContent, Typography } from "@mui/material"
import React from "react"

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="flex-1 flex flex-col justify-center">
      <CardContent>
        <Typography className="infoBoxTitle" color="textSecondary">
          {title}
        </Typography>
        {/* total number of cases */}
        <h2 className="font-semibold">{cases}</h2>
        <Typography
          className="infoBoxTotal flex flex-row"
          color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
