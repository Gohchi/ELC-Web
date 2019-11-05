/**
 * The Initial React Setup file
 * ...
 * 
 * === CSS
 * The stylesheets are handled seperately using the gulp sass rather than importing them directly into React.
 * You can find these in the ./app/sass/ folder
 * 
 * == JS
 * All files in here start from this init point for the React Components.
 *  
 * 
 * Firstly we need to import the React JS Library
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './components/menu';
import Home from './components/home';


/**
 * We can start our initial App here in the main.js file
 */
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            product: {"_id":"005","isActive":"true","price":"7.00","picture":"/img/products/N0H101_430.png","name":"Color Sustain Pro","about":"Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.","tags":["ojon","treatment"]}
        };
        this.selectProduct = this.selectProduct.bind(this);
    }
    selectProduct(product){
        this.setState({
            product
        })
    }
    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <div className="App">
                <Menu selectProduct={this.selectProduct}/>
                <Home product={this.state.product}/>
            </div>
        );
    }

}

// Render this out
ReactDOM.render(<App />, document.getElementById('root'));
