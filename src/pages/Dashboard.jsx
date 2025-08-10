import { Box, Typography, Grid } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/dashboard/MetricCard";

function Dashboard() {
  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Business Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your business management dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Sales"
            value="$24,780"
            trend="+12.5%"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="New Customers"
            value="142"
            trend="+22.3%"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Average Order"
            value="$175"
            trend="-3.2%"
            isPositive={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Conversion Rate"
            value="3.8%"
            trend="+0.5%"
            isPositive={true}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
