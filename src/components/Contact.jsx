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
                <Grid item xs={10} style={{marginTop:10}}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Query"
                        value={password}
                        fullWidth
                        multiline
                        maxRows={4}
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                        minRows={4}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={6} style={{marginTop:30}}>
                    <Button fullWidth color="primary" variant="contained"
                    onClick={()=>{
                      if(email != "" && email != null && password!="" && password!= null){
                      toast.info("Query Submitted Successfully..!!!", {
                        position: "bottom-center",
                        pauseOnHover: true,
                        draggable: true,
                        autoClose: true,
                      });
                      toast.info("Our team will review and contact you soon", {
                        position: "bottom-center",
                        pauseOnHover: true,
                        draggable: true,
                        autoClose: true,
                      });
                    }
                    else{
                      toast.info("Email and Query should not be empty", {
                        position: "bottom-center",
                        pauseOnHover: true,
                        draggable: true,
                        autoClose: true,
                      });
                    }
                    }}
                    >Send Query</Button>
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
              history("/Help");
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
