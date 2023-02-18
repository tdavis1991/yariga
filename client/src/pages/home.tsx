import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { PieChart, PropertyReferrals, PropertyCard, TotalRevenue, TopAgent} from "components";

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Dashboard
      </Typography>
      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart 
          title='Properties for Sale'
          value={684}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart 
          title='Properties for Rent'
          value={550}
          series={[60, 40]}
          colors={['#475ce8', '#e4e8ef']}
        />
        <PieChart 
          title='Total Customers'
          value={7354}
          series={[75, 25]}
          colors={['#435be8', '#e4e8ef']}
        />
        <PieChart 
          title='Properties for Cities'
          value={438}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
      </Box>
    </Box>
  )
}

export default Home