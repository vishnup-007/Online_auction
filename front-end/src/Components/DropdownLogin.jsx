import React from 'react'
import { Dropdown, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const DropdownLogin = () => {
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate('/Login')
    }

    const handleLogin =()=>{
        navigate('/LoginSeller')
    }
  return (
    <div>
       <Dropdown>
            <Dropdown.Toggle variant="primary">
                Dropdown
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={handleClick}>UserLogin</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={handleLogin}>SellerLogin</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default DropdownLogin
