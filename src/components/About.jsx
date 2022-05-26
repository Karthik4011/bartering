import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import logo from '../assets/logo.png'




export default function Home() {
  const history = useNavigate();


  const [loader, setLoader] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [name, setName] = React.useState(null);

  const handleSignup = () => {
      if(email != "" && email != null && password != "" && password != null && name != "" && name != null){
        axios({
            method: "POST",
            url: "http://localhost:8081/api/signup",
            data: {
              email: email,
              password: password,
              name: name
            },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res)=>{
              console.log(res)
              toast.info("Account created successfully", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: false,
              });
              history("/Login")
          })
      }else{
        toast.info("Please enter all details", {
            position: "bottom-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: false,
          });
      }
  }

  useEffect(() => {
    setLoader(true);
  }, []);

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{boxShadow:"none"}}>
        <Toolbar style={{textAlign:"left"}}>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block", textAlign:"left" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{ history("/intor");}}
          >
            <img src={logo} style={{width:100,marginTop:5,borderRadius:50}}></img>
          </Typography>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{ history("/intor");}}
          >
            Bartering
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{ history("/Login");}}
          >
            Login
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{ history("/Signup");}}
          >
            Sign Up
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{ history("/About");}}
          >
            About US
          </Typography>
        </Toolbar>
    </AppBar>
      <Grid container justifyContent="center" style={{ marginTop: 30 }}>
        <Grid item xs={5}>
          <Paper elevation={3} style={{padding:"30px 10px 30px 10px"}}>
            <Grid container justifyContent={"center"}>
              
             <Typography style={{fontSize:18}}>Priyanka Suddireddy</Typography>
                
        
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
            onClick={() => {
              history("/Signup");
            }}
            style={{backgroundColor:"white", color:"black"}}
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
