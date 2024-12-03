import { useEffect, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import "./styles.css";

export default function LoadMoreButton() {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    async function fetchProducts() {
        try {
            setLoading(true)
            const response = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`);

            const result = await response.json();
            console.log(products);
            if (result && result.products && result.products.length) {
                setProducts((prevData) => [...prevData, ...result.products])
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [count]);

    useEffect(() => {
        if (products && products.length === 100) setDisableButton(true)
    }, [products])

    if (loading) {
        return <diV>loading data ! please wait</diV>
    }
    return (
        <div className="loaad-more-container">
            <div className="product-container">
                {
                    products && products.length
                        ? products.map((item) =>
                            <div key={item.id} className="product">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                />
                            </div>
                        )
                        : null
                }
            </div>
            <div>
                <button disabled={disableButton} className="button-container"
                    onClick={() => setCount(count + 1)}>loading more Product</button>
                    {
                        disableButton ? <p>you have reached to 100 products</p> : null
                    }
            </div>
        </div>
    );
}
