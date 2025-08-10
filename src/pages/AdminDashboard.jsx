import { Box, Typography, Grid } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/dashboard/MetricCard";

function AdminDashboard() {
  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the administrator management console
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Businesses"
            value="38"
            trend="+5.2%"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="New Signups"
            value="7"
            trend="+16.7%"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Support Tickets"
            value="12"
            trend="-8.3%"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Platform Uptime"
            value="99.8%"
            trend="+0.1%"
            isPositive={true}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default AdminDashboard;
