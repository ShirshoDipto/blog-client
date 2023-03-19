import "./main.css"
import MainHeader from "../mainHeader/MainHeader"
import Sidebar from "../sidebar/Sidebar"
import Posts from "../posts/Posts"

export default function Main() {
  return (
    <div className="main">
      <MainHeader />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </div>
  )
}