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
          toast.success("Login successfull 🎉", {
            position: "top-right",
            pauseOnHover: true,
            draggable: true,
            autoClose: false,
          });
          history("/")
          cookie.save('user', res.data)
        }else{
            toast.error("Incorrect email or password 😲", {
                position: "top-right",
                pauseOnHover: true,
                draggable: true,
                autoClose: false,
              });
        }
      })
    }else{
        toast.warning("Please enter Email and Passowrd 😲", {
            position: "top-right",
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
                        label="Password"
                        value={password}
                        fullWidth
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={6} style={{marginTop:30}}>
                    <Button fullWidth color="primary" variant="contained"
                    onClick={handleLogin}
                    >Login</Button>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={6} style={{marginTop:5}}>
                   <Typography style={{fontSize:10, color:"CaptionText",fontStyle:"italic", cursor:"pointer"}}
                   onClick={()=>{
                       history("/Signup")
                   }}
                   >Don't Have Account? Create Account</Typography>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
