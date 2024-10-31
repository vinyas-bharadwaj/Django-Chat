import { useMediaQuery } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { ReactNode, useState } from "react";
import createMuiTheme from "../theme/theme";


interface ToggleColorModeProps {
    children: ReactNode;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({children}) => {
    const [mode, setMode] = useState<"light" | "dark">(
        () => (localStorage.getItem("colorMode") as "light" | "dark")
    ) || (useMediaQuery("([perfers-color-schema: dark])") ? "dark": "light");

    const toggleColor = React.useCallback(() => {
        setMode((prevMode) => (prevMode === "light" ? "dark": "light"));
    }, []);

    useEffect(() => {
        localStorage.setItem("colorMode", mode);
    }, [mode]);

    const colorMode = useMemo(() => ({ toggleColor }), [toggleColor]);

    const theme = React.useMemo(() => createMuiTheme(mode), [mode])

    return (
        
    )
};

export default ToggleColorMode;