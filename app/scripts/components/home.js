/**
 * This file will hold the Main content that lives in the main body of the site
 * 
 */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


class Home extends React.Component {

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof Home
    */
    render() {
        const { product } = this.props;
        return (
            <section id="home">
                <div className="content">
                    {product ?
                    <div>
                    <Card className="md-selected-card">
                        <CardContent className="md-selected-content">
                            <Typography variant="h3">
                                {product.name.toUpperCase()}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {product.about.toUpperCase()}
                            </Typography>
                            <Typography variant="h5">
                                $ {product.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className="md-selected-tags">
                                {product.tags.map(t => `#${t} `)}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            className="md-selected-cover"
                            image={product.picture}
                            title={product.name}
                        />
                    </Card>
                    </div>
                    : <p>Search products</p> }
                </div>
            </section>
        );
    }


}

// Export out the React Component
module.exports = Home;