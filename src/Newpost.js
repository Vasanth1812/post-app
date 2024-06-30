import React from 'react';

const Newpost = ({ posttitle, setposttitle, postbody, setpostbody, handlesubmit }) => {
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handlesubmit}>
        <label htmlFor="postTitle">Title</label>
        <input
          type="text"
          id='postTitle'
          value={posttitle}
          onChange={(e) => setposttitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postbody}
          onChange={(e) => setpostbody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
}

export default Newpost;





