import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap'
import { Container, Nav, Navbar, Dropdown, Row, Col, Button, Card, Offcanvas, Table ,Carousel} from 'react-bootstrap';
import axios from 'axios'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RightOffCanvasExample() {
  const [shows, setShows] = useState(false);

  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [login, setlogin] = useState({
    email: '',
    password: '',
    conform_password: ''
  })

  let changes = (e) => {
    const { name, value } = e.target
    setlogin({ ...login, [name]: value })
  }

  let sumbits = () => {
    try {
      axios.post('http://localhost:8080/post', login)
      setlogin({
        email: '',
        password: '',
        conform_password: ''
      })
    } catch (error) {
      console.log(error);
    }
  }



  const [items, setitems] = useState([{
    name: '',
    img: '',
    // rate: '',
    // costicon: '',
    price: '',
    catogry: ''
  }])

  const change = (e) => {
    const { name, value } = e.target
    setitems({ ...items, [name]: value })

  }

  let sumbit =async () => {

    try {
     const response=await axios.post("http://localhost:8080/put", items)
      console.log(items);
      const foodid=response.data.id
      localStorage.setItem("foodid",foodid)
      
      console.log("=============",foodid,"=======");
      
      setitems({
        name: '',
        img: '',
        // icon: '',
        rate: '',
        // costicon: '',
        price: '',
        catogry: ''
      })
    } catch (error) {
      console.log("error", error);

    }
  }

  // const menu = () => {
  //   document.getElementById("dee").style.display = "block"
  // }

  return (
    <>
      <Button variant="primary" onClick={handleShows}>
        Launch demo modal
      </Button>

      <Modal show={shows} onHide={handleCloses}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
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
      {/* Button to trigger the Offcanvas */}
      <Button variant="primary" onClick={handleShow}>
        Open Right Offcanvas
      </Button>

      {/* Right Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas Right</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Add your content here! You can include text, images, or any other
          components.
        </Offcanvas.Body>
      </Offcanvas>

      {/* <div className="container-fluid mt-lg-5">
        <div className="container ">
          <div className="row ">
            <div className='col-12 col-md-6 col-lg-3 mt-3 mt-lg-5'>
              <Card style={{ border: 'none' }} className=" text-light ">
                <Card.Img id='cards' fluid src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-1.png" alt="Card image" />
               
                <div id='percentage' className='d-none d-md-block  d-md-flex'>
                  <h1 className='text-center ms-4 mt-3'>15</h1>
                  <div>
                    <h5 className='mt-3'>%</h5>
                    <h5 >off</h5>
                  </div>
                </div>
                
              </Card>
              <div>
                <h5 className='mt-2 mt-lg-3'>Flat Hill Slingback</h5>
                <button id='days' className='mt-2  px-2 px-lg-4 py-2 py-lg-2'>6 Days Remaining</button>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mt-3 mt-lg-5'>
              <Card style={{ border: 'none' }} className=" text-light ">
                <Card.Img id='cards' fluid src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-2.png" alt="Card image" />
              
                <div id='percentage' className='d-none d-md-block d-md-flex'>
                  <h1 className='text-center ms-4 mt-3'>10</h1>
                  <div>
                    <h5 className='mt-3'>%</h5>
                    <h5 >off</h5>
                  </div>
                </div>
             
              </Card>
              <div>
                <h5 className='mt-2 mt-lg-3'>Ocean Blue Ring</h5>
                <button id='days' className='mt-2  px-2 px-lg-4 py-2 py-lg-2'>6 Days Remaining</button>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mt-3 mt-lg-5'>
              <Card style={{ border: 'none' }} className=" text-white ">
                <Card.Img id='cards' fluid src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-3.png" alt="Card image" />
               
                <div id='percentage' className='d-none d-md-block d-md-flex'>
                  <h1 className='text-center ms-4 mt-3'>25</h1>
                  <div>
                    <h5 className='mt-3'>%</h5>
                    <h5 >off</h5>
                  </div>
                </div>
               
              </Card>
              <div>
                <h5 className='mt-2 mt-lg-3'>Brown Leathered Wallet</h5>
                <button id='days' className='mt-2  px-2 px-lg-4 py-2 py-lg-2'>6 Days Remaining</button>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mt-3 mt-lg-5'>
              <Card style={{ border: 'none' }} className=" text-light ">
                <Card.Img id='cards' fluid src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-4.png" alt="Card image" />
                
                <div id='percentage' className='text-center d-none d-md-block  d-md-flex'>
                  <h1 className='text-center ms-4 mt-3' >20 </h1>
                  <div>
                    <h5 className='mt-3'>%</h5>
                    <h5 >off</h5>
                  </div>
                </div>
                
              </Card>
              <div>
                <h5 className='mt-2 mt-lg-3'>Silverside Wristwatch</h5>
                <button id='days' className='mt-2  px-2 px-lg-4 py-2 py-lg-2'>6 Days Remaining</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/logo.svg" className="img-fluid" alt="" />
            </div>
            <div className="col-12">
              <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid justify-content-center">
               
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                      </li>
                      <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Dropdown link
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li><a class="dropdown-item" href="#">Action</a></li>
                          <li><a class="dropdown-item" href="#">Another action</a></li>
                          <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div> */}


      {/* <div className="container-fluid" id="background">
        <div className="container">
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </div> */}


      <input type="text" name="name" placeholder="dishname" value={items.name} onChange={change} /> <br />
      <input type="text" name="img" placeholder="img" value={items.img} onChange={change} /> <br />
      {/* <input type="text" name="icon" value={items.icon} onChange={change} /> <br /> */}
      <input type="text" name="rate" placeholder="rating" value={items.rate} onChange={change} /> <br />
      {/* <input type="text" name="costicon" value={items.costicon} onChange={change} /> <br /> */}
      <input type="text" name="price" placeholder="pice" value={items.price} onChange={change} /> <br />
      <select value={items.catogry} name="catogry" onChange={change}> <br />
        <option value="select">select</option>
        <option value="chicken">chicken</option>
        <option value="see food">see food</option>
        <option value="burger">burger</option>
        <option value="veg">veg</option>
      </select> <br />
      <button onClick={sumbit}>sumbit</button>



      {/* <div>
        <Button  onClick={menu}><i class="bi bi-list"></i>
        <div class="card " id="dee" style={{width: 18+"rem",display:"none"}}>
          <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
        </Button>
        
      </div> */}

      {/* <div className='col-12 col-md-8'>
                {foods.map((products) => (
                  <div key={products.id}>
                    <div class="cards">
                      <img src="..." class="card-img-top" alt="..."/>
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                  </div>
                ))}
          </div> */}


      {/* 
          <h3 className='text-center mb-2 mb-lg-5'>Pick Up</h3>
            <div>
              <span className='chicken px-4 px-lg-3 py-4 py-lg-4 '>
                <a href="" id='dish' >
                  <Image className=' me-2 me-lg-3 ms-2 px-2  py-2 ' id='chicken1' src='https://foodor-html.tortoizthemes.com/assets/images/meat-icon.png'></Image>
                  <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Chicken Dish</span>
                </a>
              </span>
            </div>
            <div className='mt-4 mt-lg-5'>
              <span className='chicken5 px-4 px-lg-3 py-4 py-lg-4 '>
                <a href="" id='dish1' >
                  <Image className=' me-2 me-lg-3 ms-2 px-2  py-2 ' id='chicken2' src='https://foodor-html.tortoizthemes.com/assets/images/fish-icon.png'></Image>
                  <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Sea Food Dish</span>
                </a>
              </span>
            </div>
            <div className='mt-4 mt-lg-5'>
              <span className='chicken5 px-4 px-lg-3 py-4 py-lg-4 '>
                <a href="" id='dish1' >
                  <Image className=' me-2 me-lg-3 ms-2 px-2  py-2 ' id='chicken2' src='https://foodor-html.tortoizthemes.com/assets/images/burger-icon.png'></Image>
                  <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Burger & Fries</span>
                </a>
              </span>
            </div>
            <div className='mt-4 mt-lg-5'>
              <span className='chicken5 px-4 px-lg-3 py-4 py-lg-4 '>
                <a href="" id='dish1' >
                  <Image className=' me-2 me-lg-3 ms-2 px-2  py-2 ' id='chicken2' src='https://foodor-html.tortoizthemes.com/assets/images/potato-icon.png'></Image>
                  <span className='fs-4 ms-2 ms-lg-2 me-2 me-lg-5'>Veg Food Dish</span>
                </a>
              </span>
            </div> */}
    </>
  );
}

export default RightOffCanvasExample;
