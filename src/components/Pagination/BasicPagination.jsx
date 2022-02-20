import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff"
    }
  }
}));

export default function BasicPagination({setPage, numOfPage = 10}) {
  const classes = useStyles();
  const innerTheme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });

  
  const handelPageChange = (page) => {
      setPage(page)
      window.scroll(0,0);
  }
    return (
    <div  style={{
      width: "100%",
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        backgroundColor: 'rgb(216, 216, 226)',
    }} className='pagination' >
      <ThemeProvider theme={innerTheme}>
        {/* <Stack  spacing={2}> */}
      <Pagination 
      // className={classes.root}
      onChange={(e) => handelPageChange(e.target.textContent)}
      color="primary"
          hideNextButton
          hidePrevButton
          className={classes.root}
      count={numOfPage} />
     
    {/* </Stack> */}
    </ThemeProvider>
    </div>
  );
}