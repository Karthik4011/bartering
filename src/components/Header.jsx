import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Drawer from "@mui/material/Drawer";
import LogoutIcon from '@mui/icons-material/Logout';
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";




export default function Home() {
  const history = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

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
    var dat = cookie.load('user')
    if(!dat){
      history("/Login")
    }
  }, []);




  const today = new Date(Date.now());

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{boxShadow:"none"}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Home"?"white":"", color:location.pathname=="/Home"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Home"?5:5}}
            onClick={()=>{ history("/Home");}}
          >
            Home
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Add"?"white":"", color:location.pathname=="/Add"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Add"?5:5}}
            onClick={()=>{ history("/Add");}}
          >
            Add Item
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Search"?"white":"", color:location.pathname=="/Search"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Search"?5:5}}
            onClick={()=>{ history("/Search");}}

          >
            Search Item
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Trade"?"white":"", color:location.pathname=="/Trade"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Trade"?5:5}}
            onClick={()=>{ history("/Trade");}}

          >
            Trade Negotiations
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Notifications"?"white":"", color:location.pathname=="/Notifications"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Notifications"?5:5}}
            onClick={()=>{ history("/Notifications");}}

          >
            Notifications
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{
              cookie.remove('user')
              toast.info("Logged out successfull", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: true,
              });
              history('/Login')
            }}

          >
            Logout
          </Typography>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>{
              cookie.remove('user')
              toast.info("Logged out successfull", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: true,
              });
              history('/Login')
            }}
          >
            Logout
          </IconButton>  */}
        </Toolbar>
      </AppBar>

      {console.log("path")}
        {console.log(location.pathname)}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Grid
          container
          style={{ width: "400px"}}
          justifyContent="center"
          spacing={1}
        >
          <Grid xs={12} style={{height:64, backgroundColor:"#1876d1"}}>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
}
