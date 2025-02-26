import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  addProductToCart: (product: CartProductType) => void;
  removeProductFromCart: (product: CartProductType) => void;
  increaseQuantity: (product: CartProductType) => void;
  decreaseQuantity: (product: CartProductType) => void;
  clearCart: () => void;
  paymentIntent: string | null;
  handlePaymentIntent: (value: string | null) => void;
};

const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propsName: string]: any;
}

export function CartContextProvider(props: Props) {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [cartTotalAmount, setTotalAmount] = useState(0);

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  const addProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product added to cart");

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const removeProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (prod) => prod.id !== product.id
        );

        setCartProducts(filteredProducts);

        toast.success("Product removed from cart");

        localStorage.setItem("cartItems", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  const increaseQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 99) {
        return toast.error("Opps! Maximum quantity reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingProductIndex = cartProducts.findIndex(
          (ProductItem) => ProductItem.id === product.id
        );

        if (existingProductIndex > -1) {
          updatedCart[existingProductIndex].quantity = ++updatedCart[
            existingProductIndex
          ].quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const decreaseQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 1) {
        return toast.error("Opps! Minimum quantity reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingProductIndex = cartProducts.findIndex(
          (ProductItem) => ProductItem.id === product.id
        );

        if (existingProductIndex > -1) {
          updatedCart[existingProductIndex].quantity = --updatedCart[
            existingProductIndex
          ].quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const clearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("cartItems", JSON.stringify(null));
  }, []);

  const handlePaymentIntent = useCallback((value: string | null) => {
    setPaymentIntent(value);
    localStorage.setItem("paymentIntent", JSON.stringify(value));
  }, []);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("cartItems");
    const cProducts: CartProductType[] = JSON.parse(cartItems);

    const csPaymentIntent = localStorage.getItem("paymentIntent");
    const payIntent: string | null = csPaymentIntent
      ? JSON.parse(csPaymentIntent)
      : null;

    setCartProducts(cProducts);
    setPaymentIntent(payIntent);
  }, []);

  useEffect(() => {
    function getTotals() {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, product) => {
            const productTotal = product.price * product.quantity;

            acc.total += productTotal;
            acc.qty += product.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );

        setCartTotalQty(qty);
        setTotalAmount(total);
      }
    }

    getTotals();
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        paymentIntent,
        handlePaymentIntent,
      }}
      {...props}
    />
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
