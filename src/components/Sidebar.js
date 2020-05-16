import React from "react";

const Sidebar = () => {
  return (
    <>
      <div
        className="menu-container px-1"
        style={{ backgroundColor: "#55b496", top: 0, height: "100%" }}
      >
        <div
          className="menu-wrapper py-1"
          style={{ height: 690, marginTop: 51 }}
        >
          <aside className="menu">
            <ul className="menu-list">
              <li>
                <a className="is-active has-background-black">
                  <i class="fas fa-landmark"></i>
                  BANKS
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <div
        className="menu-container px-1"
        style={{ backgroundColor: "#262F34", top: 87 }}
      >
        <div className="menu-wrapper py-1" style={{ height: 690 }}></div>
      </div>
    </>
  );
};

export default Sidebar;
