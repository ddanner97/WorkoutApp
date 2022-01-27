import React from 'react'
import '../static/styles/components/SearchBar/searchbar.css'

function SearchBar() {
    return (
        <form action="/" method="get" className="search-form">
            <button type="submit"><i className="fa fa-search search-button"></i></button>
            <input type="text" id="header-search" 
                placeholder="Search Workouts" name="s" 
            />
        </form>
    )
}

export default SearchBar
