import React, { useEffect, useState } from "react";
import { Layout, Table, Tag, Button, Input, Space, Avatar, Typography, message } from "antd";
import { SearchOutlined, UserOutlined, SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authFirstName, setAuthFirstName] = useState("");
  const [authLastName, setAuthLastName] = useState("");
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const firstName = localStorage.getItem("name"); 
    const lastName = localStorage.getItem("lastname");   
    setAuthFirstName(firstName || "User");
    setAuthLastName(lastName || "");
  }, []);


  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/utilisateur/getall");
        console.log("Fetched users:", response.data); // Log the fetched users
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        message.error("Failed to load users.");
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Filter data by name and lastname
  const filteredData = users.filter(record =>
    (record.name + " " + record.lastname).toLowerCase().includes(searchText.toLowerCase())
  );


  const removeUser = async (id) => {
    console.log("Attempting to remove user with ID:", id); // Log the ID being removed
    try {
        const response = await axios.delete(`http://localhost:3000/utilisateur/delete/${id}`);
        if (response.data) {
            message.success("User deleted successfully.");
            // Refresh the user list after deletion
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id)); // Use the previous state
        }
    } catch (error) {
        message.error("Failed to delete user.");
        console.error("Error deleting user:", error);
    }
};

const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userId");  
    localStorage.removeItem("lastname");
    localStorage.removeItem("token");
    localStorage.removeItem("name")
    localStorage.removeItem("lastname")
   

    navigate("/"); 
    message.success("Logged out successfully."); 
  };
  // Dropdown menu
  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <Button type="link" onClick={handleLogout} style={{ color: "#FF5733" }}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  

  // Define columns
  const columns = [
    
    {
        title: "",
        dataIndex: "avatar",
        key: "avatar",
        render: (_, record) => (
          record.avatar ? (
            <Avatar src={record.avatar} />
          ) : (
            <Avatar icon={<UserOutlined />} />
          )
        ),
      },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div>
          <Text strong>{`${record.name} ${record.lastname}`}</Text>
          <br />
          <Text type="secondary">{record.email}</Text>
        </div>
      ),
    },
    
    {
      title: "User Role",
      dataIndex: "roles",
      key: "roles",
      render: (_, record) => (
        <Space>
          {record.isAdmin && <Tag color="green">Admin</Tag>}
          {record.isCovoitureur && <Tag color="blue">Covoitureur</Tag>}
          {!record.isAdmin && !record.isCovoitureur && <Tag color="gold">Passager</Tag>}
        </Space>
      ),
    },
    {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
            <Space>
                <Button 
                    icon={<DeleteOutlined />} 
                    type="link" 
                    danger  
                    onClick={() => {
                        console.log("Removing user:", record._id); // Log the ID being removed
                        removeUser(record._id); // Make sure this ID is correct
                    }}
                >
                    Remove User
                </Button>
            </Space>
        ),
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Top Bar */}
      <Header style={{ backgroundColor: "#002B5B", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px" }}>
        <Title level={3} style={{ color: "#FFFFFF", margin: 0 }}>MyDashee</Title>
        <div style={{ color: "#FFFFFF", fontSize: "16px" }}>
        <Avatar style={{ backgroundColor: "#FF5733", marginRight: "8px" }}>{authFirstName.charAt(0)}</Avatar>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button style={{ color: "#FFFFFF", background: "transparent", border: "none", marginLeft: "8px" }}>
              {`${authFirstName} ${authLastName}`} <DownOutlined />
            </Button>
          </Dropdown>
        </div>

    
      </Header>

      {/* Main Content */}
      <Content style={{ padding: "24px" }}>
        <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <Title level={4}>User Management</Title>
        
        </Space>

        <Space style={{ width: "100%", marginBottom: 16 }}>
          <Input
            placeholder="Search User"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredData.map((user) => {
            console.log("Mapping user:", user); // Log the user object
            return {
              key: user._id,
              _id: user._id,
              name: user.name,
              lastname: user.lastname,
              age: user.age,
              email: user.email,
              isAdmin: user.isAdmin,
              isCovoitureur: user.isCovoitureur,
              avatar: user.avatar
            };
          })}
          loading={loading}
          pagination={{ pageSize: 7, showSizeChanger: true }}
          bordered
        />
      </Content>
    </Layout>
  );
};

export default AdminDash;
