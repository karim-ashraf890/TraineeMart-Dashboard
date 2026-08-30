import { useEffect } from "react";
import StackedAreaChart from "../../components/charts/StackedAreaChart";

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <p>Dashboard Page - Coming Soon</p> */}
      <StackedAreaChart />
    </div>
  );
}
