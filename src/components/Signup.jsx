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
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{ history("/Login");}}
          >
            Bartering
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
                <Grid item xs={6} style={{marginTop:5}}>
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
    </Box>
  );
}
