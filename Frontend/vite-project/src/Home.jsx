import React from 'react'
import Image, { propTypes } from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'



const Home = () => {
  // const [cart, setcart] = useState([])
  const [cart, setCart] = useState([]);
  // console.log("=============================", carts);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  const [showss, setShowss] = useState(false);
  const handleClosess = () => setShowss(false);
  const handleShowss = () => setShowss(true);

  const [showsss, setShowsss] = useState(false);
  const handleClosesss = () => setShowsss(false);
  const handleShowsss = () => setShowsss(true);



  // const [cart, setcart] = useState([])
  const [orders, setorder] = useState([])
  const navii = useNavigate()
  const [login, setlogin] = useState({
    email: '',
    password: '',
    conform_password: ''
  })

  let changes = (e) => {
    const { name, value } = e.target
    setlogin({ ...login, [name]: value })
  }

  let sumbits = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', login)
      // const userid=response.data.id

      // localStorage.setItem("id",userid)
      // console.log(userid);

      setlogin({
        email: '',
        password: '',
        conform_password: ''
      })
    } catch (error) {
      console.log(error);
    }

    await alert("Sign Up SucessFully")
  }


  const [signin, setsignin] = useState({
    email: '',
    password: '',
    // conform_password: ''
  })

  let handlechangess = (v) => {
    const { name, value } = v.target
    setsignin({ ...signin, [name]: value })
  }
  // if(response.data){
  //   alert("invalid Detail")
  // }
  let sumbit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', signin)
      if (!response.data) {
        alert("invalid Details")
      } else {
        const userid = response.data.id
        localStorage.setItem("id", userid)
        console.log(userid);
        setsignin({
          email: ' ',
          password: ' ',
          // conform_password: ''
        })
        await alert("Login Up SucessFully")
      }

    } catch (error) {
      console.log(error);
    }



  }



  const logout = async () => {
    localStorage.removeItem("id")
    await alert("logout Sucessfully")
    navii('/')
    const cartsid= localStorage.getItem("cartid")
    try {
      axios.delete(`http://localhost:8080/cart/${cartsid}`);
      // console.log(response);
      getcarts()
    } catch (error) {
      console.log(error);
      
    }
    // setCart([" "])
  }

  // const logincart=()=>{
  //   axios.get("http://localhost:8080/getlogins")
  //   .then((res)=>{
  //     getlogins(res.data)
  //   })
  //   .catch((er)=>{
  //     console.log(er);

  //   })
  // }
  // useEffect(()=>{
  //   logincart()
  // },[])


  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (storedUser) {
  //   getlogins(storedUser);
  //   }
  // }, []);
  // const addToCart = async (product) => {
  //   try {
  //     const storedUser = JSON.parse(localStorage.getItem("user"));

  //     if (!storedUser || !storedUser.id) {
  //       alert("Please log in first to place an order.");
  //       return;
  //     }

  //     const response = await axios.post(
  //       `http://localhost:8080/cart/${storedUser.id}`,
  //       product,
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     console.log("Product added to cart:", response.data);
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };




  // useEffect(() => {
  //   // const storedUser = JSON.parse(localStorage.getItem("userid"));
  //   // if (storedUser) {
  //   //   getlogins(storedUser);
  //   // }
  // }, []);

  const addToCart = async (products) => {
    const userid = localStorage.getItem("id")
    const foodid = products.id
    console.log("==============", foodid);

    // const foodid = localStorage.getItem("foodid")
    if (!userid) {
      alert("please login")
      return;
    }
    // if (!getlogin || !getlogin.id) {
    //   alert("Please log in first to place an order.");
    //   return;
    // }

    try {
      // console.log(userid);

      const response = await axios.post(
        `http://localhost:8080/cart/add/${userid}/${foodid}`,
        products,
        // { headers: { "Content-Type": "application/json" } }
      );

      const cartid=response.data.id
      console.log(cartid,"=========================");
      
      localStorage.setItem("cartid",cartid)

      console.log("Product added to cart:", response.data.quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  const getcarts = () => {
    axios.get('http://localhost:8080/cart/getall')
      .then((res) => {
        setCart(res.data)
        console.log(res.data);

      })
      .catch((err) => {
        console.log(err);

      })
  }
  useEffect(() => {
    getcarts()
  }, [])



  const [food, setfood] = useState([])

  const [menu, setmenu] = useState([]) // filter  properties

  const [dish, setdish] = useState("chicken")



  let fun = () => {
    // 'http://beta.hrmetrics.mv/api/Item/GetItems'
    axios.get('http://localhost:8080/path')
      .then((res) => {
        setfood(res.data)
        setmenu(res.data)
        console.log(res.data);

      })
      .catch((err) => {
        console.log(err);

      })
  }
  useEffect(() => {
    fun()
  }, [])


  let menuitems = (catogry) => {
    setdish(catogry)
    if (catogry === "chicken") {
      setmenu(food)
    } else {
      setmenu(food.filter((x) => x.catogry === catogry))
    }
  }


  const pay = (x) => {
    const payid = orders.find(orders => x.id === orders.id)
    if (payid) {
      const amount = orders.map(orders => x.id === orders.id ? { ...orders, dish: orders.name, quantity: orders.quantity, price: orders.rate * (orders.quantity + 1) } : orders)
      setorder(amount)
    } else {
      setorder([...orders, { ...x, dish: x.name, quantity: 1, price: x.rate }])
    }
  }



  const foodItems = [
    { id: 1, name: "Meat Fries", image: "https://foodor-html.tortoizthemes.com/assets/images/food_05.jpg", icon: "bi bi-star fs-4", rate: 4.5, cost: "bi bi-currency-rupee", amount: 320.00 },
    { id: 2, name: "Beef Fries", image: "https://foodor-html.tortoizthemes.com/assets/images/food_04.jpg", icon: "bi bi-star fs-4", rate: 4.7, cost: "bi bi-currency-rupee", amount: 420.00 },
    { id: 3, name: "Sushi", image: "https://foodor-html.tortoizthemes.com/assets/images/food_07.jpg", icon: "bi bi-star fs-4", rate: 4.3, cost: "bi bi-currency-rupee", amount: 350.00 },
    { id: 4, name: "Chelsea Zimmer", image: "https://www.southernliving.com/thmb/bCrxpdhq9KTcDsqrjEdqbnV0_V0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/27793_SnacT_FireQuesadillas_209-1-9423bf482c1f464581040613234d2f27.jpg", icon: "bi bi-star fs-4", rate: 4.8, cost: "bi bi-currency-rupee", amount: 400.00 },
    { id: 5, name: "Burger Fries", image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600", icon: "bi bi-star fs-4", rate: 4.2, cost: "bi bi-currency-rupee", amount: 450.00 },
    { id: 6, name: " Noodles", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600", icon: "bi bi-star fs-4", rate: 4.1, cost: "bi bi-currency-rupee", amount: 330.00 },
    { id: 7, name: " Chicken Fries", image: "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=600", icon: "bi bi-star fs-4", rate: 4.5, cost: "bi bi-currency-rupee", amount: 270.00 },
    { id: 8, name: "Korean Egg Fries", image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600", icon: "bi bi-star fs-4", rate: 4.8, cost: "bi bi-currency-rupee", amount: 380.00 },
    { id: 9, name: "Beef Burger", image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600", icon: "bi bi-star fs-4", rate: 4.7, cost: "bi bi-currency-rupee", amount: 450.00 },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg  " id='navbarnav' >
        <div class="container ">
          <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/logo.svg" className='img-fluid' alt="" />
          <span class="navbar-brand ms-3 fw-bold-3" href="#" id='title'>FoodWaGon</span>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" >
            <ul class="navbar-nav ">
              <li class="nav-item ">
                <a class="nav-link active d-none d-lg-block" aria-current="page" href="#">Deliver to:</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="#"></a>
              </li>
              <li class="nav-item ">
                <a class="nav-link  " href="#"><i class="bi bi-geo-alt-fill me-2 me-lg-4" style={{ color: 'orange' }} ></i>current Location near PVR towers kalavasal, Madurai-16</a>
              </li>
            </ul>
            <nav class="navbar navbar-light  ">
              <div class="container-fluid ">
                <form class="d-lg-flex ">
                  <Button id='cart' onClick={handleShow}><i class="bi bi-bag-check mt-lg-2 me-2" style={{ color: 'orange' }}></i>
                    Cart {cart.map((num) => (
                      <span key={num.id}>
                        <sup className='fs-6'>({num.quantity})</sup>
                      </span>
                    ))}</Button>
                  <Button className='btn ms-2 ' style={{ color: 'orange' }} onClick={handleShows} id='cart' ><i class="bi bi-person  mt-lg-2 me-2 " style={{ color: 'orange' }}></i>Sign Up</Button>
                  <Button style={{ color: 'orange' }} className='btn ms-2' onClick={handleShowss} id='cart'>  <i class="bi bi-cart4  mt-lg-2 me-2 " style={{ color: 'orange' }}></i>Order</Button>
                  <Button id='cart' style={{ color: 'orange' }} onClick={handleShowsss}><i class="bi bi-box-arrow-in-right fs-5"></i></Button>
                  <Button id='cart' style={{ color: 'orange' }} onClick={logout}><i class="bi bi-box-arrow-in-left fs-5"></i></Button>
                </form>
              </div>
            </nav>
          </div>
        </div>
      </nav>
      <Modal show={shows} onHide={handleCloses}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="container ">
              <div className="row ">
                <div className='col-12 '>
                  <div class="card " id='forms' style={{ width: 18 + "rem" }}>
                    <div class="card-body ">
                      <form action="" className='justify-content-center' >
                        <label htmlFor="" className='mt-2 mt-lg-3'>Email</label> <br />
                        <input type="text" name='email' value={login.email} onChange={changes} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Your Email' /> <br />
                        <label htmlFor="" className='mt-2 mt-lg-3'>Password</label> <br />
                        <input type="text" name='password' value={login.password} onChange={changes} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Your Password' /><br />
                        <label htmlFor="" className='mt-2 mt-lg-3'>Conform Password</label> <br />
                        <input type="password" name='conform_password' value={login.conform_password} onChange={changes} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Conform Password' /><br />
                        <button className='btn ms-2 ms-lg-5' style={{ fontSize: 13, color: 'orange' }}>
                          <span className='ms-lg-3'>
                            <i class="bi bi-question ms-lg-5 "></i>Forgot Password
                          </span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btnn mt-2 px-2 py-2 px-lg-3 py-lg-2 mt-lg-4 " onClick={handleCloses}>
            Close
          </button>
          <button onClick={sumbits} className=" text-center btnn px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-4">Sumbit</button>
        </Modal.Footer>
      </Modal>
      <Modal show={showsss} onHide={handleClosesss}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className='col-12'>
                  <div class="card " id='forms' style={{ width: 18 + "rem" }}>
                    <div class="card-body ">
                      <form action="" className='justify-content-center' >
                        <label htmlFor="" className='mt-2 mt-lg-3'>Email</label> <br />
                        <input type="text" name='email' value={signin.email} onChange={handlechangess} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Your Email' /> <br />
                        <label htmlFor="" className='mt-2 mt-lg-3'>Password</label> <br />
                        <input type="text" name='password' value={signin.password} onChange={handlechangess} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Your Password' /><br />
                        {/* <label htmlFor="" className='mt-2 mt-lg-3'>Conform Password</label> <br />
                        <input type="password" name='conform_password' value={login.conform_password} onChange={changes} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Conform Password' /><br /> */}
                        <button className='btn ms-2 ms-lg-5' style={{ fontSize: 13, color: 'orange' }}>
                          <span className='ms-lg-3'>
                            <i class="bi bi-question ms-lg-5 "></i>Forgot Password
                          </span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btnn mt-2 px-2 py-2 px-lg-3 py-lg-2 mt-lg-4 " onClick={handleClosesss}>
            Close
          </button>
          <button onClick={sumbit} className=" text-center btnn px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-4">Sumbit</button>
        </Modal.Footer>
      </Modal>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.map((x) => (
            <div key={x.id} class="cards d-flex">
              <div >
                <img src={x.img} alt="..." id='cartimg' className='img-fluid' />
              </div>
              <div className=''>
                <div className='d-flex'>
                  <div className='ms-2 ms-lg-3'>
                    <div class="card-title">{x.dishname}</div>
                    <i class="bi bi-currency-rupee"></i>
                    <span>{x.price}</span>
                    <span className='ms-2 '>X {x.quantity}</span>
                  </div>
                  <div className='d-block'>
                    <button className='btn'><i class="bi bi-plus-circle"></i></button>
                    <span className=''>{x.quantity}</span>
                    <button className='btn'><i class="bi bi-dash-circle "></i></button>
                    <Button className='ms-2 '>pay</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={showss} onHide={handleClosess} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Order</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {orders.map((amount) => (
            <div key={amount.id}>
              <div class="card">
                <img src={amount.img} class="card-img-top" alt="..." />
                <h5 class="card-title">{amount.dish}</h5>
              </div>
              <div>
                <div>{amount.quantity}</div>
                <div>{amount.rate}</div>
              </div>
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
      <div className="container-fluid" style={{ backgroundColor: 'orange' }}>
        <div className="container pt-5 pb-5">
          <div className='row '>
            <div className='col-12 col-md-6 order-2 order-md-1 mt-lg-5'>
              <h1 className='mt-lg-5 mt-3 pt-lg-3' id='star'>Are You Starving ?</h1>
              <h2 className='mt-3 mb-lg-5' style={{ color: 'gray' }} >Within a few clicks,find meals that are accessible near you</h2>
              <div class="card w-100">
                <div class="card-body">
                  <a href="" style={{ color: 'black', textDecoration: 'none' }}>
                    <span id="bike" className='px-lg-3 px-3 py-2 py-lg-2 ms-lg-2'>
                      <i class="bi bi-bicycle fs-5 me-2 mt-lg-3"></i>
                      <span class="card-title fs-6">Delivery</span>
                    </span>
                  </a>
                  <a href="" style={{ color: 'black', textDecoration: 'none' }}>
                    <span className='ms-lg-4 px-3 py-2 px-lg-3 py-lg-2' id='bike1'>
                      <i class="bi bi-bag-heart-fill fs-5 me-2 mt-lg-3"></i>
                      <span class="card-title fs-6">Pick Up</span>
                    </span>
                  </a>
                  <hr className='mt-3 mt-md-4' />
                  <div className='d-lg-flex '>
                    <div className='ms-lg-2  w-lg-50 px-lg-2 py-lg-2' id='box'>
                      <i class="bi bi-geo-alt-fill fs-5 me-lg-3" style={{ color: 'orange' }}></i>
                      <input type="text" className='px-lg-3 py-lg-2' name="" id="box1" placeholder='Enter The Address' />
                    </div>
                    <div className='justify-content-end'>
                      <button className='ms-1  ms-lg-4 px-lg-4 py-lg-3 px-3 py-2 w-100 w-lg-50' id='find'>Find Food</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-5 order-1 order-md-2'>
              <Image id='pizza' className='mt-lg-5 ms-2 ms-lg-5 ps-lg-5 mt-3' src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/hero-header.png" fluid alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-2 mt-lg-5">
        <div className="container ">
          <div className="row">
            <div className='col-12 text-center mt-2 mt-lg-5'>
              <h3>Why Choose Us</h3>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mt-2 mt-lg-5'>
              <div class="card p-2 p-lg-4 " id='quality' >
                <svg xmlns="http://www.w3.org/2000/svg" width={62} height={62} viewBox="0 0 256 256"><path fill="#e31515" d="m227.9 152.72l-39.7 14.44l-35.74-14.3a12 12 0 0 0-8.92 0L108 167.08l-35.54-14.22a12 12 0 0 0-8.56-.14l-44 16a12 12 0 0 0 8.2 22.56l8.12-2.95A44.06 44.06 0 0 0 80 228h96a44.05 44.05 0 0 0 44-44v-2.87l16.1-5.85a12 12 0 0 0-8.2-22.56M176 204H80a20 20 0 0 1-20-20v-4.32l7.8-2.84l35.74 14.3a12 12 0 0 0 8.92 0L148 176.92l35.54 14.22a12 12 0 0 0 8.56.14l2.89-1.06A20 20 0 0 1 176 204M12 128a12 12 0 0 1 12-12h208a12 12 0 0 1 0 24H24a12 12 0 0 1-12-12m36.2-24h159.6a20.36 20.36 0 0 0 16.38-8.29a19.59 19.59 0 0 0 2.88-17.65C216.12 43.88 175.39 20 128 20S39.89 43.87 28.94 78.05a19.56 19.56 0 0 0 2.88 17.65A20.32 20.32 0 0 0 48.2 104M128 44c33.7 0 63.61 14.85 74 36H54c10.4-21.15 40.31-36 74-36"></path></svg>
                <div class="card-body mt-2 mt-lg-3">
                  <h3>Quality Food</h3>
                  <p class="card-text mt-2 mt-lg-3">Many desktops publish packages webpages in editors now.</p>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mt-2 mt-lg-5'>
              <div class="card p-2 p-lg-4" id='ontime'>
                {/* <img src="..." class="card-img-top" alt="..."/> */}
                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24"><path fill="#8a40fa" d="M5 16.5q-1.914 0-3.207-1.293T.5 12q0-1.875 1.318-3.207T5 7.462q1.714 0 2.997 1.16Q9.281 9.78 9.477 11.5h1.765l-2.146-6H7.5v-1h4v1h-1.33l.696 1.962h5.915L14.966 2.5H12.5v-1h3.179l2.175 5.95H19q1.864 0 3.182 1.318T23.5 11.95q0 1.87-1.315 3.19q-1.316 1.322-3.185 1.322q-1.723 0-2.98-1.135T14.523 12.5H9.477q-.196 1.725-1.498 2.863T5 16.5m.5-4h2.954v-1H5.5zm7.346 10.154l-5.115-2.577h3.385v-1.73l5.115 2.576h-3.385zM12.354 11.5h2.169q.087-.69.51-1.623q.425-.933 1.236-1.416h-5.05zm5.954.196l.938-.354l-1.038-2.765l-.889.354z"></path></svg>
                <div class="card-body mt-2 mt-lg-3">
                  <h3>On Time Delivery</h3>
                  <p class="card-text mt-2 mt-lg-3">Many desktops publish packages webpages in editors now.</p>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mt-2 mt-lg-5'>
              <div class="card p-2 p-lg-4" id='clean'>
                {/* <img src="..." class="card-img-top" alt="..."/> */}
                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24"><path fill="gold" d="m10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9m-6-8L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"></path></svg>
                <div class="card-body mt-2 mt-lg-3">
                  <h3>Hygiene Certified</h3>
                  <p class="card-text mt-2 mt-lg-3">Many desktops publish packages webpages in editors now.</p>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mt-2 mt-lg-5'>
              <div class="card p-2 p-lg-4" id='orderyour'>
                {/* <img src="..." class="card-img-top" alt="..."/> */}
                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24"><path fill="#33e633" d="M4 16.5V8H3V7h1V6H3V5h1V4H3V3h6c.5.03.95.24 1.34.63s.61.87.66 1.37h10v1H11c-.05.53-.27 1-.66 1.43S9.5 8.05 9 8H7v7.05c.05 0 .13-.01.24-.05s.2 0 .26 0q.84 0 1.92.42c.41-.92 1.11-1.74 2.11-2.42s2-1 3-1c1.53 0 2.83.53 3.89 1.59S20 15.95 20 17.5v.27c0 .13-.03.2-.03.23H3.14c.13-.5.41-1 .86-1.5m2-1.27V8H5v7.7c.5-.25.81-.4 1-.47M9 7V6H7v1zm0-3H7v1h2zM5 4v1h1V4zm0 2v1h1V6zM2 19h20l-2 2H4z"></path></svg>
                <div class="card-body mt-2 mt-lg-3">
                  <h3>Order You Food</h3>
                  <p class="card-text mt-2 mt-lg-3">Many desktops publish packages webpages in editors now.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-2 mt-lg-5">
        <div className="container">
          <div className="row">
            <div className='col-12 text-center mt-3 mt-lg-5'>
              <h2>Our Most Popular Items</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='container'>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className='row'>
                <div className='col-12  col-md-4'>
                  <div class="card border-0" >
                    <div>
                    <Image fluid id='popular' src="https://foodor-html.tortoizthemes.com/assets/images/food_05.jpg" class="card-img-top" alt="..."/>
                    <div id='over'>
                    <Card.ImgOverlay className='text-center  ' >
                      <h4><button id='add' className='btn text-light px-3 py-2 px-lg-4 py-lg-2'>Add To Cart +</button></h4>
                    </Card.ImgOverlay>
                    </div>
                    </div>
                      <div class="card-body">
                      <h4>Food</h4>
                      <i class="bi bi-star" style={{ color: 'orange' }}></i>
                      </div>
                  </div>
                </div>
                <div className='col-12  d-none d-md-block col-md-4'>
                  <Image id='popular' fluid src='https://foodor-html.tortoizthemes.com/assets/images/food_04.jpg' />
                  <h4>wagon</h4>
                  <i class="bi bi-star" style={{ color: 'orange' }}></i>
                </div>
                <div className='col-12  d-none d-md-block col-md-4'>
                  <Image id='popular' fluid src='https://foodor-html.tortoizthemes.com/assets/images/food_07.jpg' />
                  <h4>Noodles</h4>
                  <i class="bi bi-star" style={{ color: 'orange' }}></i>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className='row'>
                <div className='col-12  col-md-4'>
                  <Image fluid id='popular' src='https://www.southernliving.com/thmb/bCrxpdhq9KTcDsqrjEdqbnV0_V0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/27793_SnacT_FireQuesadillas_209-1-9423bf482c1f464581040613234d2f27.jpg' />
                  <h4>Chelsea Zimmer</h4>
                  <i class="bi bi-star" style={{ color: 'orange' }}></i>
                </div>
                <div className='col-12 d-none d-md-block col-md-4'>
                  <Image fluid id='popular' src='https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600' />
                  <h4>Burger Fries</h4>
                  <i class="bi bi-star" style={{ color: 'orange' }}></i>
                </div>
                <div className='col-12  d-none d-md-block col-md-4'>
                  <Image fluid id='popular' src='https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600' />
                  <h4>Malaysian Noodles</h4>
                  <i class="bi bi-star" style={{ color: 'orange' }}></i>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className='row'>
                <div className='col-12   col-md-4'>
                  <Image id='popular' fluid src='https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=600' />
                  <h4>food</h4>
                  <i class="bi bi-star" style={{ color: 'orange' }}></i>
                </div>
                <div className='col-12  d-none d-md-block col-md-4'>
                  <Image id='popular' fluid src='https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600' />
                  <h4>wagon</h4>
                  <i class="bi bi-star" style={{ color: 'orange' }}></i>
                </div>
                <div className='col-12  d-none d-md-block col-md-4'>
                  <Image id='popular' fluid src='https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600' />
                  <h4>Noodles</h4>
                  <i class="bi bi-star fs-4" style={{ color: 'orange' }}></i>
                  <span className='fs-5 ms-2 ms-lg-3'>4.5</span>
                  <span className='fs-5 ms-2 ms-lg-3' style={{ color: 'orange' }}><i class="bi bi-currency-rupee"></i> 320.00</span>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div> */}
      <div className='container mt-3 mt-lg-5'>
        <div style={{ padding: "20px", boxSizing: "border-box", overflow: "hidden" }}>
          {/* <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Our Food Items</h2> */}
          <Slider {...settings}>
            {foodItems.map((item) => (
              <div key={item.id} style={{ padding: "10px" }}>
                <div
                  className="cards"
                  style={{
                    position: "relative",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    textAlign: "center",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {/* Food Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Overlay and Button */}
                  <div
                    className="overlay"

                  >
                    <button
                      className="add-to-cart-btn"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: 'orange',
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  {/* Food Name */}
                  <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
                </div>
                <i className={item.icon} style={{ color: 'orange' }}></i>
                <span className='fs-5 ms-2 ms-lg-3 '>{item.rate}</span>
                <span className='fs-5 ms-2 ms-lg-3 ' style={{ color: 'orange' }}><i className={item.cost}></i>{item.amount}.00</span>
              </div>

            ))}
          </Slider>
          {/* <i class="bi bi-star fs-4" style={{ color: 'orange' }}></i>
          <span className='fs-5 ms-2 ms-lg-3'>4.5</span>
          <span className='fs-5 ms-2 ms-lg-3' style={{ color: 'orange' }}><i class="bi bi-currency-rupee"></i> 320.00</span> */}
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className='row '>
            <div className='col-12 text-center mt-2 mt-lg-5'>
              <h2>Menu Items</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4 mt-2 mt-lg-5'>
              <h3 className='text-center mb-2 mb-lg-5 mt-2 mt-lg-5'></h3>
              <div className='mt-2 mt-lg-5'>
                <span className='chicken px-4 px-lg-3 py-4 py-lg-4 '>
                  <button onClick={() => menuitems('chicken')} id='dish'>
                    <Image className='me-2 me-lg-3 ms-2 px-2 py-2' id='chicken1' src='https://foodor-html.tortoizthemes.com/assets/images/meat-icon.png' />
                    <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Chicken Dish</span>
                  </button>
                </span>
              </div>
              <div className='mt-4 mt-lg-5'>
                <span className='chicken5 px-4 px-lg-3 py-4 py-lg-4'>
                  <button onClick={() => menuitems('see food')} id='dish1'>
                    <Image className='me-2 me-lg-3 ms-2 px-2 py-2' id='chicken2' src='https://foodor-html.tortoizthemes.com/assets/images/fish-icon.png' />
                    <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Sea Food Dish</span>
                  </button>
                </span>
              </div>
              <div className='mt-4 mt-lg-5'>
                <span className='chicken5 px-4 px-lg-3 py-4 py-lg-4'>
                  <button onClick={() => menuitems('burger')} id='dish1'>
                    <Image className='me-2 me-lg-3 ms-2 px-2 py-2' id='chicken2' src='https://foodor-html.tortoizthemes.com/assets/images/burger-icon.png' />
                    <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Burger & Fries</span>
                  </button>
                </span>
              </div>
              <div className='mt-4 mt-lg-5'>
                <span className='chicken5 px-4 px-lg-3 py-4 py-lg-4'>
                  <button onClick={() => menuitems('veg')} id='dish1'>
                    <Image className='me-2 me-lg-3 ms-2 px-2 py-2' id='chicken2' src='https://foodor-html.tortoizthemes.com/assets/images/potato-icon.png' />
                    <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Veg Food Dish</span>
                  </button>
                </span>
              </div>
            </div>

            <div className='col-12 col-md-8'> {/* Changed to col-md-8 for more space */}
              <div className='row g-4'> {/* Added gutter spacing */}
                {/* All Cards */}
                {menu.slice(0, 4).map((products) => (
                  <div className='col-12 col-md-6 col-lg-6' key={products.id}> {/* Responsive columns */}
                    <div className="cards h-100" style={{
                      position: "relative",
                      border: "1px solid #ddd",
                      borderRadius: "15px",  // Increased border radius
                      overflow: "hidden",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      padding: "15px",  // Added internal padding
                    }}>
                      <img src={products.img}
                        id='dishimg'
                        className="card-img-top"
                        style={{

                          width: "100%",
                          height: "200px",  // Increased image height
                          objectFit: "cover",
                          borderRadius: "10px"  // Rounded image corners
                        }}
                        alt={products.name}  // Added meaningful alt text
                      />

                      <div className="overlay mt-3">
                        <button
                          className="btn btn-warning btn-lg"  // Larger button
                          style={{
                            padding: "12px 25px",
                            fontSize: "1.1rem",
                            borderRadius: "8px"
                          }}
                          onClick={() => addToCart(products)}
                        >
                          Order Now
                        </button>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title fs-3 mb-2  mt-2 mt-lg-4">{products.name}</h3>
                        <i class="bi bi-clock text-warning mb-2"></i><span className='ms-2 ms-lg-3'>30 Minutes</span>
                        <div className="rating-price">
                          <i className="bi bi-star-fill fs-4 text-warning"></i>
                          <span className='fs-4 ms-2 ms-lg-4'>{products.rate}</span>
                          <i className='bi bi-currency-rupee ms-3 ms-lg-4 fs-4 text-warning'></i>
                          <span className='fs-4  text-warning'>{products.price}.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div class="col-12">
              <h3 class="text-center mt-5">Contact</h3>
              <hr class="v" />
              <p class="text-center mt-5">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
            <div class="col-12 col-md-4 col-lg-4">
              <div class="card"  >
                <div class="card-body">
                  <div class="container d-flex mt-3 " id="address">
                    <i class="fa-solid fa-location-dot text-warning  fs-2 mt-3" id="addresss"></i>
                    <div class="ms-4">
                      <h5>Address</h5>
                      <p>2/313 Radiance Cinema opp Madurai</p>
                    </div>
                  </div>
                  <div class="container d-flex mt-3 " id="address">
                    <i class="fa-solid fa-phone  fs-2 mt-3 text-warning" id="addresss"></i>
                    <div class="ms-4">
                      <h5>Call Us</h5>
                      <p>+91-9585221909</p>
                    </div>
                  </div>
                  <div class="container d-flex mt-3 " id="address">
                    <i class="fa-solid fa-envelope text-warning  fs-2 mt-3" id="addresss"></i>
                    <div class="ms-4">
                      <h5>Email</h5>
                      <p>ddeepak70335@gmail.com</p>
                    </div>
                  </div>
                  <div class="container d-flex mt-3 " id="address">
                    <i class="fa-solid fa-clock fs-2 mt-3 text-warning" id="addresss"></i>
                    <div class="ms-4">
                      <h5>Open Hours</h5>
                      <p>Mon-Sat=11:00am to 5:00pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="container mt-3">
                <form action="">
                <input type="text" placeholder="Your Name" class="   " />
                    <input type="text" placeholder="Your Mail" class="ms-lg-4  "/>
                    {/* <input type="text" placeholder="Subjuct" class="mt-4" /> */}
                    <div class="form-floating">
                      <textarea class="form-control mt-4" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: 200}}></textarea>
                      <label for="floatingTextarea2">Message</label>
                    </div>
                    <div class="text-center mt-4" ><button  class="py-2 px-4 btn rounded-pill mt-5">Send Message</button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-2 mt-lg-5 bg-dark text-white" id='footer'>
        <div className="container ">
          <div className="row ">
            <div className='col-12 mt-2 mt-lg-5'>
              <h5>OUR TOP CITIES</h5>
            </div>
            <div className='col-12 col-md-4 col-lg-2 mt-3 mt-lg-4 fs-5'>
              <div>San Francisco</div>
              <div>Miami</div>
              <div>San Diego</div>
              <div>East Bay</div>
            </div>
            <div className='col-12 col-md-4 col-lg-2 mt-3 mt-lg-4 fs-5 ms-1 ms-lg-5'>
              <div href="">Los Angeles</div>
              <div href="">Washington DC</div>
              <div href="">Seattle</div>
              <div href="">Seattle</div>
            </div>
            <div className='col-12 col-md-4 col-lg-2 mt-3 mt-lg-4 fs-5 ms-1 ms-lg-5'>
              <div>New York City</div>
              <div>Orange County</div>
              <div>Atlanta</div>
              <div>Charlotte</div>
            </div>
            <div className='col-12 col-md-4 col-lg-2 mt-3 mt-lg-4 fs-5 ms-1 ms-lg-5'>
              <div>Chicago</div>
              <div>Phoenix</div>
              <div>Las Vegas</div>
              <div>Sacramento</div>
            </div>
            <div className='col-12 col-md-4 col-lg-2 mt-3 mt-lg-4 fs-5 ms-1 ms-lg-5'>
              <div>Columbus</div>
              <div>New Mexico</div>
              <div>Albuquerque</div>
              <div>Sacramento</div>
            </div>
          </div>
          <hr className='mt-2 mt-lg-4' />
          <div className='row'>
            <div className='col-12 col-md-3 mt-3 mt-lg-4 fs-5  '>
              <h5 style={{ fontWeight: 700 }}>COMPANY</h5>
              <div>About</div>
              <div>Team</div>
              <div>Careers</div>
              <div>Blog</div>
            </div>
            <div className='col-12 col-md-3  mt-3 mt-lg-4 fs-5  '>
              <h5 style={{ fontWeight: 700 }}>CONTACT</h5>
              <div>Help & Support</div>
              <div>Partner With Us</div>
              <div>Rides With Us</div>
              <div>Rides With Us</div>
            </div>
            <div className='col-12 col-md-3  mt-3 mt-lg-4 fs-5  '>
              <h5 style={{ fontWeight: 700 }}>LEGAL</h5>
              <div>Terms & Conditions</div>
              <div>Refund And Cancellation</div>
              <div>Privicy Policy</div>
              <div>Cookie Policy</div>
            </div>
            <div className='col-12 col-md-3  mt-3 mt-lg-4 fs-5  '>
              <h5 style={{ fontWeight: 700 }}>LEGAL</h5>
              <div>Terms & Conditions</div>
              <div>Refund And Cancellation</div>
              <div>Privicy Policy</div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 mt-2 mt-lg-5'>
              <h5>FOLLOW US</h5>
              <i class="bi bi-instagram fs-4"></i>
              <i class="bi bi-github fs-4 ms-2 ms-lg-4"></i>
              <i class="bi bi-facebook fs-4 ms-2 ms-lg-4"></i>
            </div>
            <div className='col-4 mt-2 mt-lg-4 '>
              <h3 style={{ color: 'gray' }}>Receive exclusive offers and
                discounts in your mailbox</h3>
            </div>
            <div className='col-12 mt-2 mt-lg-4'>
              <span style={{ backgroundColor: 'gray' }} className=' px-2 py-2 px-lg-4 py-lg-2'>
                <i class="bi bi-envelope-at-fill " style={{ color: 'white' }}></i>
                <input type="text" className='ms-2 ms-lg-4 ' style={{ outline: 'none', border: 'none', backgroundColor: 'gray' }} />
              </span>
              <button className='btn ms-2 ms-lg-5 bg-warning px-2 py-2 px-lg-4 py-lg-2 text-white'>Subscribe</button>
            </div>
            <hr className='mt-1 mt-lg-5' />
            <div className='col-10'>
              <span>All Rights Reseverd @ Deeapk Company,2025</span>
            </div>
            <div className='col-2'>
              <span className=''>
                <span >Made With <i class="bi bi-heart-fill text-warning"></i> by Deepak </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home