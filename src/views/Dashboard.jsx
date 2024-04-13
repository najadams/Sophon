  import React from "react";
  import Card from "@mui/material/Card";
  import CardContent from "@mui/material/CardContent";
  import Typography from "@mui/material/Typography";

  const DummyCard = () => {
    return (
      <Card sx={{ minWidth: 400,minHeight: 400, margin: 2, flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Dummy Card
          </Typography>
          <Typography variant="body2">This is a dummy card.</Typography>
        </CardContent>
      </Card>
    );
  };

  const Dashboard = () => {
    return (
      <div className="page">
        <div className="heading">
          <h1>Dashboard</h1>
        </div>
        <div className="content">
          <DummyCard />
          <DummyCard />
          <DummyCard />
          <DummyCard />
        </div>
      </div>
    );
  };

  export default Dashboard;
