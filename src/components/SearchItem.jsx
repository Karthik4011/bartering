import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/threecircles.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Header from "./Header";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import RS1 from "../assets/rs1.jpeg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";


export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [text, setTeaxt] = React.useState("");
  const [items, setItems] = React.useState(null);
  const [bitems, setBitems] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [producttype, setProducttype] = React.useState("");

  const [selectedItem, setSelectedItem] = React.useState(null)



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

  const handleRequest = () => {
    var reqbody = {}
    reqbody['sellerid'] = selectedItem['sellerid']
    reqbody['receiverid'] = cookie.load('user')['id']
    reqbody['status'] = 'initiated'
    reqbody['solditemid'] = producttype['id']
    reqbody['borrowitemid'] = selectedItem['id']
    reqbody['borrowitemowner'] = cookie.load('user')['name']
    reqbody['selleritemowner'] = selectedItem['sellername']
    reqbody['borrowitemimage'] = selectedItem['image']
    reqbody['solditemimage'] = producttype['image']
    reqbody['solditemname'] = producttype['name']
    reqbody['borrowitemname'] = selectedItem['name']
    reqbody['solditemprice'] = producttype['price']
    reqbody['borrowitemprice'] = selectedItem['price']

    console.log(reqbody)
    axios({
      method: "POST",
      url: "http://localhost:8081/api/negotiations",
      data: reqbody,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      console.log(res)
      toast.info("Item Requested successfully", {
        position: "bottom-center",
        pauseOnHover: true,
        draggable: true,
        autoClose: false,
      });
      insertNotify(reqbody, "Trade between item " + reqbody['solditemname'] + " and "+ reqbody['borrowitemname'] +" has been started")
      insertNotify1(reqbody, "Trade between item " + reqbody['solditemname'] + " and "+ reqbody['borrowitemname'] +" has been started")
      history("/Trade");
    })

  }

  const insertNotify = (item, msg) => {
    var reqbod = {}
    reqbod['userid'] = item['sellerid']
    reqbod['seller'] = item['selleritemowner']
    reqbod['buyer'] = item['borrowitemowner']
    reqbod['message'] = msg
    const date =  new Date()
    reqbod['ndate'] =  (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()
    axios({
      method: "POST",
      url: "http://localhost:8081/api/notifications",
      data: reqbod,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      console.log(res)
      toast.info("Notified successfully", {
        position: "bottom-center",
        pauseOnHover: true,
        draggable: true,
        autoClose: false,
      });
      history("/Trade");
    })

  }


  const insertNotify1 = (item, msg) => {
    var reqbod = {}
    reqbod['userid'] = cookie.load('user')['id']
    reqbod['seller'] = item['selleritemowner']
    reqbod['buyer'] = item['borrowitemowner']
    reqbod['message'] = msg
    const date =  new Date()
    reqbod['ndate'] =  (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()
    axios({
      method: "POST",
      url: "http://localhost:8081/api/notifications",
      data: reqbod,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      history("/Trade");
    })

  }

  useEffect(() => {
    setLoader(true);
    axios({
      method: "GET",
      url: "http://localhost:8081/api/items",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
        setItems(res.data)
        setBitems(res.data)
        var temp = res.data
        axios({
          method: "GET",
          url: "http://localhost:8081/api/users",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((usdat)=>{
            setUsers(usdat.data)
            for(var i=0; i< temp.length; i++){
              temp[i]['sellername'] = usdat.data[temp[i]['sellerid']-1]['name']
            }
            setItems(temp)
            setBitems(temp)
            setLoader(false)
        })
        setLoader(false)
    })
  }, []);

  return loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Grid container justifyContent="center" style={{ marginTop: 20 }}>
        <Grid item xs={10}>
          <Paper elevation={3}>
            <Grid
              container
              justifyContent="center"
              style={{ padding: 20 }}
              spacing={1}
            >
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Search Items Here....."
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    setTeaxt(event.target.value);
                    var temp = []
                    if(event.target.value != "" & event.target.value != null){
                      for(var i=0; i< bitems.length; i++){
                        if(bitems[i].name.toLowerCase().includes(event.target.value.toLowerCase())){
                          temp.push(bitems[i])
                        }
                      }
                      setItems(temp)
                    }else{
                      setItems(bitems)
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{marginTop:20}}>
                <Grid container spacing={2} style={{maxHeight: 550, overflow:"scroll", paddingBottom:30, paddingTop:20}}>
                  {items.map((item,key)=>
                  item.sellerid != cookie.load('user')['id'] ? (
                    <Grid item xs={3}>
                    <Card style={{ paddingBottom: "10px" }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={item.image}
                      />
                      <CardContent style={{textAlign:"left"}}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{
                            "text-overflow": "ellipsis",
                            width: "100%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2"
                             style={{
                              maxHeight:"40px",
                              "text-overflow": "ellipsis",
                              width: "100%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                        color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          seller: {item.sellername}
                        </Typography>
                        <Typography variant="body2"
                             style={{
                              maxHeight:"40px",
                              "text-overflow": "ellipsis",
                              width: "100%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                        color="text.secondary">
                          Expectations: {item.expectations}
                        </Typography>
                        {/* <Typography variant="body2"
                             style={{
                              maxHeight:"40px",
                              "text-overflow": "ellipsis",
                              width: "100%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                        color="text.secondary">
                          Price: {item.price}
                        </Typography> */}
                      </CardContent>
                      <CardActions class="justify-center">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setSelectedItem(item)
                            console.log(item)
                            console.log(bitems)
                            setOpen(true)
                            
                          }}
                        >
                          Order From here
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>):null
                  )}
                 
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={open} keepMounted>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          <Grid container style={{ width: "500px", height: 200 }} spacing={1}>
            <Grid item xs={12}>
            <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                  Select Which Product you want to exchange from your list
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={producttype}
                    label="Select Which Product you want to exchange"
                    size="small"
                    onChange={(event) => {
                      setProducttype(event.target.value);
                    }}
                  >
                    {bitems? bitems.map((item)=>
                      item.sellerid == cookie.load('user')['id'] ?
                     ( <MenuItem value={item}>{item.name}</MenuItem> ): null
                    
                    ): null}
                    
                  </Select>
                </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="error"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button color="success" variant="contained" onClick={handleRequest}>
            Order
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar position="fixed"  style={{boxShadow:"none",bottom:0,top:"auto"}}>
        <Toolbar>
        <div style={{flexGrow:0.5}} />
          <Button
            variant="contained"
            color="primary"
            style={{backgroundColor:"white", color:"black"}}
            onClick={() => {
              history("/Add");
            }}
          >
            Previous
          </Button>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Trade");
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
