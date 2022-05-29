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
import Paper from "@mui/material/Paper";
import cookie from "react-cookies";
import axios from "axios";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";



export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [loader, setLoader] = React.useState(true);
  const [nots, setNotes] = React.useState(null);

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
    axios({
      method: "POST",
      url: "http://localhost:8081/api/getnotifications",
      data: {
        userid: cookie.load("user")["id"],
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      setNotes(res.data);
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
          <Paper elevation={3}>
            <Grid container style={{ padding: 20 }} spacing={1}>
              <Grid item xs={12}>
                {nots &&
                  nots.map((not) => (
                    <Paper
                      style={{
                        padding: 10,
                        marginTop:10
                      }}
                    >
                      <Grid container style={{ marginTop: 15 }}>
                        <Grid item xs={1}>
                          <Typography style={{ fontSize: 14, color: "black" }}>
                            Seller
                          </Typography>
                          <Typography style={{ fontSize: 14, color: "grey" }}>
                            {not.seller}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography style={{ fontSize: 14, color: "black" }}>
                            Buyer
                          </Typography>
                          <Typography style={{ fontSize: 14, color: "grey" }}>
                            {not.buyer}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography style={{ fontSize: 12, color: "grey" }}>
                            {not.message}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography style={{ fontSize: 14, color: "black" }}>
                            Date
                          </Typography>
                          <Typography style={{ fontSize: 14, color: "grey" }}>
                            {not.ndate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
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
            style={{backgroundColor:"white", color:"black"}}
            onClick={() => {
              history("/Trade");
            }}
          >
            Previous
          </Button>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{color:"white"}}
              color="primary"
              disabled
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
                history("/Home");
              }}
            >
              Home
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
