import { useContext } from "react"
import { Link as ReactRouterLink } from "react-router-dom"
import { DataContext } from "../providers/DataProvider"

const Links = () => {
    let { links, getLinks, addLink, updateLink, deleteLink, loading, error } =
        useContext(DataContext)

const renderLinks = () => {
    return links.map((link) => {
      return (
        <div
          key={link.id}
          style={{ margin: "20px", padding: "20px", border: "1px dashed red" }}
        >
          <h1>{link.title}</h1>
          <a href={link.url} target="_blank">
            {link.title}
          </a>
          <p>{link.description}</p>
          <p>{link.username}</p>
          
          <button disabled={loading} onClick={() => deleteLink(link.id)}>
            delete
          </button>
          <ReactRouterLink to={`links/${link.id}`}>show</ReactRouterLink>
          <ReactRouterLink to={`links/${link.id}/edit`}>edit</ReactRouterLink>
        </div>
      );
    });
  };

    return (
        <div>
            <h1>Links Page</h1>

            <p>CRUD TEST</p>
            <button onClick={getLinks}>Get Links</button>
            <button onClick={() => addLink({ username: "jessican", title: "from react" })}>Add Links</button>
            <button onClick={() => updateLink({ ...links, title: "ChAnGED" })}>Update Links</button>
            <button onClick={() => deleteLink(links[0]? links[0].id:1)}>Delete Links</button>
            <p>loading state: {loading ? 'true':'false'}</p>
            <p>error state: {error ? 'true':'false'}</p>
            <ReactRouterLink to='links/new'>New Link</ReactRouterLink>
            
            <code>
                {JSON.stringify(links)}
            </code>

        </div>
    )
}

export default Links