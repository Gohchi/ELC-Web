/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchLength: 0,
            searchData: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        
        // Start Here
        // ...
        var url = new URL('http://localhost:3035/api/products/preview');

        url.search = new URLSearchParams({ query: e.target.value }).toString();

        fetch(url, {
            headers:{
                "accepts":"application/json"
            }
        }).then(res => res.json())
        .then(o => {
            this.setState({
                searchLength: o.length,
                searchData: o.data
            })
        })
        .catch(o => console.error(o));

    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        const { searchLength, searchData } = this.state;
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} placeholder="ENTER SEARCH TERM"/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    {searchData.length ? <p>
                        {`DISPLAYING ${searchData.length} OF ${searchLength} RESULTS`} 
                    </p> : undefined}
                    {searchData.map((o, i) =>
                        <div key={i}>
                            <img src={o.picture} />
                            <h1>{o.name.toUpperCase()}</h1>
                            <h2>{o.about.toUpperCase()}</h2>
                        </div>
                    )}
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;