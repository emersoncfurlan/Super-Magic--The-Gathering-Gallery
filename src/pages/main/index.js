import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = {
        products: [],
        next_page: "",
        page : 0,
    }
    componentDidMount(){
        this.loadProducts();
    }
    loadProducts = async (page=0) => {
        const response  = await api.get('?');
        const { data, next_page } = response.data; 
        //console.log('response ==>', response);
        //console.log('response data ==>', response.data);
        //console.log('response data.nextpage ==>', next_page);

        this.setState({ products: data, next_page, page}, () => {
           //console.log('Aqui ==>', this.state);
          });

    };

     prevPage = () =>{
        const { page } = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }

    nextPage = () =>{
        const { page, products } = this.state;
        if(page === products.has_more) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    } 

    render(){
        const { products, page } = this.state;
        return  products.length > 0 &&
            <div className="body">
                <div className="product-list">
                    {products.map((product, key) => (
                        <article key={key}>
                            <strong>{product.name} - {product.artist}</strong>
                            <div className="image">
                                <img src={product.image_uris.small} alt={product.name}></img>         
                            </div> 
                            <p>{product.oracle_text}</p>
                            <Link to={`/products/${product.name}`}>Acessar</Link>
                        </article>
                    ))}
                        <div className="actions">
                        <button disabled={page === 0} onClick={this.prevPage}>
                        Anterior
                        </button>
                        <button onClick={this.nextPage}>
                        Próximo
                        </button>
                    </div>
                </div>
            </div>
    }
}