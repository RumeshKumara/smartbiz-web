import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { TrendingUp, TrendingDown } from "lucide-react";

// Flexible MetricCard: supports either
// - Admin: { trend, isPositive }
// - Business: { change, changeType, icon: Icon, variant }
function MetricCard(props) {
  const {
    title,
    value,
    trend,
    isPositive,
    change,
    changeType,
    icon: Icon,
    variant,
  } = props;

  const paletteByVariant = {
    revenue: { bg: "#ecfdf5", fg: "#065f46" },
    profit: { bg: "#eef2ff", fg: "#3730a3" },
    expense: { bg: "#fff7ed", fg: "#9a3412" },
    inventory: { bg: "#f5f3ff", fg: "#6d28d9" },
  };
  const colors = variant && paletteByVariant[variant];

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        height: "100%",
        transition: "transform 0.25s, box-shadow 0.25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          {Icon ? (
            <Box
              sx={{
                bgcolor: colors?.bg || "action.hover",
                color: colors?.fg || "text.primary",
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
              }}
            >
              <Icon size={18} />
            </Box>
          ) : null}
        </Box>

        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          {value}
        </Typography>

        {/* Footer / Trend Row */}
        {typeof trend !== "undefined" ? (
          <Box display="flex" alignItems="center">
            {isPositive ? (
              <TrendingUp
                size={16}
                color="#16a34a"
                style={{ marginRight: 6 }}
              />
            ) : (
              <TrendingDown
                size={16}
                color="#dc2626"
                style={{ marginRight: 6 }}
              />
            )}
            <Typography
              variant="body2"
              sx={{
                color: isPositive ? "success.main" : "error.main",
                fontWeight: 500,
              }}
            >
              {trend}
            </Typography>
          </Box>
        ) : null}

        {typeof change !== "undefined" ? (
          <Chip
            size="small"
            label={change}
            sx={{
              mt: 0.5,
              fontWeight: 500,
              bgcolor:
                changeType === "positive"
                  ? "#dcfce7"
                  : changeType === "negative"
                  ? "#fee2e2"
                  : "action.hover",
              color:
                changeType === "positive"
                  ? "#166534"
                  : changeType === "negative"
                  ? "#7f1d1d"
                  : "text.secondary",
            }}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}

export default MetricCard;
