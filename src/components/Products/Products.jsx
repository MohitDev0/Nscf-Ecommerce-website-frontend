import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import ProductCard from './ProductCard';
import { toast } from "react-hot-toast";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddProduct from './AddProduct';



const Products = ({ product }) => {
    const url = process.env.REACT_APP_BASE_URL;
    const [refresh, setRefresh] = useState(false)
    const [currentUser, setCurrentUser] = useState();
    const [Items, setItems] = useState();
    const [itemsPerPage] = useState(product ? 20 : 10);
    const [page, setPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState();
    const [currentPosts, setCurrentPosts] = useState();
    const token = localStorage.getItem("jwt");
    const [showProductAdd, setshowProductAdd] = useState(false);

    let indexOfLastPost = useRef();
    let indexOfFirstPost = useRef();

    useEffect(() => {
        const getUser = async () => {
            await axios.get(url + "user/find/admin", {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                setCurrentUser(res.data);
            })
        }
        getUser();
    }, [url, token])

    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get(url + "product/", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setItems(res.data);
            setTotalPageCount(Math.ceil(res.data.length / itemsPerPage));
        }
        getProduct();
    }, [itemsPerPage, url, token, refresh]);



    useEffect(() => {
        if (Items) {
            indexOfLastPost.current = itemsPerPage * page;
            indexOfFirstPost.current = indexOfLastPost.current - itemsPerPage;
            setCurrentPosts(Items.slice(indexOfFirstPost.current, indexOfLastPost.current));
        }
    }, [Items, page, indexOfLastPost, itemsPerPage])


    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className='products mt-3'>
            <h1 className='text-center'>Products {currentUser && (currentUser.isAdmin && <AddCircleOutlineIcon onClick={() => { setshowProductAdd(true) }} />)}</h1>
            {
                currentPosts && <div>
                    <div className='ProductItems flex flex-wrap mt-3 justify-evenly object-cover'>
                        {currentPosts.map((item) => {
                            return (
                                <ProductCard currentUser ={currentUser} item={item} key={item._id} setRefresh={setRefresh} />
                            );
                        })}
                    </div>
                    <div className='block w-full overflow-hidden'>
                        <Pagination count={totalPageCount} page={page} shape="rounded" className='mt-2 mr-1 float-right mb-5' onChange={handleChange} />
                    </div>
                </div>
            }
            {showProductAdd && <AddProduct setshowProductAdd={setshowProductAdd} setRefresh={setRefresh} />}
        </div>
    )
}




export default Products