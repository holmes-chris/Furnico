import React, {useState} from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import styles from "./MobileSearch.module.css"
import { FaSearch } from "react-icons/fa";


function MobileSearch() {
  const navigate = useNavigate();
  const [blur, setBlur] = useState(true);
  const [filteredProducts, setFilteredProucts] = useState([])
  const products = useSelector((state) => state.products.products);

  const searchEmpty = filteredProducts.length === 0;
  
 let productList = products.map((item) => item.name)
 //splitting each product name into its own array. Each word gets an index
 for (let i = 0; i < productList.length; i++) {
     productList[i] = productList[i].split(" ")
 }


  function handleInput(e) {
    let input = e.target.value
    let results = [];
     /*1st loop iterates through each product in the array. 
      2nd loop iterates through each word in the product name. 
      if a word in any product name matches with the input, we will 
      push the product name to the results array and separate each word with a space.
     */
    for (let x = 0; x < productList.length; x++) {
      for (let y = 0; y < productList[x].length; y++) {
        if (productList[x][y].toLowerCase().startsWith(input.toLowerCase())) {
          results.push(productList[x].join(" "))
        }     
      }
    }  
    setFilteredProucts(results)
    if (input.length === 0) {
      setFilteredProucts([])
    }
  }

  const handleBlur = () => {
    setTimeout(() => {//allow for element to be clicked before blurring
      setBlur(true)
    }, 100)
  }

  const handleFocus = () => {
    setBlur(false)
  }

 
 
  const handleResultClick = (name) => {
    const resultProducts = products.map((item) => item)
    const resultProduct = resultProducts.filter((item) => item.name === name)
    const resultId = resultProduct[0].product_id
    console.log(resultProduct)
    navigate(`/products/${resultId}`)
  }
  
  return (
    <div className={styles['mobile-search']}>
      <div className={styles["mobile-search-container"]} tabIndex="0">
          <FaSearch className={styles['mobile-search-icon']} />
          <input className={styles["mobile-input-box"]} placeholder="Search Products"
            type="text" 
            onChange={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
      </div>
      <div className={`${styles['results-container']} ${searchEmpty ? styles['hidden'] : ''}`}>
        {filteredProducts.length > 0 && !blur ?
            filteredProducts.map((product,i) => (
              <div className={styles["results"]}>
                <div /* href={`/products/${resultId}`} */ key={i} className={styles['result']} onClick={() => handleResultClick(product)}>
                  <FaSearch />
                  <p className={styles['result-text']}>{product}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default MobileSearch