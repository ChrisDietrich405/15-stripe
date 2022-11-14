import React from 'react'
import { FaTimes } from 'react-icons/fa'
import sublinks from './data'
import { useGlobalContext } from './context'

const Sidebar = () => {
    const {isSidebarOpen, handleSidebarClose} = useGlobalContext
  return <aside className={`${isSidebarOpen ? "show sidebar-wrapper" : "sidebar-wrapper"}`}>

    <div className="sidebar">
        <button className="close-btn" onClick={handleSidebarClose}>
            <FaTimes/>
        </button>
        <div className="sidebar-links">
            {sublinks.map((item, index) => {
                return (
                    <article key={index}>
                        <h4>{item.page}</h4>
                        <div className="sidebar-sublinks">
                            {item.links.map((link, index) => {
                                return (
                                    <a key={index} href={link.url}>
                                        {link.icon}
                                        {link.label}
                                    </a>
                                )
                            })}
                        </div>
                    </article>
                )
            })}
        </div>
    </div>
  </aside>
}

export default Sidebar