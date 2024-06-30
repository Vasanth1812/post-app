import {Routes,Route,useNavigate} from "react-router-dom"
import About from './About';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';

import Nav from './Nav';
import Newpost from './Newpost';
import Postpage from './Postpage';

import { useEffect, useState } from "react";
import { format } from 'date-fns';
import api from "./api/post"
import Editpost from "./Editpost";


function App() {
  const [posts,setposts] = useState([])
  const [search,setsearch] = useState('')
  const [searchresults,setsearchresults] = useState([])
  const [posttitle,setposttitle] = useState('')
  const [postbody,setpostbody] = useState('')
  const [edittitle,setedittitle] = useState('')
  const [editbody,seteditbody] = useState('')
  const navigate = useNavigate()

  useEffect (() => {
    const fetchposts = async() => {
      try{
      const response = await api.get('/posts')
      setposts(response.data)
      console.log(response.data)
      }
      catch(err){
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchposts()
  },[])

    useEffect (()=>{
    if(Array.isArray(posts)) {
      const filteresresults = posts.filter((post)=> ((post.body).toLowerCase()).includes(search.toLowerCase())  || 
           ((post.title).toLowerCase()).includes(search.toLowerCase()))
                  
            setsearchresults(filteresresults.reverse())                     
    }},[posts,search])


  const handlesubmit = async(e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    const id=posts.length ? posts[posts.length-1].id + + "1" : 1;
    const datetime =format(new Date(), 'MMMM dd, yyyy pp');
    const newpost = {id, title:posttitle, datetime, body:postbody};
    try{
    const response = await api.post('/posts',newpost)
    const allposts=[...posts , response.data];
    setposts(allposts)
    setposttitle('')
    setpostbody('')
    navigate('/')
     }catch(err){
       console.log(`${err.message}`)
     }
  }
  
  const handledelete = async (id) => {
    try{
    await api.delete(`/posts/${id}`)
    const postlists = posts.filter(post => post.id!==id)
    setposts(postlists) 
    navigate('/')
  } catch(err){
    console.log(`${err.message}`)
  }
}

const editsubmit = async(id)=> {
  const datetime =format(new Date(), 'MMMM dd, yyyy pp');
  const updatepost = {id, title:edittitle, datetime, body:editbody};
  try{
    const response = await api.put(`/posts/${id}`,updatepost)
    setposts(posts.map(post => post.id===id ? {...response.data} : post))
    setedittitle('')
    seteditbody('')
    navigate('/')
     }catch(err){
       console.log(`${err.message}`)
     }
  }

  return (
    <div className="App">
      
       <Header title="social media post"/>
      <Nav search={search} setsearch={setsearch} />
      <Routes>

       <Route path="/" element={<Home posts={searchresults}/>} />
       <Route path="post" >
              <Route index element={<Newpost posttitle={posttitle}
               handlesubmit={handlesubmit}
               setposttitle={setposttitle}
              postbody={postbody}
               setpostbody={setpostbody}  /> } />
               <Route path=":id" element={<Postpage posts={posts} handledelete={handledelete}/>} /> 
      </Route>
      <Route path="/edit/:id" element={<Editpost
               posts={posts}
               editbody={editbody}
               seteditbody={seteditbody}
               edittitle={edittitle} 
               setedittitle={setedittitle}
               editsubmit={editsubmit}/>} />
      <Route path="about" element={<About/>} />
      <Route path="*" element={<Missing/>} />
      </Routes>
      <Footer/> 
    
     
    </div>
  )

}

export default App;
