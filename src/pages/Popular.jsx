import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React from 'react'

export default function Popular() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className='container'>
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} />
    </Stack>
 
    </div>
  )
}
