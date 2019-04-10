import React, { Component } from 'react';
import api from '../../services/api';
//import images from '../../services/images';
import "./styles.css";

export default class Product extends Component {
    state = {
        product: {},
        artist_image_url: '',
    }

    async componentDidMount(){
        const { id } = this.props.match.params;
        const response = await api.get(id);
        //const artist_image_url = await images(response.data.data[0].artist);
        console.log('response aqui =>',response.data.data[0]);
        this.setState({ product: response.data.data[0]});
        
    }

    render(){
        const { product } = this.state;
        //{<img src={artist_image_url} alt={product.artist}></img>}  */ 
        return (
            <div className="body">
                <div className='product-info'>
                    <strong>{product.name} - {product.artist}</strong>
                    <p>Artista: {product.artist}</p>
                    <div className="image">  
                    </div> 
                    <p>Raridade: {product.rarity}</p>
                    <p>Descrição: {product.oracle_text}</p>
                </div>
            </div>
        )
    }
}