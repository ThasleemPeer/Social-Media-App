import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Createpost from './components/CreatePost';
import PostList from './components/PostList';
import PostListProvider from './store/post-list-store';

function App() {
  const [selectedTab,setSelectedTab]=useState("Home");

  return (
    <PostListProvider>
      <div className="app-container">
      <div className="sidebarr">
      <Sidebar selectedTab ={selectedTab} setSelectedTab={setSelectedTab}></Sidebar>
      </div>
      <div className="content">

        <Header></Header>
       {selectedTab==="Home" ? ( <PostList></PostList>) : (<Createpost></Createpost>)}
        <Footer></Footer>
  
       </div>
    </div>
    </PostListProvider>
  )
}

export default App
