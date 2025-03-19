import React from 'react'
import { Dropdown, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const DropDownSignup = () => {
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate('/Signup')
    }

    const handleLogin =()=>{
        navigate('/Signaut')
    }

  return (
    <div>
       <div>
       <Dropdown>
            <Dropdown.Toggle variant="primary">
                Dropdown
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={handleClick}>UserSignup</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={handleLogin}>Sellersignup</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    </div>
    </div>
  )
}

export default DropDownSignup
