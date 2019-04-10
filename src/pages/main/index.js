import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = {
        products: [],
        page : 1,
    }
    componentDidMount(){
        this.loadProducts();
    }
    loadProducts = async () => {
        const response  = await api.get("?");
        //console.log('response data aqui =>', response.data);
        const {data} = response.data; 
        
        this.setState({ products: data}, () => {
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
        const { page, products } = this.state;
        if(page === products.has_more) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    } 

    //colocar os botões depois que corrigir: page


    render(){
        const { products, page} = this.state;
        return products.length > 0 ? (
            <div className="body">
                <div className="product-list">
                    {products.map((product, key) => (
                        <article key={key}>
                            <strong>{product.oracle_text}</strong>
                            <p>{product.oracle_text}</p>
                            <Link to={`/products/${product.name}`}>Acessar</Link>
                        </article>
                    ))}
                </div>
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>
                    Anterior
                    </button>
                    <button disabled={products.has_more}onClick={this.nextPage}>
                    Próximo
                    </button>
            </div>
            </div>
        ) : (
          null
        )
    }
}