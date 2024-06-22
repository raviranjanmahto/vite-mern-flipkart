import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetProductsQuery } from "../../api/productApi";
import { setProducts } from "../../features/products/productSlice";

import Banner from "./Banner";
import NavBar from "./NavBar";
import Slide from "./Slide";

const Home = () => {
  // Use the useDispatch hook to get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Fetch products data using the RTK Query hook
  const { data } = useGetProductsQuery();

  // When products are successfully fetched, dispatch an action to set them in the Redux store
  useEffect(() => {
    if (data) dispatch(setProducts(data.products));
  }, [data, dispatch]);

  // Use the useSelector hook to access the products state from the Redux store
  const products = useSelector(state => state.products.products);

  return (
    <>
      <NavBar />
      <Banner />
      <Slide products={products} title='Deals of the day' timer />
    </>
  );
};

export default Home;
