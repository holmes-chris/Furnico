import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styles from "./CartTable.module.css"
import { IoIosSend } from "react-icons/io";
import { updateShippingCart, updateShippingOrder, clearShippingCart, removeFromShippingCart } from '../../Redux/Users/cartsSlice.js';


function CartTable({cart, products}) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [inputClicked, setInputClicked] = useState(false);
    const [emptyCell, setEmptyCell] = useState(false)
    const [orderTotal, setOrderTotal] = useState(0)
    const [order, setOrder] = useState([])
    const [mobile, setMobile] = useState(false)



    /*finding the entire product object based on the productId's in the cart object.
    inserting the order quantities for each item into its respective product object.
    */
    useEffect(() => {
        if (cart && products) {
            const cartIds = cart.map((item) => item.productId)
            let productData = products.filter((product) => cartIds.includes(product.product_id));
            const addOrderQuantities = productData.map((product) => {
                const cartItem = cart.find((item) => item.productId === product.product_id)
                return {...product, orderQuantity: cartItem.orderQuantity}
                //product object now includes the amount the user ordered
            })
    
            setOrder(addOrderQuantities)

            
        }
    }, [cart, products])
    

    useEffect(() => {
        if (order.length > 0) {
            const addedTotal = order.reduce((acc, item) => acc + (item.orderQuantity * item.cost_per_unit),0)
            setOrderTotal(parseFloat(addedTotal))
        }
    }, [order])


    
    const keysToRemove = ["category", "clicks", "description", "image", "price", "sales", "stock", "tags"]
    const headers = ["Product ID", "Product Name", "Supplier Name", "PCKG Height","PCKG Width", "PCKG Length", "Cost Per Unit", "Order Quantity", "Order Cost", ""];


    //taking out all of the product object keys that i dont need to render
    useEffect(() => {
        if (order.length > 0) {
            const filteredProducts = order.map((product) => {
                const newProduct = {...product}
                keysToRemove.forEach((key) => delete newProduct[key])
                return newProduct
            })
        
            setOrder(filteredProducts)
        }
    },[])


    if (!cart || cart.length === 0) {
        return <div>No data available</div>
    }

    const triggerInput = () => {
        setInputClicked(true)
    }

    const checkValues = (e) => {
        const invalidKeys = [".", "-"]
        if (invalidKeys.includes(e.key)) {
            e.preventDefault();
            return alert("no decimals or negative integers")
        }
    }

    //handling change if user decides to update the order quantites
    const handleQuantityChange = (e, productId) => {
        let quantity = e.target.value;
        console.log(typeof quantity, quantity)
        if (isNaN(quantity) || quantity === "") {//if input is empty set to quantity to zero
            quantity = 0;
            setEmptyCell(true)
        } else {
            setEmptyCell(false)
        }

        quantity = parseInt(quantity, 10)//turn to integer

        dispatch(updateShippingCart({productId, quantity}));
        const updatedCartProducts = order.map((product) => product.product_id === productId ? 
            {...product, orderQuantity: quantity} : product);
        setOrder(updatedCartProducts)
    }

    const generateId = () => {
        return 'S-' + Math.random().toString(36).substring(2, 9);
      };

    const finalizeCart = async () => {
        const shipmentId = generateId();
        //if one input is empty, alert-------------------------------------
        if (emptyCell) {
            return alert("You must have all order quantites greater than zero.")
        }
        const shippingOrder = order.map((product => ({
            shipmentId: shipmentId,
            shipmentDate: new Date(),
            productId: product.product_id,
            name: product.name,
            supplier_name: product.supplier_name,
            pckg_height: product.pckg_height,
            pckg_width: product.pckg_width,
            pckg_length: product.pckg_length,
            cost_per_unit: product.cost_per_unit,
            order_quantity: product.orderQuantity,
            order_total_cost: parseFloat((product.cost_per_unit * product.orderQuantity).toFixed(2))
        })))
        
        console.log('shippingOrder: ',shippingOrder)
        dispatch(updateShippingOrder(shippingOrder))
        try {
            await axios.post("http://localhost:8080/shipments/create-shipment", shippingOrder)
            .then((res) => {
                console.log(res.data)
            })

            alert(`Shipping order successful!`);
            navigate("/admin/shipments")
            dispatch(clearShippingCart())
        } catch (e) {
            alert(`Error creating shipment: ${e}`)
            console.error(e)
        }

    }

    const dataRow = (valuesArray) => {
        return valuesArray.map((value, i) => (
        <tr className={styles["data-row"]}>
            <td className={styles["cell" + i]}>{value.product_id}</td>
            <td className={styles["cell" + i]}>{value.name}</td>
            <td className={styles["cell" + i]}>{value.supplier_name}</td>
            <td className={styles["cell" + i]}>{value.pckg_height}</td>
            <td className={styles["cell" + i]}>{value.pckg_width}</td>
            <td className={styles["cell" + i]}>{value.pckg_length}</td>
            <td className={styles["cell" + i]}>${value.cost_per_unit}</td>
            <td className={styles["quantity-container"]}><input className={styles["quantity"]} 
                value={!inputClicked ? value.orderQuantity : null} type="number" 
                onFocus={triggerInput} onKeyDown={(e) => checkValues(e)} onChange={(e) => handleQuantityChange(e, value.product_id)} /></td>
            <td className={styles["item-cost-container"]}><input className={styles["item-cost"]} 
                value={(value.cost_per_unit * value.orderQuantity).toFixed(2)} type="text" readonly />
            </td>
            <td className={styles["remove-bttn-cell"]}>
                <button className={styles["remove-bttn"]} onClick={() => dispatch(removeFromShippingCart(value.product_id))}>-</button>
            </td>
            
        </tr>
    ))}    

  return (
    <div className={styles["cart-table"]}>
        <div className={styles["table-parent"]}>
            <table className={styles["table-container"]}>
                <thead>
                    <tr className={styles["data-row"]}>
                        {headers.map((header, i) => (
                            <th className={styles["header" + i]}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataRow(order)}
                </tbody>
            </table>
        </div>
        <div className={styles["total-container"]}>
            <p>Total</p>
            <p><strong>${orderTotal.toFixed(2)}</strong></p>
        </div>
        <button to="/admin" onClick={() => finalizeCart()} className={emptyCell ? `${styles["create-bttn-container"]} ${styles["empty-cell"]}` : styles["create-bttn-container"]}>
            <IoIosSend className={styles["send-icon"]}/>
            <p className={styles["send-text"]}>Create Shipment</p>
        </button>
    </div>
  )
}

export default CartTable