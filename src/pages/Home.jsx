import { Box, Stack, AppBar, Toolbar, IconButton, Avatar, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import MenuBar from "../components/MenuBar";
import { MenuOutlined } from "@mui/icons-material";

const Home = () => {
    const [openMenu, setOpenMenu] = useState(true);
    const navigate = useNavigate();
    const [userAvatar, setUserAvatar] = useState(null);
    const [userInitials, setUserInitials] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }

        const avatar = localStorage.getItem("avatar");
        const name = localStorage.getItem("name") || "";
        const surname = localStorage.getItem("surname") || "";

        if (avatar) {
            setUserAvatar(avatar);
        } else if (name || surname) {
            const initials = `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
            setUserInitials(initials);
        } else {
            setUserInitials("😊");
        }
    }, [navigate]);

    return (
        <Box height="100vh" width="100%" sx={{ background: "linear-gradient(135deg, #000, #6D6D6D)" }}>
            <Stack direction="row" height="100%" width="100%">
                <MenuBar open={openMenu} setOpen={setOpenMenu} />
                <Stack flex={1}>
                    <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <IconButton edge="start" color="inherit" onClick={() => setOpenMenu(!openMenu)}>
                                <MenuOutlined />
                            </IconButton>

                            <Tooltip title="Account" onClick={() => navigate("/account")}>
                                <Avatar
                                    sx={{ bgcolor: "#FFFFFF", color: "#000", fontWeight: "bold" }}
                                    src={userAvatar || undefined}
                                >
                                    {!userAvatar && userInitials}
                                </Avatar>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                    <Box>
                        <Outlet />
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Home;
