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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cookie from "react-cookies";
import IconButton from "@mui/material/IconButton";
import logo from '../assets/logo.png'





export default function Home() {
  const history = useNavigate();


  const [loader, setLoader] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleLogin = () => {
      if(email != "" & email != null){
      axios({
        method: "POST",
        url: "http://localhost:8081/api/login",
        data: {
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res)=>{
          if(res.data.password == password){
          toast.info("Login successfull", {
            position: "bottom-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: false,
          });
          history("/Home")
          cookie.save('user', res.data)
        }else{
            toast.info("Incorrect email or password", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: false,
              });
        }
      })
    }else{
        toast.info("Please enter Email and Passowrd", {
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
        </Toolbar>
    </AppBar>
      <Grid container justifyContent="center" style={{ marginTop: 30 }}>
        <Grid item xs={5}>
          <Paper elevation={3} style={{padding:"30px 10px 30px 10px"}}>
            <Grid container justifyContent={"center"}>
                <Grid item xs={10}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Email"
                        value={email}
                        fullWidth
                        onChange={(event)=>{
                            setEmail(event.target.value)
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={6} style={{marginTop:30}}>
                    <Button fullWidth color="primary" variant="contained"
                    onClick={()=>{
                        toast.info("Password Reset details has been successfully sent", {
                            position: "bottom-center",
                            pauseOnHover: true,
                            draggable: true,
                            autoClose: false,
                          });
                          history("/Login")
                    }}
                    >Send Password Reset Link</Button>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={6} style={{marginTop:5}}>
                   <Typography style={{fontSize:12, color:"CaptionText",fontStyle:"italic", cursor:"pointer"}}
                   onClick={()=>{
                       history("/Signup")
                   }}
                   >Don't Have Account? Create Account</Typography>
                    
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
            onClick={() => {
              history("/intor");
            }}
            style={{backgroundColor:"white", color:"black"}}
            >
            Previous
          </Button>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Signup");
              }}
            >
              Next
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
