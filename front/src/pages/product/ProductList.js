import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as Api from "../../utills/api";
import Product from '../../components/Product'
import Header from '../../components/Header'

function ProductList() {

    const { category } = useParams()
    const [products, setProducts] = useState(undefined);

    ///api/productlist/category/:categoryTitle
    const init = async () => {
        const res = await Api.get(`productlist/category/${category}`);
        const data = await res.data;
        setProducts(data);
    };
    useEffect(() => {
        init();
    }, []);

    return (<>
        <div className='section'>
            <Header title={category}></Header>
            <div className="product-container" >
                {Array.isArray(products) && products.map(item => (
                    <Product
                        key={item._id}
                        itemId={item._id}
                        title={item.productName}
                        price={item.price}
                        img={"https://res.cloudinary.com/moteam/image/upload/" + item.imageKey + ".png"}
                        productInfo={item.productInfo}>
                    </Product>))}
            </div>
        </div>
    </>
    );
}

export default ProductList;