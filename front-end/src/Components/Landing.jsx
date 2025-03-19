import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownLogin from './DropdownLogin';
import DropDownSignup from './DropDownSignup';

const Landing = () => {

    const Navigate = useNavigate();
    const handleclick = ()=>{
        Navigate('/Login')
    }
    const handleSign =()=>{
        Navigate('/Signup')
    }


  return (
    <div>
      <div className="container py-6">
  <div className="row align-items-center">
    <div className="col-lg-6">
      <div className="mb-4">
        <h1 className="display-5 fw-semibold text-dark">
          Bid Smart, Win Big: <br />
          Your Gateway to <br />
          <span className="text-primary">Online Auctions</span>
        </h1>

        <p className="mt-3 text-secondary">
          Discover a new era of online auctions with our cutting-edge platform
          designed to bring buyers and sellers together in a seamless, secure,
          and engaging environment. Whether you are looking to find great deals
          or sell unique items, our system provides real-time bidding,
          transparent transactions, and a wide array of categories to explore.
          Join our community today and experience the excitement of winning big
          in the world of online auctions!
        </p>

        <button className="btn btn-primary mt-4 me-3"><DropDownSignup/></button>
        <button className="btn btn-outline-primary" ><DropdownLogin/></button>
      </div>
    </div>

    <div className="col-lg-6 d-flex justify-content-center mt-4 mt-lg-0">
      <img
        className="img-fluid"
        src="https://merakiui.com/images/components/Catalogue-pana.svg"
        alt="Catalogue"
      />
    </div>
  </div>
</div>

    </div>
  )
}

export default Landing
