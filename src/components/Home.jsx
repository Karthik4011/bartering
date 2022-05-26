import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Header from "./Header";
import cookie from "react-cookies";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ToastContainer, toast } from "react-toastify";


export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(null);

  const [loader, setLoader] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    setLoader(true);
    var dat = cookie.load("user");
    console.log(dat);
    if (!dat) {
      history("/Login");
    }
    axios({
      method: "GET",
      url: "http://localhost:8081/api/items",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      setItems(res.data);
    });
  }, []);

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Grid container justifyContent="center" style={{ marginTop: 20 }}>
        <Grid item xs={10}>
          <Typography style={{ fontSize: 18, fontStyle: "italic" }}>
            Welcome, {cookie.load("user")["name"]}
          </Typography>
        </Grid>
        <Grid item xs={10} style={{ marginTop: 20 }}>
          <Paper elevation={3}>
            <Grid
              container
              justifyContent="center"
              style={{ padding: 20 }}
              spacing={1}
            >
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <Grid container spacing={2}>
                  {items &&
                    items.map((item, key) =>
                      item.sellerid == cookie.load("user")["id"] ? (
                        <Grid item xs={3}>
                          <Card style={{ paddingBottom: "10px" }}>
                            <CardMedia
                              component="img"
                              alt="green iguana"
                              height="140"
                              image={item.image}
                            />
                            <CardContent style={{ textAlign: "left" }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                style={{
                                  "text-overflow": "ellipsis",
                                  width: "100%",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                style={{
                                  maxHeight: "40px",
                                  "text-overflow": "ellipsis",
                                  width: "100%",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                seller: {cookie.load("user")["name"]}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                style={{
                                  maxHeight: "40px",
                                  "text-overflow": "ellipsis",
                                  width: "100%",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Expectations: {item.expectations}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                style={{
                                  maxHeight: "40px",
                                  "text-overflow": "ellipsis",
                                  width: "100%",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Price: {item.price}
                              </Typography>
                            </CardContent>
                            <CardActions class="justify-center">
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  axios({
                                    method: "DELETE",
                                    url:
                                      "http://localhost:8081/api/items/" +
                                      item.id,
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }).then((res) => {
                                    window.location.reload();
                                  });
                                }}
                                color="error"
                              >
                                Delete Item
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ) : null
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      <AppBar position="fixed"  style={{boxShadow:"none",bottom:0,top:"auto"}}>
        <Toolbar>
        <div style={{flexGrow:0.5}} />
          <Button
            variant="contained"
            color="primary"
            disabled
            style={{color:"white"}}
          >
            Previous
          </Button>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Add");
              }}
            >
              Next
            </Button>
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                cookie.remove('user')
                toast.info("Application exited successfully", {
                  position: "bottom-center",
                  pauseOnHover: true,
                  draggable: true,
                  autoClose: false,
                });
                history('/Login')
              }}
            >
              Exit
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
