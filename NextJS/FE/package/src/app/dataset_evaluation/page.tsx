//localhost newpage
'use client'
import { Grid2 as Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import DailyActivity from '@/app/(DashboardLayout)/components/dashboard/DailyActivity';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import BlogCard from '@/app/(DashboardLayout)/components/dashboard/Blog';
// テストで追加
import { Button } from "./components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import Modal from "./components/modal";
const RouteIdentifier = "show-info";


const Dashboard = () => {

  return (

    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <div>this is new page</div>
        <Grid container spacing={0}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid
            size={{
              xs: 12,
              lg: 12
            }}>
            <SalesOverview />
          </Grid>
          <Grid size={{
              xs: 12,
              lg: 12
            }}>
            <ProductPerformance />
          </Grid>          
        </Grid>
      </Box>
      
    </PageContainer>

  );
};

export default Dashboard;