// eslint-disable-next-line no-unused-vars
import React , { useState ,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const navigate = useNavigate();

    const [posts , setPosts] = useState([

    ])

    useEffect (() => {
        axios.get('http://localhost:2000/posts')
        .then((res) => {

            setPosts(res.data.Posts);

        })
    },[])

    return (

        <section className='feed-section'>

            <div>
                <button className="create-post-btn" onClick={() => navigate("/create-post")}>
                    Create Post
                </button>
            </div>
        
            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='post-card'>
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading the available posts...</p>
                )
            }

        </section>
    )
}

export default Feed