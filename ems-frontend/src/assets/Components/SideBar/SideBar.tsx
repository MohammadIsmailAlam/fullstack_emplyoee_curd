import React from "react";
import "./Sidebar.css";

const sidebarItems = [
  { name: "Dashboard", icon: "🏠" },
  { name: "Users", icon: "👥" },
  { name: "Settings", icon: "⚙️" },
  { name: "Reports", icon: "📊" },
];

const SideBar = () => (
  <aside className="sidebar">
    {/* <h2 className="sidebar-title">My App</h2> */}
    <nav>
      <ul className="sidebar-list">
        {sidebarItems.map((item) => (
          <li key={item.name} className="sidebar-item">
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default SideBar;
