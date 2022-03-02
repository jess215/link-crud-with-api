import axios from "axios"
import React, { useState } from "react"

export const DataContext = React.createContext()

const DataProvider = (props) => {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const beforeApiCallSetup = () => {
    setLoading(true)
    setError(false)
  }

  const getLinks = async () => {
    beforeApiCallSetup()
    try {
      let res = await axios.get(
        "https://link-app-sp22.herokuapp.com/api/links"
      )
      setLinks(res.data)
    } catch (err) {
      alert("err occurred letting links")
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const addLink = async (linkData) => {
    beforeApiCallSetup()
    try {
      let res = await axios.post(
        "https://link-app-sp22.herokuapp.com/api/links",
        linkData
      )
      console.log(res.data)
      setLinks([...links, res.data])
    } catch (err) {
      console.log(err)
      alert("err occurred gettings links")
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const updateLink = async (linkData) => {
    beforeApiCallSetup()
    try {
      let res = await axios.put(
        "https://link-app-sp22.herokuapp.com/api/links/${linkData.id}",
        linkData
      )
      setLinks(links.map((l) => (l.id === res.data.id ? res.data : l)))
    } catch (err) {
      alert("err occurred getting links")
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const deleteLink = async (id) => {
    beforeApiCallSetup()
    try {
      let res = await axios.delete(
        "https://link-app-sp22.herokuapp.com/api/links/${id}"
      )
      setLinks(links.filter((l) => l.id !== id))
    } catch (err) {
      alert("err occurred getting links")
    } finally {
      setLoading(false)
    }
  }

  const dataProviderThing = {
    links,
    getLinks,
    addLink,
    updateLink,
    deleteLink,
    loading,
    error,
  }

  return (
    <DataContext.Provider value={dataProviderThing}>
      {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider