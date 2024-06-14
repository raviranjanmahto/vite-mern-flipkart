import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../../api/productApi";
import Banner from "./Banner";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { setProducts } from "../../features/products/productSlice";

const Home = () => {
  const { data } = useGetProductsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(data?.products));
  });

  return (
    <>
      <NavBar />
      <Banner />
    </>
  );
};

export default Home;
