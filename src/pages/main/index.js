import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
    }
    componentDidMount(){
        this.loadProducts();
    }
    loadProducts = async () => {
        const response  = await api.get("?");
        //console.log('response data aqui =>', response.data.data);
        const {docs, ...productInfo } = response.data.data; 
        //this.setState({ products: docs, productInfo });
        this.setState({ products: docs, productInfo }, () => {
            console.log('Aqui ==>', this.state);
          });
        //console.log('Aqui state =>',this.state);       
        //console.log('Aqui response =>',response);
    };
     prevPage = () =>{
        const { page } = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }
    nextPage = () =>{
        const { page, productInfo } = this.state;
        if(page === productInfo.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    } 
    
    render(){
        const { products, page, productInfo } = this.state;
        return products.lenght > 0 ? (
            <div className="body">
                <div className="product-list">
                    {products.map((product, key) => (
                        <article key={key}>
                            <strong>{product.name}</strong>
                            <p>{product.oracle_text}</p>
                            <Link to={`/products/${product.name}`}>Acessar</Link>
                        </article>
                    ))}
                </div>
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>
                    Anterior
                    </button>
                    <button disabled={page === productInfo.pages}onClick={this.nextPage}>
                    Próximo
                    </button>
                </div>
            </div>
        ) : (
          null
        )
    }
}