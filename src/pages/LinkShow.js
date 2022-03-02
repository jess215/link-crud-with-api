import axios from "axios"
import { useEffect, useState } from "react"
import { Link as ReactRouterLink, useParams } from "react-router-dom"
import LinkForm from "./LinkForm"


const LinkShow = () => {
    const [link, setLink] = useState({})
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    const {id} = useParams()
        useEffect(() => {
            getLink()
        },[])

    const getLink = async () => {
        let res = await axios.get(`https://link-app-sp22.herokuapp.com/${id}`)
        setLink(res.data)
        setLoading(false)
    }

    if(loading) return <p>loading</p>

    if(editing) return <LinkForm setEditing={setEditing} {...link}/>
    
    return (
        <div>
            <h1>LinkShow Page</h1>
            {JSON.stringify(link)}
            <button onClick={() => setEditing(true)}>Edit</button>
            <ReactRouterLink to='/'>Back</ReactRouterLink>
        </div>
    )
}

// useEffect(() => {

// })

export default LinkShow