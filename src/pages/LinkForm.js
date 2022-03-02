import { useContext, useState } from "react"
import { Link as ReactRouterLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { DataContext } from "../providers/DataProvider"

const LinkForm = (props) => {
    const {updateLink, addLink, error} = useContext(DataContext)
    const navigate = useNavigate()
    const {state} = useLocation()
    const params = useParams()
    const [title, setTitle] = useState(props.title || state && state.title || '')
    const [description, setDescription] = useState(props.description || state && state.description || '')
    const [username, setUsername] = useState(props.username || state && state.username || '')
    const [url, setUrl] = useState(props.url || state && state.url || '')

    const handleSubmit = (e) => {
        e.preventDefault()

        let linkData = {title, description, username, url}
        if(params.id){
            updateLink({id:params.id, ...linkData})
            navigateBack()
        } else {
            addLink(linkData)
            navigate('/')
        }
    }
    const navigateBack = () => {
        if(props.id){
            props.setEditing(false)
        } else {
            navigate('/')
        }
    }

    return (
        <div>
            <h1>LinkForm Page</h1>
            {error && <p>ERROR OCCURRED</p>}
            <reactRouterLink to='/'>Back</reactRouterLink>

            <form onSubmit={handleSubmit} style={{border:'1px dashed red'}}>
                <p>Title</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <p>Description</p>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
                <p>Username</p>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
                <p>URL</p>
                <input value={url} onChange={(e) => setUrl(e.target.value)} />
                <br />
                <button type='submit'>{params.id ? 'update':'add'}</button>
                <button onClick={navigateBack}>Cancel</button>

            </form>
        </div>
    )
}

export default LinkForm