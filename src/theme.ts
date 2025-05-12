// theme.ts or your theme file
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customColors: {
      darkBlue: string;
      lightGreen: string;
      background: string;
      headerText: string;
      headersubText?: string;
      textClr?: string;
      bgcolour: string,
      searchbg?: string;
      stroke1?:string;
      stroke2?:string;
      stroke3?:string;
      cartesianGrid?:string;
    };
    customClasses: {
      StyledDataBox: React.CSSProperties;
      Title: React.CSSProperties;
      Value: React.CSSProperties;
      Change: React.CSSProperties;
      buttonPrimary: string;
      card: string;
      StyledDataDateBox: React.CSSProperties;
      DateBoxTitle: React.CSSProperties;
      HeaderBox: React.CSSProperties;
      DateblockTitle: React.CSSProperties;
      StyledChartBox: React.CSSProperties;
      PieChartBox: React.CSSProperties;
      TableHeaderCell : React.CSSProperties;
      TableCell : React.CSSProperties;
      TableRow: React.CSSProperties;
      StyledTableBox?: React.CSSProperties;
      FiltersBox:React.CSSProperties;
    };
    TanstackTable?:{
      TableHeaderDiv?: React.CSSProperties;
    };
    TanstackForm?: {
      Header: string;
    }
  }

  interface ThemeOptions {
    customColors?: {
      darkBlue?: string;
      lightGreen?: string;
      background?: string;
      headerText?: string;
      headersubText?: string;
      textClr?: string;
      bgcolour?: string,
      searchbg?: string;
      stroke1?:string;
      stroke2?:string;
      stroke3?:string;
      cartesianGrid?:string;
    };
    customClasses?: {
      StyledDataBox?: React.CSSProperties;
      Title?: React.CSSProperties;
      Value?: React.CSSProperties;
      Change?: React.CSSProperties;
      buttonPrimary?: string;
      card?: string;
      StyledDataDateBox?: React.CSSProperties;
      DateBoxTitle?: React.CSSProperties;
      HeaderBox?: React.CSSProperties;
      DateblockTitle?: React.CSSProperties;
      StyledChartBox?: React.CSSProperties;
      PieChartBox?: React.CSSProperties;
      TableHeaderCell ?: React.CSSProperties;
      TableCell ?: React.CSSProperties;
      TableRow?: React.CSSProperties;
      StyledTableBox?: React.CSSProperties;
      FiltersBox?:React.CSSProperties;
    };
    TanstackTable?:{
      TableHeaderDiv?: React.CSSProperties;
    };
    TanstackForm?: {
      Header: string;
    }
  }
}

