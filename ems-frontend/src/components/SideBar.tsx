import React from "react";

const SideBar = () => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.list}>
        {/* {items.map((item, idx) => (
          <li
            key={item.label}
            style={{
              ...styles.item,
              ...(selectedIndex === idx ? styles.selectedItem : {}),
            }}
            onClick={item.onClick}
          >
            {item.icon && <span style={styles.icon}>{item.icon}</span>}
            <span>{item.label}</span>
          </li>
        ))} */}
      </ul>
    </aside>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: 220,
    height: "100vh",
    background: "#23272f",
    color: "#fff",
    padding: "20px 0",
    boxSizing: "border-box",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  selectedItem: {
    background: "#353b48",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 12,
    fontSize: 18,
  },
};

export default SideBar;
