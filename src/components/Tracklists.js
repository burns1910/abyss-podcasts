import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const url = '/api/tracklists'

const Tracklists = () => {
  const [tracklists, setTracklists] = useState([])

  const fetchData = async () => {
    try {
      const {data} = await axios.get(url)
      setTracklists(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    fetchData()
  }, [])
  return (
    <section className="section section-center">
    <div className="title">
      <h2>Abyss Podcasts</h2>
      <div className="title-underline"></div>
    </div>
    <div className="tracklists">
      {tracklists.map((tracklist) => {
        const {id,name,image_url} = tracklist
        return <Link to={`/${id}`} className="tracklist-link" key={id}>
          <img src={image_url} alt={name} />
          <div className="info">
            <h5>{name}</h5>
          </div>
        </Link>
      })}
    </div>
  </section>
  )
}

export default Tracklists