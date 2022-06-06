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
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import ImageUploading from "react-images-uploading";
import firebase from "./Firebase";
import cookie from "react-cookies";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";



export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [progres, setProgres] = useState(false);
  const [imageurl, setImageurl] = useState(null);
  const [name, setName] = React.useState("");
  const [producttype, setProducttype] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [expectations, setExpectations] = React.useState("");
  const [price, setPrice] = React.useState("");


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

  const imageUpload = (picture) => {
    console.log(picture[0])
    if (picture.length != 0) {
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var uploadTask = storageRef
        .child("beelove/" + picture[0].file.name)
        .put(picture[0].file);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          throw error;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setImageurl(url);
            var reqbody = {}
            reqbody['name'] = name
            reqbody['producttype'] = producttype
            reqbody['image'] = url
            reqbody['description'] = desc
            reqbody['expectations'] = expectations
            reqbody['quantity'] = quantity
            reqbody['sellerid'] = cookie.load('user')['id']
            const date = new Date()
            reqbody['inserteddate'] = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()
            reqbody['price'] = price
            axios({
              method: "POST",
              url: "http://localhost:8081/api/items",
              data: reqbody,
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res)=>{
              console.log(res)
              toast.info("Item successfully added", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: false,
              });
              setProgres(false);
              history("/Search");
            })
          });
        }
      );
    } else {
      setImageurl(null);
      setProgres(null);
    }
  };

  useEffect(() => {
    setLoader(true);
  }, []);

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Grid container justifyContent="center" style={{ marginTop: 20 }}>
        <Grid item xs={10}>
          <Paper elevation={3} style={{marginTop:20}}>
            <Grid container style={{ padding: 20 }} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Item Name"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Product Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={producttype}
                    label="Product Type"
                    size="small"
                    onChange={(event) => {
                      setProducttype(event.target.value);
                    }}
                  >
                    <MenuItem value="Book">Book</MenuItem>
                    <MenuItem value="Furniture">Furniture</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Jwellery">Jwellery</MenuItem>
                    <MenuItem value="Clothes">Clothes</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{marginTop:10}}></Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Item Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={3}
                  type="number"
                  onChange={(event) => {
                    setDesc(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Expectations"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={3}
                  type="number"
                  onChange={(event) => {
                    setExpectations(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{marginTop:10}}></Grid>
              <Grid item xs={12} style={{padding:20, border:"1px solid #e1e1e1", borderRadius: 5, margin:20}}>
                <ImageUploading
                  value={images}
                  onChange={(imageList, addUpdateIndex) => {
                    console.log(imageList, addUpdateIndex);
                    setImages(imageList);
                  }}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </Button>
                      &nbsp;
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={onImageRemoveAll}
                      >
                        Remove all images
                      </Button>
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item" style={{margin: 5}}>
                          <img src={image["data_url"]} alt="" width="50"/>
                          <div className="image-item__btn-wrapper">
                            <Button
                              color="primary"
                              size="small"
                              variant="contained"
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </Button>&nbsp;&nbsp;
                            <Button
                              color="primary"
                              size="small"
                              variant="contained"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </Grid>
              <Grid item xs={12} style={{marginTop:10}}></Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  type="number"
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{marginTop:10}}></Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setProgres(true)
                    imageUpload(images)
                  }}
                >
                  Add Item
                </Button>
              </Grid>
              <Grid item xs={12} style={{marginTop:10}}></Grid>
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
            style={{backgroundColor:"white", color:"black"}}
            onClick={() => {
              history("/Home");
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
                history("/Search");
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
