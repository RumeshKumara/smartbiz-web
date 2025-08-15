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
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const businessName = localStorage.getItem("businessName") || "Your Business";

  const handleQuickAction = (action, route) => {
    if (route) {
      navigate(route);
    } else {
      toast({
        title: `${action} clicked`,
        description: "This would open the corresponding feature.",
      });
    }
  };

  return (
    <DashboardLayout userRole="business">
      <div className="space-y-6 fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with {businessName} today.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{currentTime.toLocaleDateString()}</span>
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={mockMetrics.revenue.value}
            change={mockMetrics.revenue.change}
            changeType={mockMetrics.revenue.changeType}
            icon={DollarSign}
            variant="revenue"
          />
          <MetricCard
            title="Net Profit"
            value={mockMetrics.profit.value}
            change={mockMetrics.profit.change}
            changeType={mockMetrics.profit.changeType}
            icon={TrendingUp}
            variant="profit"
          />
          <MetricCard
            title="Total Expenses"
            value={mockMetrics.expenses.value}
            change={mockMetrics.expenses.change}
            changeType={mockMetrics.expenses.changeType}
            icon={DollarSign}
            variant="expense"
          />
          <MetricCard
            title="Inventory Items"
            value={mockMetrics.inventory.value}
            change={mockMetrics.inventory.change}
            changeType={mockMetrics.inventory.changeType}
            icon={Package}
            variant="inventory"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Sales */}
          <div className="lg:col-span-2">
            <Card className="metric-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      <span>Recent Sales</span>
                    </CardTitle>
                    <CardDescription>
                      Latest transactions from your business
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/sales")}
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{sale.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {sale.date}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold">{sale.amount}</p>
                        <Badge
                          variant={
                            sale.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {sale.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Common business tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full business-button-primary justify-start"
                  onClick={() => navigate("/sales")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  New Sale
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/customers")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/inventory")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/ai-assistant")}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  AI Assistant
                </Button>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="metric-card border-amber-200 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-amber-700">
                  <AlertCircle className="h-5 w-5" />
                  <span>Low Stock Alert</span>
                </CardTitle>
                <CardDescription>Items that need restocking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="text-right">
                        <span className="text-amber-700 font-semibold">
                          {item.stock}
                        </span>
                        <span className="text-muted-foreground">
                          {" "}
                          / {item.minStock}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => navigate("/inventory")}
                >
                  Manage Inventory
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
