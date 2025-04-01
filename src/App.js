import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import CodePulse from "./pages/CodePulse.jsx"
import Dashboard from "./pages/Dashboard"
import ApiClient from "./pages/ApiClient"
import Collections from "./pages/Collections"
import History from "./pages/History"
import Settings from "./pages/Settings"

function App() {
  return (
    <>
        <Routes>
        <Route path="/" element={<MainLayout />}>
        {/* <Route path="/" element={}> */}
        <Route index element={<Dashboard />} />
        <Route path="/api-client" element={<ApiClient />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>

    <>
    {/* <CodePulse/> */}
    </>
  </>
  )
}

export default App

