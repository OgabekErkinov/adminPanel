import {Avatar, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const UserAccount = () => {
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
    <Tooltip title="Account" onClick={() => navigate("/account")}>
       <Avatar
           sx={{ bgcolor: "#FFFFFF", color: "#000", fontWeight: "bold" }}
           src={userAvatar || undefined}>
           {!userAvatar && userInitials}
       </Avatar>
    </Tooltip>
  )
}

export default UserAccount
