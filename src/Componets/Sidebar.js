import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import './Sidebar.css';  // Make sure to import the custom CSS
 
export default class Sidebar extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      isSidebarOpen: false,  // To manage sidebar open/close state

    };

  }
 
  // Function to toggle the sidebar

  toggleSidebar = () => {

    this.setState((prevState) => ({

      isSidebarOpen: !prevState.isSidebarOpen,

    }));

  };
 
  render() {

    return (
<div>

        {/* Button to open sidebar */}
<button 

          className="btn btn-primary sidebar-toggle" 

          onClick={this.toggleSidebar}
>
<i className="bi bi-list"></i>
</button>
 
        {/* Sidebar */}
<div

          className={`sidebar-container ${this.state.isSidebarOpen ? 'sidebar-open' : ''}`}
>
<div className="sidebar d-flex flex-column align-items-center bg-blue-100 text-black p-2 vh-100">
<i className="text-black fs-4">Menu</i>
<span className="fs-6 text-black"></span>
 
            <hr className="text-secondary" />
<div className="list1">
<nav>
<ul className="nav nav-pills flex-column">
<li className="nav-item p-1">
<a href="/" className="nav-link text-black">
<i className="bi bi-house"></i>
<span className="fs-10"> Home</span>
</a>
</li>
{/* <li className="nav-item p-1">
<a href="/login" className="nav-link text-black">
<i className="bi bi-book me-2 fs-5"></i>
<span className="fs-10">Login</span>
</a>
</li> */}
<li className="nav-item p-1">
<a href="/MyProfile" className="nav-link text-black">
<i className="bi bi-person me-2 fs-5"></i>
<span className="fs-10">My Profile</span>
</a>
</li>
<li className="nav-item">
<a href="/Exams" className="nav-link text-black">
<i className="bi bi-basket me-2 fs-5"></i>
<span className="fs-10">Exams</span>
</a>
</li>
<li className="nav-item p-1">
<a href="/AboutUs" className="nav-link text-black">
<i className="bi bi-info-circle me-2 fs-5"></i>
<span className="fs-10">About Us</span>
</a>
</li>
</ul>
</nav>
<div className="Copyright">
<hr className="text-secondary" />
<i className="bi bi-c-circle fs-8"></i>
<span> CertiLand</span>
</div>
</div>
</div>
</div>
</div>

    );

  }

}

 