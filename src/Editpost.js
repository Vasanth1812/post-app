import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Editpost = ({posts,edittitle,setedittitle,editbody,seteditbody,editsubmit}) => {
    const {id}=useParams();
    const post = posts.find((post)=>(post.id).toString()===id)

    useEffect ( ()=> {
        if(post){
            setedittitle(post.title);
            seteditbody(post.body);
        }
    },[post,seteditbody,setedittitle])
  return (
    <main className='NewPost'>
        
                 <>
                 <h2>Edit Post</h2>
                 <form className='newPostForm'onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="">Title:</label>
                    <input type="text"
                    id='PostTitle'
                    required
                    value={edittitle}
                    onChange={(e)=>setedittitle(e.target.value)} />

                    <label htmlFor="postBody">Post:</label>
                    <textarea  id="PostBody"
                     required
                     value={editbody}
                     onChange={(e)=>seteditbody(e.target.value)}></textarea>
                 </form>
                 </>
                 <button className='edit' onClick={()=>editsubmit(id)}>Submit</button>
                    {!post &&
                         <>
                         <h2>Page Not Found</h2>
                         <p>Well, thats disappointing</p>
                         </>        
                    }
    </main>
  )
}

export default Editpost