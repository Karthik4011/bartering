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
import gif from '../assets/intor.jpeg'
import IconButton from "@mui/material/IconButton";
import logo from '../assets/intor.jpeg';
import desc from '../assets/desc.png'
import THeader from './TopHeader';





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
            autoClose: true,
          });
          history("/Home")
          cookie.save('user', res.data)
        }else{
            toast.info("Incorrect email or password", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: true,
              });
        }
      })
    }else{
        toast.info("Please enter Email and Passowrd", {
            position: "bottom-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: true,
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
    <THeader></THeader>
      <Grid container justifyContent="center" style={{ marginTop: 30 }}>
        <Grid item xs={7} style={{marginTop:30}}>
           <Typography style={{fontSize:28,fontStyle:"italic"}}>What We Do?</Typography>
           <Typography style={{fontSize:22}}>
              Barter is an act of trading goods or services between two or more parties without the use of money ???or a monetary medium, such as a credit card. In essence, bartering involves the provision of one good or service by one party in return for another good or service from another party.
           </Typography>
        </Grid>
        <Grid xs={12}></Grid>
        <Grid item xs={6} style={{marginTop:10}}>
           <img src={gif} style={{width:350, borderRadius:50}}></img>
        </Grid>
        <Grid item xs={6} style={{marginTop:60}}>
           <img src={desc} style={{width:650}}></img>
        </Grid>
      </Grid>
      <AppBar position="fixed"  style={{boxShadow:"none",bottom:0,top:"auto"}}>
        <Toolbar>
        <div style={{flexGrow:0.5}} />
        <IconButton edge="end" color="inherit">
          {/* <Button
            variant="contained"
            color="primary"
            disabled
            style={{color:"white"}}
          >
            Previous
          </Button> */}
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Login");
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
                window.open("about:blank", "_self");
                window.close();
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
