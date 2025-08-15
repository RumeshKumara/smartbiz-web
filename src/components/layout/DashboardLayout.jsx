import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { LogOut, Menu as MenuIcon, User, Building2 } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const businessName = localStorage.getItem("businessName");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/");
    handleCloseUserMenu();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#000000" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              <Building2 style={{ marginRight: "8px" }} />
              SmartBiz {userRole === "business" && `- ${businessName}`}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userRole}
                    sx={{
                      bgcolor: userRole === "admin" ? "#f50057" : "#3f51b5",
                    }}
                  >
                    {userRole === "admin" ? "A" : "B"}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <User size={18} />
                  </ListItemIcon>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOut size={18} />
                  </ListItemIcon>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                SmartBiz
              </Typography>
            </ListItem>
            <Divider />
            {/* Add sidebar navigation items here */}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
