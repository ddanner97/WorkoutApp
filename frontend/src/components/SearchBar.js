import React from 'react'
import '../static/styles/components/SearchBar/searchbar.css'

function SearchBar() {
    return (
        <form action="/" method="get">
            <button type="submit"><i className="fa fa-search"></i></button>
            <input type="text" id="header-search" 
                placeholder="Search Workouts" name="s" 
            />
        </form>
    )
}

export default SearchBar
