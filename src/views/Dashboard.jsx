import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../actions/action";
import { Box } from "@mui/material";
import SlidingCard from "../components/SlidingCard";

const DummyCard = ({children, title}) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "400px" },
        height: { xs: "auto", sm: "400px" },
        margin: 2,
        flexGrow: 1,
      }}>
      <Card sx={{ width: "100%", height: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="div">
           {title}
          </Typography>
          <Typography variant="body2">Customer Analysis</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const Widgets = ({ title, count }) => {
  const dispatch = useDispatch();
  const adminId = useSelector((state) => {
    if (state?.company?.data?.workers) {
      return state?.company?.data?.workers[0]?._id;
    }
    return null;
  });

  useEffect(() => {
    dispatch(ActionCreators.setCurrentUser(adminId));
  });

  return (
    <Card
      sx={{
        width: { xs: "90px", sm: "120px", lg : '150px' },
        height: { xs: "auto", sm: "80px", lg : '100px' },
        backgroundColor: "#c5c9d2",
        margin: 1,
        padding: 0
      }}>
      <CardContent>
        <Typography variant='body' component="div">
          {title}
        </Typography>
        <Typography variant="h4">{count}</Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const productCount = useSelector((state) => state.products.products.length);
  const userCount = useSelector((state) => state.workers.users.length);
  const customerCount = useSelector(
    (state) => state.customers.customers.length
  );
  

  return (
    <div className="page">
      <div className="heading" style={{ background: "none" }}>
        <h1>Dashboard</h1>
      </div>

      <div className="content">
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            flexDirection: "row-reverse",
          }}>
          <Widgets title={"Employees"} count={userCount} />
          <Widgets title={"Products"} count={productCount} />
          <Widgets title={"Customers"} count={customerCount} />
        </div>
        <DummyCard title={"Overall Sales Analysis"} />
        <DummyCard title={"Most Selling Product"} />
        <DummyCard title={" Customer Analysis"} />
        <DummyCard title={"Profit Analysis"} />
        <SlidingCard />
      </div>
    </div>
  );
};

export default Dashboard;