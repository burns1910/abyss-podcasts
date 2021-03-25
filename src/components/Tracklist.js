import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link,useParams} from 'react-router-dom'
import sc_button from '../btn-connect-sc-l.png'

const Tracklist = () => {
  const [loading,setLoading] = useState(true)
  const [tracklistObject,setTracklistObject] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`/api/tracklists?id=${id}`)
        setTracklistObject(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [id])
  if(loading) {
    return <section className="section section-center">
      <h2>Loading...</h2>
    </section>
  }
  const {fields} = tracklistObject
  const {name,tracklist,image, verified, sc_profile} = fields;

  return (
    <section className="section section-center">
      <Link to="/" className="link">
        Zurück
      </Link>
      <div>
        <div className="title">
          <h2>{name}</h2>
          <div className="title-underline"></div>
        </div>
        <article className="tracklist">
          <img className="tracklist-img" src={image[0].url} alt={name}/>
          <div>
            <h5>{name}</h5>
            <p className="tracklist-list">
              {verified ? tracklist :
              `Sharing is caring...

              to get the tracklist please follow
              @abyss_hamburg and
              @${sc_profile}
              
              and like the set 👍
              
              To do so or to verify, that you already did, please connect with your SoundCloud profile.
              `}
            </p>
            {verified ?? <img src={sc_button} alt="Connect with soundcloud"/>}
          </div>
        </article>
      </div>
    </section>
  )
}

export default Tracklist