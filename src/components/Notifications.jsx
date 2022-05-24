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
import Chip from "@mui/material/Chip";
import { Card, CardActions, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import cookie from "react-cookies";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { ToastContainer, toast } from "react-toastify";


export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [loader, setLoader] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [negosb, setNegosb] = React.useState(false);
  const [negoss, setNegoss] = React.useState(false);

  useEffect(() => {
    setLoader(true);
    var reqbody = {};
    reqbody["receiverid"] = cookie.load("user")["id"];
    axios({
      method: "POST",
      url: "http://localhost:8081/api/getnegotiationsbyBuyer",
      data: reqbody,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      setNegosb(res.data);
    });
    var reqbodys = {};
    reqbodys["sellerid"] = cookie.load("user")["id"];
    axios({
      method: "POST",
      url: "http://localhost:8081/api/getnegotiationsbyseller",
      data: reqbodys,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      setNegoss(res.data);
    });
  }, []);

  const insertNotify1 = (item, msg) => {
    var reqbod = {}
    reqbod['userid'] = item['sellerid']
    reqbod['seller'] = item['selleritemowner']
    reqbod['buyer'] = item['borrowitemowner']
    reqbod['message'] = msg
    reqbod['ndate'] = "22/03/2022"
    axios({
      method: "POST",
      url: "http://localhost:8081/api/notifications",
      data: reqbod,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
    })

  }

  const insertNotify = (item, msg) => {
    var reqbod = {}
    reqbod['userid'] = cookie.load('user')['id']
    reqbod['seller'] = item['selleritemowner']
    reqbod['buyer'] = item['borrowitemowner']
    reqbod['message'] = msg
    reqbod['ndate'] = "22/03/2022"
    axios({
      method: "POST",
      url: "http://localhost:8081/api/notifications",
      data: reqbod,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
    })

  }

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Grid
        container
        justifyContent="center"
        style={{ marginTop: 20, padding: 10 }}
        spacing={2}
      >
        <Grid item xs={6} style={{maxHeight:"600px", overflowY:"scroll", overflowX:"hidden"}}>
          <Paper elevation={3}>
            <Typography style={{fontSize: 12, backgroundColor:"grey",textAlign:"center", color:"whitesmoke", borderRadius:"5px 5px 0px 0px", padding:5}}>Received Negotiations</Typography>
            <Grid container style={{ padding: 20 }} spacing={1}>
              <Grid item xs={12}>
                
                  {negoss &&
                  negoss.map((nego) => (
                    <Card style={{marginTop:5}}>
                      <CardContent>
                        <Grid container>
                          <Grid
                            item
                            xs={5}
                            style={{
                              border: "1px solid grey",
                              borderRadius: 5,
                              paddingTop: 10,
                            }}
                          >
                            <img
                              src={nego.solditemimage}
                              style={{ width: 50, borderRadius: 50 }}
                            ></img>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}>
                            <Typography>
                              <ArrowRightAltIcon />
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={5}
                            style={{
                              border: "1px solid grey",
                              borderRadius: 5,
                              paddingTop: 10,
                            }}
                          >
                            <img
                              src={nego.borrowitemimage}
                              style={{ width: 50, borderRadius: 50 }}
                            ></img>
                          </Grid>

                          <Grid item xs={5}>
                            <Typography>{nego.solditemname}</Typography>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}></Grid>
                          <Grid item xs={5}>
                            <Typography>{nego.borrowitemname}</Typography>
                          </Grid>

                          <Grid item xs={5}>
                            <Typography>Receiver: {nego.borrowitemowner}</Typography>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}></Grid>
                          <Grid item xs={5}>
                            <Typography>Seller: {nego.selleritemowner}</Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography>Price: {nego.borrowitemprice}</Typography>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}></Grid>
                          <Grid item xs={5}>
                            <Typography>Price: {nego.solditemprice}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                     
                        {nego.status == 'initiated'?
                        <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            axios({
                              method: "POST",
                              url: "http://localhost:8081/api/updatenegotiation",
                              data: {
                                "id": nego.id,
                                "status": "Rejected"
                              },
                              headers: {
                                Accept: "*/*",
                                "Content-Type": "application/json",
                              },
                            }).then((res) => {
                              console.log(res);
                              toast.info("Status Updated....", {
                                position: "top-center",
                                pauseOnHover: true,
                                draggable: true,
                                autoClose: false,
                              });
                              insertNotify(nego, "Trade has been rejected......")
                              insertNotify1(nego, "Trade has been rejected......")
                              history("/Home")
                            });
                          }}
                          color="error"
                          fullWidth
                        >
                          Reject
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            axios({
                              method: "POST",
                              url: "http://localhost:8081/api/updatenegotiation",
                              data: {
                                "id": nego.id,
                                "status": "Accepted"
                              },
                              headers: {
                                Accept: "*/*",
                                "Content-Type": "application/json",
                              },
                            }).then((res) => {
                              console.log(res);
                              toast.info("Status Updated", {
                                position: "bottom-center",
                                pauseOnHover: true,
                                draggable: true,
                                autoClose: false,
                              });
                              insertNotify(nego, "Trade has been Accepted.....")
                              insertNotify1(nego, "Trade has been Accepted.....")
                              history("/Home")
                            });
                          }}
                          color="success"
                          fullWidth
                        >
                          Accept
                        </Button>
                        </CardActions>: null }
                        {nego.status == 'Rejected'?
                        <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                   
                          }}
                          color="error"
                          fullWidth
                          disabled
                        >
                          Rejected By You
                        </Button>
                        </CardActions>: null }
                        {nego.status == 'Accepted'?
                        <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            
                          }}
                          color="success"
                          fullWidth
                          disabled
                        >
                          Accepted By You
                        </Button>
                        </CardActions>: null }
                    </Card>
                  ))}
                  {negoss.length == 0 ? <Typography>
                          No Trade requests received
                        </Typography>:null}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} style={{maxHeight:"600px", overflowY:"scroll", overflowX:"hidden"}}>
          <Paper elevation={3}>
          <Typography style={{fontSize: 12, backgroundColor:"grey",textAlign:"center", color:"whitesmoke", borderRadius:"5px 5px 0px 0px", padding:5}}>Sent Negotiations</Typography>
            <Grid container style={{ padding: 20 }} spacing={1}>
              <Grid item xs={12}>
                {negosb &&
                  negosb.map((nego) => (
                    <Card style={{marginTop:5}}>
                      <CardContent>
                        <Grid container>
                          <Grid
                            item
                            xs={5}
                            style={{
                              border: "1px solid grey",
                              borderRadius: 5,
                              paddingTop: 10,
                            }}
                          >
                            <img
                              src={nego.solditemimage}
                              style={{ width: 50, borderRadius: 50 }}
                            ></img>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}>
                            <Typography>
                              <ArrowRightAltIcon />
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={5}
                            style={{
                              border: "1px solid grey",
                              borderRadius: 5,
                              paddingTop: 10,
                            }}
                          >
                            <img
                              src={nego.borrowitemimage}
                              style={{ width: 50, borderRadius: 50 }}
                            ></img>
                          </Grid>

                          <Grid item xs={5}>
                            <Typography>{nego.solditemname}</Typography>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}></Grid>
                          <Grid item xs={5}>
                            <Typography>{nego.borrowitemname}</Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography>Receiver: {nego.borrowitemowner}</Typography>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}></Grid>
                          <Grid item xs={5}>
                            <Typography>Seller: {nego.selleritemowner}</Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography>Price: {nego.borrowitemprice}</Typography>
                          </Grid>
                          <Grid item xs={2} style={{ paddingTop: 20 }}></Grid>
                          <Grid item xs={5}>
                            <Typography>Price: {nego.solditemprice}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                     
                        {nego.status == 'initiated'?
                        <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {}}
                          color="error"
                          fullWidth
                          disabled
                        >
                          Pending with seller
                        </Button>
                        
                        </CardActions>: null }
                        {nego.status == 'Rejected'?
                        <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {}}
                          color="error"
                          fullWidth
                          disabled
                        >
                          Rejected By the seller
                        </Button>
                        </CardActions>: null }
                        {nego.status == 'Accepted'?
                        <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {}}
                          color="success"
                          fullWidth
                          disabled
                        >
                          Accepted by the seller
                        </Button>
                        </CardActions>: null }
                    </Card>
                  ))}
                   {negosb.length == 0 ? <Typography>
                          No Trade requests sent
                        </Typography>:null}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
