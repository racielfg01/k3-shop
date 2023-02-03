import React,{createContext,useContext
    ,useState,useEffect} from "react";
    // import {toast} from 'react-hot-toast';
    
    const Context = createContext();

    export const useStateContext =() =>useContext(Context);
    
    export const StateContext=({children})=>{
        const [showCart, setShowCart] = useState(false);    
        const [cartItems, setCartItems] = useState([]);    
        const [totalPrice, setTotalPrice] = useState(0);    
        const [activeMenu, setActiveMenu] = useState(0);    
        const [totalQuantities, setTotalQuantities] = useState(0);    
        const [qty, setQty] = useState(1);   
    
        let foundProduct;
        let index;
    
        const incQty =()=>{
            // setTotalPrice((prevTotalPrice)=> prevTotalPrice + producto.precio_venta * cantidad);
            // setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + cantidad);
            setQty((prevQty)=>prevQty+1);
        }
    
        const decQty =()=>{
            setQty((prevQty)=>{
                if(prevQty -1 < 1) return 1;
                
                return prevQty - 1;
             });
        }
    
        const onAdd =({producto,cantidad})=>{
            const checkProductInCart= cartItems.find((item)=>item.producto.id ===producto.id);
           console.log(checkProductInCart);
           console.log("cantidad",cantidad);

            setTotalPrice((prevTotalPrice)=> prevTotalPrice + (producto.precio_venta * cantidad));
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + cantidad);
            
            if(checkProductInCart){
                const updatedCartItems = cartItems.map((cartProduct)=>{
                    if(cartProduct.producto.id === producto.id) {

                        return{
                            ...cartProduct,cantidad:cartProduct.cantidad+cantidad
                        }
                    }
                    else return{...cartProduct }
                })
                setCartItems(updatedCartItems);
            } else{
                setCartItems([...cartItems,{producto,cantidad}]);
            }
    
            // toast.success(`${qty} ${product.name} added to the cart.`);
        } 
        

        const toggleCartItemQuantity = (id, value)=>{
            
            foundProduct =cartItems.find((item)=>item.id===id)
            index = cartItems.findIndex((product)=> product.id===id)
          
            let newCartItems = cartItems.filter((item)=> item.id !== id)
    
            if(value === 'inc'){
                setCartItems([...newCartItems,{...foundProduct,
                    quantity:foundProduct.quantity+1}]);
                setTotalPrice((prevTotalPrice)=>prevTotalPrice
                 +foundProduct.price);
                setTotalQuantities(prevTotalQuantities=>
                    prevTotalQuantities+1)   
    
            }else if(value ==='dec'){
                console.log('dec')
                if(foundProduct.quantity>1){
                    setCartItems([...newCartItems,{...foundProduct,
                        quantity:foundProduct.quantity-1}]);
                    setTotalPrice((prevTotalPrice)=>prevTotalPrice
                     -foundProduct.price);
                    setTotalQuantities(prevTotalQuantities=>
                        prevTotalQuantities-1)   
                    
                }
            }
        }
        
        const onRemove =(product)=>{
            const foundProduct = cartItems.find((item)=> 
            item.producto.id===product.id);

            const newCartItems =cartItems.filter((item)=>
            item.producto.id!==product.id);
    
            setTotalPrice((prevTotalPrice)=>
            prevTotalPrice-foundProduct.producto.precio_venta
            *foundProduct.cantidad);
    
            setTotalQuantities((prevTotalQuantities)=>
            prevTotalQuantities-foundProduct.cantidad);
            
            setCartItems(newCartItems);
        }
    
        return(
            <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                activeMenu,
                setActiveMenu,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
            >
                {children}
            </Context.Provider>
        )
    }
    

    