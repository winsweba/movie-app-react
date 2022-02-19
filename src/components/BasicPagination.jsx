import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({setPage, numOfPage = 10}) {
  
  const handelPageChange = (page) => {
      setPage(page)
      window.scroll(0,0);
  }
    return (
    <div className='pagination' >
        <Stack spacing={2}>
      <Pagination 
      onChange={(e) => handelPageChange(e.target.textContent)}
      color="primary"
          hideNextButton
          hidePrevButton
      count={numOfPage} />
     
    </Stack>
    </div>
  );
}