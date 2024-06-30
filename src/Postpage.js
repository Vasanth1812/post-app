import React from 'react'
import { useParams, Link } from 'react-router-dom'



const Postpage = ({posts,handledelete}) => {
  const {id}=useParams();
  const post = posts.find(post=>(post.id).toString()===id);
  return (
    <main className='PostPage'>
      <article className='Post'>
        {post &&
        <>
             <h3>{post.title}</h3>
             <p className="postDate">{post.datetime}</p>
             <p className="postBody">
               {post.body}
             </p>
             <button className='deleteButton' onClick={()=>handledelete(post.id)}>
              Delete post
             </button>
             <Link to={`/edit/${id}`}><button className='editButton'>Edit Post</button></Link>
        </>
         }
         {!post &&
          <>
            
            <h2>Page Not Found</h2>
        <p>Well, thats disappointing</p>
        <p>
           <Link to="/"> Visit Our Homepage</Link>
           </p>
          </>
         
         }
        </article>  
        

      
        
    </main>
  )
}

export default Postpage