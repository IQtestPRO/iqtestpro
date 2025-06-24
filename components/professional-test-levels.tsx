"use client"

import type React from "react"
import { Box, Typography, Grid, Button } from "@mui/material"
import { useRouter } from "next/router"

interface TestLevel {
  title: string
  description: string
  missions: {
    title: string
    description: string
    link: string
  }[]
}

interface ProfessionalTestLevelsProps {
  levels: TestLevel[]
}

const ProfessionalTestLevels: React.FC<ProfessionalTestLevelsProps> = ({ levels }) => {
  const router = useRouter()

  return (
    <Box sx={{ padding: 3 }}>
      {levels.map((level, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            {level.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {level.description}
          </Typography>
          <Grid container spacing={2}>
            {level.missions.map((mission, missionIndex) => (
              <Grid item xs={12} sm={6} md={4} key={missionIndex}>
                <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {mission.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {mission.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(mission.link.replace("/quiz/", "/mission/"))}
                  >
                    Start Mission
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default ProfessionalTestLevels
