import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, TextField, Typography, Select, MenuItem } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import { PropertyCard, CustomButton } from 'components';

const AllProperties = () => {
  const navigate = useNavigate();

  const { 
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  // check to see if we have properties if we do assign it to allProperties else return a empty array so we don't have errors
  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }])
  }

  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Error...</Typography>

  return (
    <Box>
      <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction='column' width='100%'>
          <Typography fontSize={25} fontWeight={700} color='#11142d'>
            {!allProperties.length ? 'There are no properties' : 'All Properties'}  
          </Typography>
          <Box mb={2} mt={3} display='flex' width='84%' justifyContent='space-between' flexWrap='wrap'>
            <Box display='flex' gap={2} flexWrap='wrap' mb={{ xs: '20px', sm: 0 }}>
              <CustomButton 
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓' }`}
                handleClick={() => toggleSort('price')}
                backgroundColor='#475be8'
                color='#fcfcfc'
              />
              <TextField 
                variant='outlined'
                color='info'
                placeholder='Search By Title'
                value=''
                onChange={() => {}}
              />
              <Select 
                variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=''
                value=''
                onChange={() => {}}
              >
                <MenuItem value=''>All</MenuItem>
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>



      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <CustomButton 
          title='Add Property'
          handleClick={() => navigate('/properties/create')}
          backgroundColor='#475be8'
          color='#fcfcfc'
          icon={<Add />}
        />
      </Stack>
      <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard 
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>
      {allProperties.length > 0 && (
        <Box display='flex' gap={2} mt={3} flexWrap='wrap'>
          <CustomButton 
            title='Prev'
            handleClick={() => setCurrent((prev) => prev-1)}
            backgroundColor='#475de8'
            color='#fcfcfc'
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems='center' gap='5px'>
            Page{' '}<strong>{current} of {pageCount}</strong>
          </Box>
          <CustomButton 
            title='Next'
            handleClick={() => setCurrent((prev) => prev+1)}
            backgroundColor='#475de8'
            color='#fcfcfc'
            disabled={current === pageCount}
          />
          <Select 
            variant='outlined'
            color='info'
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            value=''
            onChange={() => {}}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllProperties