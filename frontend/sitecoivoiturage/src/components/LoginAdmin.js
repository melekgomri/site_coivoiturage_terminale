import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import "antd/dist/reset.css"; 
import "../styles/loginForm.css"; 

//import TopBar from "./TopBar";

const LoginAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 
    
    const handleLogin = async (values) => {
      try {
        const response = await axios.post("http://localhost:3000/utilisateur/login", {
          email: values.email,
          password: values.password,
        });
    
        const { _id, token, isAdmin , name , lastname} = response.data;
    
        // Store user ID and token in local storage
        localStorage.setItem("userId", _id);  
        localStorage.setItem("token", token);
        localStorage.setItem("name" , name)
        localStorage.setItem("lastname" , lastname)
    
        // Navigate based on user role
        if (isAdmin) {
          navigate("/admin-dashboard"); // Route for admin
        } 
    
        message.success("Login successful");
      } catch (error) {
        console.error("Login failed:", error);
        message.error("Login failed. Please check your credentials.");
      }
    };

  return (
    <div className="login-container">
      {/* <TopBar /> */}
      <div className="form-wrapper">
        <h2 className="login-title">Login</h2>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin} // Trigger the login logic when the form is submitted
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#D90429", borderColor: "#D90429" }}
              block
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginAdmin;
