import { createTheme } from '@mui/material/styles';



const bgDark = "#102027";
const bgLight = "#F7F8FC";


export default function createMainTheme(lightMode: "light" | "dark" | undefined) {
    const mainTheme = createTheme({
        palette: {
            mode: lightMode,      
            background: {
                default: lightMode === "light" ? bgLight : bgDark,
                paper: lightMode === "light" ? bgLight : bgDark,
            }
        },
        typography: {
            button: {
                textTransform: "none"
            }
        }
    });

    return mainTheme;
}