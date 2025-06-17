import "./Sidebar.css";
interface SideBarProps {
  onLogout: () => void;
}

const sidebarItems = [
  { name: "Dashboard", icon: "🏠" },
  { name: "Users", icon: "👥" },
  { name: "Settings", icon: "⚙️" },
  { name: "Reports", icon: "📊" },
];

const SideBar: React.FC<SideBarProps> = ({ onLogout }) => {
  return (
    <aside className="sidebar">
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
      <button
        onClick={onLogout}
        className="mt-4 w-full p-2 text-center border hover:bg-gray-700 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default SideBar;
