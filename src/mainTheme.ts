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
        },
        breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 900,
              lg: 1200,
              xl: 1536,
            },
          },
    });

    return mainTheme;
}