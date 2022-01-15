import { createTheme } from '@mui/material/styles';
import { LightStatus } from "./features/theme/types";


const bgDark = "#102027";
const bgLight = "#F7F8FC";


export default function createMainTheme(lightMode: LightStatus) {
    const mainTheme = createTheme({
        palette: {
            mode: lightMode === LightStatus.LIGHT ? "light" : "dark",      
            background: {
                default: lightMode === LightStatus.LIGHT ? bgLight : bgDark,
                paper: lightMode === LightStatus.LIGHT ? bgLight : bgDark,
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
              xl: 1440,
            },
          },
    });

    return mainTheme;
}