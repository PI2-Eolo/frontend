import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";

const emptyMetriInfo = {
  consumption: 0,
  energyProduction: 0,
  humidity: 0,
  temperature: 0,
};

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-upperContainer ">
        <div>
          <Overview
            realTimeData={emptyMetriInfo}
            dailyData={emptyMetriInfo}
            weeklyData={emptyMetriInfo}
            monthlyData={emptyMetriInfo}
          />
          {
            // Earnings goes here
          }
        </div>

        <PieChart
          label="Consumption details"
          data={[
            { label: "Kitchen", value: 241, color: "#7459D9" },
            { label: "Living room", value: 132, color: "#B9ABEB" },
            { label: "Other", value: 32, color: "#E3DEF7" },
          ]}
          unit="kW/h"
        />
      </div>
    </div>
  );
}

export default App;
