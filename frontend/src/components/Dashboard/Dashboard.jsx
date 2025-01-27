import React from "react";
import "./Dasboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>
        Good Morning, <span>Sujith</span>
      </h2>
      <div className="charts">
        {/* Total Clicks Card */}
        <div className="chart">
          <h3>Total Clicks</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>
            1234
          </p>
        </div>

        {/* Date-wise Clicks Card */}
        <div className="chart">
          <h3>Date-wise Clicks</h3>
          <div>
            <p>21-01-25</p>
            <div className="bar" style={{ width: "80%", backgroundColor: "#007bff", height: "10px", margin: "5px 0" }}></div>
            <p>1234</p>
          </div>
        </div>

        {/* Click Devices Card */}
        <div className="chart">
          <h3>Click Devices</h3>
          <div>
            <p>Mobile</p>
            <div className="bar" style={{ width: "70%", backgroundColor: "#007bff", height: "10px", margin: "5px 0" }}></div>
            <p>134</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
