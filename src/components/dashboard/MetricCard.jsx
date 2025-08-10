import { Box, Card, CardContent, Typography } from "@mui/material";
import { TrendingUp, TrendingDown } from "lucide-react";

function MetricCard({ title, value, trend, isPositive }) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 4,
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {value}
        </Typography>
        <Box display="flex" alignItems="center">
          {isPositive ? (
            <TrendingUp size={16} color="#4caf50" style={{ marginRight: 4 }} />
          ) : (
            <TrendingDown
              size={16}
              color="#f44336"
              style={{ marginRight: 4 }}
            />
          )}
          <Typography
            variant="body2"
            sx={{
              color: isPositive ? "success.main" : "error.main",
              fontWeight: "medium",
            }}
          >
            {trend}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MetricCard;
