import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

    const [cartView, setCartView] = useState(false)

    let data = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    // console.log(localStorage.getItem("authToken")) ;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {   //agar authToken exit karta he to myorders ka option show karo else matt karna 
                                (localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                    </li>
                                    : ""}

                            {/* <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/">Action</Link></li>
                                    <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="/" tabindex="-1" aria-disabled="true">Disabled</Link>
                            </li> */}
                        </ul>

                        {
                            (!localStorage.getItem("authToken")) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>

                                    <Link className="btn bg-white text-success mx-1" to="/creatuser">SignUp</Link>
                                </div>
                                :
                                <div>
                                    <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>
                                        My Cart {" "}
                                        <Badge pill bg="danger"> {data.length} </Badge>
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}
                                    <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                                        Logout
                                    </div>

                                </div>
                        }



                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}