const createAppTheme = (mode: "light" | "dark") => {
  const isLightMode = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLightMode ? "#007bff" : "#90caf9",
      },
      secondary: {
        main: isLightMode ? "#6c757d" : "#bdbdbd",
      },
      background: {
        default: isLightMode ? "#dce5eb" : "#121212",
        paper: isLightMode ? "#ffffff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    customColors: {
      darkBlue: isLightMode ? "#003366" : "#90caf9",
      lightGreen: isLightMode ? "#90EE90" : "#66bb6a",
      background: isLightMode ? "#01ae90" : "#019980",
      /////dateblock text///////
      headerText: isLightMode ? "#ffffff" : "#ffffff",
      headersubText: isLightMode ? "#ffffff" : "#ffffff",
      //////// charts graphs and heatmaps text colour ////////
      textClr: isLightMode ? "#000000" : "#ffffff",
      ///////table and filter boxesbg/////
      bgcolour: isLightMode ? "#dce5eb" : "#121212",
      //////filter box color//////
      searchbg: isLightMode ? "#ffffff" : "#2c2c2c",
      //////linechart stroke////////
      stroke1: isLightMode ? "#f10000" : "#00d94d",
      stroke2: isLightMode ? "#00a332" : "#f10000",
      stroke3: isLightMode ? "#001fff" : "#00e7ff",
      cartesianGrid : isLightMode ? "#d8d9da" : "#4a4a4a",

    },
    customClasses: {
      /////datablocks dashboard////////
      StyledDataBox: {
        backgroundColor: isLightMode ? "#ffffff" : "#2f2e2e",
        padding: "16px",
        borderRadius: "8px",
        margin: "10px auto",
        boxShadow: isLightMode
          ? "2px 2px 10px #34343440"
          : "0px 4px 8px rgba(0, 0, 0, 0.5)",
      },
      Title: {
        color: isLightMode ? "#000000" : "#01ae90",
        fontSize: "0.975rem",
        fontWeight: "bold",
      },
      Value: {
        color: isLightMode ? "#42b5e6" : "#90caf9",
        fontWeight: "bold",
        fontSize: "1.5rem",
      },
      Change: {
        color: isLightMode ? "#000000" : "#ffffff",
        fontSize: "0.875rem",
      },

      /////////////dateblock dashboard//////////////
      DateblockTitle: {
        color: isLightMode ? "#ffffff" : "#ffffff",
        fontSize: "0.900rem",
        fontWeight: "bold",
      },

      StyledDataDateBox: {
        backgroundColor: isLightMode ? "#01ae90" : "#2f2e2e",
        padding: "12px",
        borderRadius: "8px",
        margin: "8px auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100%",
        marginBottom: "16px",
      },
      DateBoxTitle: {
        color: isLightMode ? "#ffffff" : "#ffffff",
        fontWeight: "bold",
        fontSize: "1.2rem",
      },

      ////////headerBox///////////
      HeaderBox: {
        backgroundColor: isLightMode ? "#01ae90" : "#019980",
        padding: "24px",
        marginTop: "48px",
        marginBottom: "24px",
        borderRadius: "8px",
        textAlign: "center",
        width: "100%",

      },
      ////////////styles box for barchart heatmap and line chart ////////////
      StyledChartBox: {
        backgroundColor: isLightMode ? "#ffffff" : "#1a1a1a",
        padding: "16px",
        borderRadius: "8px",
        margin: "10px auto",
        marginTop: "25px",
        boxShadow: isLightMode
          ? "2px 2px 10px #34343440"
          : "0px 4px 8px rgba(0, 0, 0, 0.5)",
      },
      ////////////piechart block///////////
      PieChartBox: {
        backgroundColor: isLightMode ? "#ffffff" : "#1a1a1a",
        padding: "16px",
        borderRadius: "8px",
        margin: "10px auto",
        boxShadow: isLightMode
          ? "5px 5px 5px rgba(7, 6, 22, 0.31)"
          : "0px 4px 8px rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        gap: "32px",
        marginTop: "25px",
      },
      ////////table row coloumn header///////

      TableRow: {
        display: "flex",
        alignItems: "center",
        borderBottom: isLightMode ? "1px solid #cfcaca" : "1px solid #333333",
        padding: "8px",
      },

      TableCell: {
        color: isLightMode ? "#000000" : "#ffffff",
        flex: 1,
        minWidth: "100px",
      },

      TableHeaderCell: {
        color: isLightMode ? "#000000" : "#ffffff",
        flex: 1,
        minWidth: "100px",
        fontWeight: "bold",
      },

      StyledTableBox: {
        backgroundColor: isLightMode ? "#ffffff" : "#1a1a1a",
        padding: "16px",
        borderRadius: "8px",
        margin: "10px auto",
        marginTop: "25px",
        boxShadow: isLightMode
          ? "1px 1px 6px #48484847"
          : "0px 4px 8px rgba(0, 0, 0, 0.5)",
      },

//////////////filterbox/////////////////

       FiltersBox : ({
        backgroundColor: isLightMode ? "#ffffff9c" : "#1a1a1a", // Light mode or dark mode background
        padding: "16px", // Equivalent to theme.spacing(2) in px
        borderRadius: "8px", // Equivalent to theme.shape.borderRadius
        display: "flex",
        alignItems: "center",
        gap: "16px", // Equivalent to theme.spacing(2) in px
        marginBottom: "0px", // Equivalent to theme.spacing(2) in px
      }),
      


      buttonPrimary: `
      background-color: ${isLightMode ? "#007bff" : "#90caf9"};
      color: white;
      border: #01ae90;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    `,
      card: `background-color: ${
        isLightMode ? "#ffffff" : "#1e1e1e"
      }; box-shadow: ${
        isLightMode
          ? "0px 4px 6px rgba(0, 0, 0, 0.1)"
          : "0px 4px 6px rgba(0, 0, 0, 0.5)"
      }; border-radius: 8px; padding: 16px;`,
    },
    TanstackTable: {
      TableHeaderDiv: {
        background: isLightMode ? "#01ae90":"#2f2e2e"
      }
    },
    TanstackForm: {
      Header: isLightMode ? "#01ae90":"#019980"
    }

  });
};

export default createAppTheme;
