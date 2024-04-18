import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const DummyCard = () => {
  return (
    <Card sx={{ minWidth: 400, minHeight: 400, margin: 2, flexGrow: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Dummy Card
        </Typography>
        <Typography variant="body2">This is a dummy card.</Typography>
      </CardContent>
    </Card>
  );
};

const Widgets = ({ title, count }) => {
  return (
    <Card
      sx={{
        minWidth: 200,
        Height: 30,
        backgroundColor: "#c5c9d2",
        margin: 1,
      }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3">{count}</Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const productCount = useSelector(state => state.products.products.length)
  const userCount = useSelector(state => state.users.users.length)
  const customerCount = useSelector(state => state.customers.customers.length)
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
            flexDirection: "row-reverse",
          }}>
          
          <Widgets title={"Employees"} count={userCount} />
          <Widgets title={"Products"} count={productCount} />
          <Widgets title={"Customers"} count={customerCount} />
        </div>
        <DummyCard />
        <DummyCard />
        <DummyCard />
      </div>
    </div>
  );
};

export default Dashboard;
