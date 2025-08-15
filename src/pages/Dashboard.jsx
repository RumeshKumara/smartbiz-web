import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  DollarSign,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  Brain,
  Plus,
  ArrowRight,
  Calendar,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/dashboard/MetricCard";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Chip,
  Grid,
  Typography,
  Box,
  Stack,
} from "@mui/material";

// Mock data - in a real app, this would come from an API
const mockMetrics = {
  revenue: {
    value: "$24,580",
    change: "+12.5% from last month",
    changeType: "positive",
  },
  profit: {
    value: "$8,420",
    change: "+8.2% from last month",
    changeType: "positive",
  },
  expenses: {
    value: "$16,160",
    change: "+2.1% from last month",
    changeType: "negative",
  },
  inventory: {
    value: "1,247",
    change: "-5 items low stock",
    changeType: "neutral",
  },
};

const recentSales = [
  {
    id: 1,
    customer: "Tech Solutions Inc.",
    amount: "$2,450",
    date: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    customer: "Marketing Pro Ltd.",
    amount: "$1,890",
    date: "4 hours ago",
    status: "pending",
  },
  {
    id: 3,
    customer: "Design Studio",
    amount: "$3,200",
    date: "6 hours ago",
    status: "completed",
  },
  {
    id: 4,
    customer: "Startup Hub",
    amount: "$890",
    date: "1 day ago",
    status: "completed",
  },
];

const lowStockItems = [
  { name: "Wireless Headphones", stock: 5, minStock: 20 },
  { name: "USB-C Cables", stock: 8, minStock: 25 },
  { name: "Phone Cases", stock: 12, minStock: 30 },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const businessName = localStorage.getItem("businessName") || "Your Business";

  return (
    <DashboardLayout userRole="business">
      <Box>
        {/* Welcome Header */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          mb={3}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome back! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with {businessName} today.
            </Typography>
          </Box>
          <Box mt={{ xs: 2, sm: 0 }}>
            <Chip
              variant="outlined"
              icon={<Calendar size={14} />}
              label={currentTime.toLocaleDateString()}
            />
          </Box>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Total Revenue"
              value={mockMetrics.revenue.value}
              change={mockMetrics.revenue.change}
              changeType={mockMetrics.revenue.changeType}
              icon={DollarSign}
              variant="revenue"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Net Profit"
              value={mockMetrics.profit.value}
              change={mockMetrics.profit.change}
              changeType={mockMetrics.profit.changeType}
              icon={TrendingUp}
              variant="profit"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Total Expenses"
              value={mockMetrics.expenses.value}
              change={mockMetrics.expenses.change}
              changeType={mockMetrics.expenses.changeType}
              icon={DollarSign}
              variant="expense"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Inventory Items"
              value={mockMetrics.inventory.value}
              change={mockMetrics.inventory.change}
              changeType={mockMetrics.inventory.changeType}
              icon={Package}
              variant="inventory"
            />
          </Grid>
        </Grid>

        {/* Two-column layout */}
        <Grid container spacing={3}>
          {/* Recent Sales - Left Column */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <ShoppingCart size={18} />
                    <span>Recent Sales</span>
                  </Box>
                }
                subheader="Latest transactions from your business"
                action={
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/sales")}
                    endIcon={<ArrowRight size={16} />}
                  >
                    View All
                  </Button>
                }
              />
              <CardContent>
                <Stack spacing={1.5}>
                  {recentSales.map((sale) => (
                    <Box
                      key={sale.id}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                      }}
                    >
                      <Box>
                        <Typography fontWeight={600}>
                          {sale.customer}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {sale.date}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography fontWeight={700}>{sale.amount}</Typography>
                        <Chip
                          size="small"
                          label={sale.status}
                          color={
                            sale.status === "completed" ? "success" : "warning"
                          }
                          variant="filled"
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column: Quick Actions + Alerts */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card>
                <CardHeader
                  title={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Plus size={18} />
                      <span>Quick Actions</span>
                    </Box>
                  }
                  subheader="Common business tasks"
                />
                <CardContent>
                  <Stack spacing={1.5}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate("/sales")}
                      startIcon={<ShoppingCart size={16} />}
                    >
                      New Sale
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/customers")}
                      startIcon={<Users size={16} />}
                    >
                      Add Customer
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/inventory")}
                      startIcon={<Package size={16} />}
                    >
                      Add Product
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/ai-assistant")}
                      startIcon={<Brain size={16} />}
                    >
                      AI Assistant
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ borderColor: "warning.light" }} variant="outlined">
                <CardHeader
                  title={
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      color="warning.main"
                    >
                      <AlertCircle size={18} />
                      <span>Low Stock Alert</span>
                    </Box>
                  }
                  subheader="Items that need restocking"
                />
                <CardContent>
                  <Stack spacing={1.5}>
                    {lowStockItems.map((item, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography fontWeight={600} variant="body2">
                          {item.name}
                        </Typography>
                        <Box textAlign="right">
                          <Typography
                            color="warning.main"
                            fontWeight={700}
                            component="span"
                          >
                            {item.stock}
                          </Typography>
                          <Typography color="text.secondary" component="span">
                            {` / ${item.minStock}`}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/inventory")}
                  >
                    Manage Inventory
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
