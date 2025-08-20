import { DashboardLayout } from "../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    totalSpent: "$12,450",
    lastOrder: "2 days ago",
    status: "active",
    avatar: "",
  },
  {
    id: 2,
    name: "Marketing Pro Ltd.",
    email: "hello@marketingpro.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, CA",
    totalSpent: "$8,920",
    lastOrder: "1 week ago",
    status: "active",
    avatar: "",
  },
  {
    id: 3,
    name: "Design Studio",
    email: "info@designstudio.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    totalSpent: "$15,670",
    lastOrder: "3 days ago",
    status: "vip",
    avatar: "",
  },
  {
    id: 4,
    name: "Startup Hub",
    email: "team@startuphub.com",
    phone: "+1 (555) 321-0987",
    location: "Austin, TX",
    totalSpent: "$3,200",
    lastOrder: "2 weeks ago",
    status: "inactive",
    avatar: "",
  },
];

export default function Customers() {
  const { toast } = useToast();

  const handleAction = (action, customerName) => {
    toast({
      title: `${action}`,
      description: customerName
        ? `Action for ${customerName}`
        : "Feature coming soon!",
    });
  };

  return (
    <DashboardLayout userRole="business">
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <span>Customers</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your customer relationships and track their activity
            </p>
          </div>
          <Button
            className="business-button-primary mt-4 sm:mt-0"
            onClick={() => handleAction("Add Customer")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="metric-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search customers..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("Filter: All")}
                >
                  All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("Filter: Active")}
                >
                  Active
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("Filter: VIP")}
                >
                  VIP
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("Filter: Inactive")}
                >
                  Inactive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {customers.map((customer) => (
            <Card key={customer.id} className="metric-card business-hover">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {customer.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{customer.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge
                      variant={
                        customer.status === "vip"
                          ? "default"
                          : customer.status === "active"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        customer.status === "vip"
                          ? "bg-gradient-primary text-white"
                          : ""
                      }
                    >
                      {customer.status.toUpperCase()}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-semibold text-foreground">
                          {customer.totalSpent}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{customer.lastOrder}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction("Email", customer.name)}
                  >
                    <Mail className="mr-1 h-3 w-3" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction("View Details", customer.name)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="business-button-primary"
                    onClick={() => handleAction("New Order", customer.name)}
                  >
                    New Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
