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
import THeader from './TopHeader';




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
                autoClose: true,
              });
              history("/Login")
          })
      }else{
        toast.info("Please enter all details", {
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
        <Grid item xs={7}>
          <Paper elevation={3} style={{padding:"60px 30px 60px 30px", marginTop: 30}}>
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
                <Grid item xs={10} style={{marginTop:10}}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Enter Phone"
                        type="number"
                        fullWidth
                    >
                    </TextField>
                </Grid>
                <Grid item xs={10} style={{marginTop:10}}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Enter name"
                        value={name}
                        fullWidth
                        onChange={(event)=>{
                            setName(event.target.value)
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={10} style={{marginTop:10}}>
                    <TextField
                        variant="outlined"
                        size="small"
                        type="password"
                        label="Password"
                        value={password}
                        fullWidth
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={6} style={{marginTop:30}}
                onClick={handleSignup}
                >
                    <Button fullWidth color="primary" variant="contained">Create Account</Button>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={6} style={{marginTop:10}}>
                   <Typography style={{fontSize:10, color:"CaptionText",fontStyle:"italic", cursor:"pointer"}}
                   onClick={()=>{
                       history("/Login")
                   }}
                   >Already Have Account? Login</Typography>
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
              history("/Login");
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
                history("/About");
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
