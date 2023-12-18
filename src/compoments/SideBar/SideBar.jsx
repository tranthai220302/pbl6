import React, { useState } from 'react'
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCartShopping, faBell, faSearch, faBook } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';
import { useEffect } from 'react';
import newRequest from '../../ults/NewRequest';
import { Link } from 'react-router-dom';

export default function SideBar({ category, setCategory, price_min, setPrice_min, price_max, setPrice_max, author, setAuthor, languages, setLanguage, nhaXB, setNhaXB }) {
    const [datacate, setDatacate] = useState([]);
    const [dataAuth, setDataAuthor] = useState([]);
    const [dataLanguage, setDataLanguage] = useState([]);
    const [dataNhaXB, setDataNhaXB] = useState([]);
    const [isPending, setIsPending] = useState(true);
    // const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);

    const getCategory = async () => {
        setIsPending(true);
        await newRequest.get(`/category`, {
        }).then(
            (res) => {
                setDatacate(res.data)
                setIsPending(false);
                setError(false)
                // console.log(datacate)
            }
        ).catch((error) => {
            setError(error.response.data)
            setIsPending(false)
        })
    }
    const getAuthor = async () => {
        setIsPending(true);
        await newRequest.get(`/book/list/author`, {
        }).then(
            (res) => {
                setDataAuthor(res.data)
                setIsPending(false);
                setError(false)
                console.log(dataAuth)
            }
        ).catch((error) => {
            setError(error.response.data)
            setIsPending(false)
        })
    }
    const getLanguage = async () => {
        setIsPending(true);
        await newRequest.get(`/book/list/languages`, {
        }).then(
            (res) => {
                setDataLanguage(res.data)
                setIsPending(false);
                setError(false)
                console.log(dataLanguage)
            }
        ).catch((error) => {
            setError(error.response.data)
            setIsPending(false)
        })
    }
    const getNhaXB = async () => {
        setIsPending(true);
        await newRequest.get(`/book/list/nhaXB`, {
        }).then(
            (res) => {
                setDataNhaXB(res.data)
                setIsPending(false);
                setError(false)
                console.log(dataNhaXB)
            }
        ).catch((error) => {
            setError(error.response.data)
            setIsPending(false)
        })
    }
    useEffect(() => {
        //getData();
        getCategory();
        getAuthor();
        getLanguage();
        getNhaXB();
    }, [])
    const handleCategory = (name) => {
        setCategory(name)
    }
    const handlePrice_min = (price_min) => {
        setPrice_min(price_min)
    }
    const handlePrice_max = (price_max) => {
        setPrice_max(price_max)
    }
    const handleAuthor = (author) => {
        setAuthor(author)
    }
    const handleLanguages = (languages) => {
        setLanguage(languages)
    }
    const handleNhaXB = (nhaXB) => {
        setNhaXB(nhaXB)
    }
    return (
        <div className={styles.SideBar}>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    loại sản phẩm
                </div>
                <ul>
                <form>
                    {datacate && datacate.map((value) => (
                            <li>
                                <input type="radio" name="category" onClick={() => handleCategory(value.name)}/>
                                <lable>{value.name}</lable>
                            </li>
                    ))}          
                    <input type="reset" value='Clear' onClick={() => handleCategory('')}/>     
                </form>
                
                </ul>
                <div>
                    
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    giá
                </div>
                <ul>
                    <form>
                    <li onClick={() => { handlePrice_min(0); handlePrice_max(49999) }}>
                        <input type="radio" name='price' id='0'/>
                        <label for='0'>Từ 0đ - đến dưới 50,000đ</label>
                    </li>
                    <li onClick={() => {handlePrice_min(50000) ; handlePrice_max(99999)}}>
                        <input type="radio" name='price' id='50000'/>
                        <label for="50000">Từ 50,000đ - đến dưới 100,000đ</label>
                    </li>
                    <li onClick={() => {handlePrice_min(100000) ; handlePrice_max(199999)}}>
                        <input type="radio" name='price' id='100000'/>
                        <label for="100000">Từ 100,000đ - đến dưới 200,000đ</label>
                    </li>
                    <li onClick={() => {handlePrice_min(200000) ; handlePrice_max(499999)}}>
                        <input type="radio" name='price' id='200000'/>
                        <label for="200000">Từ 200,000đ - đến dưới 500,000đ</label>
                    </li>
                    <li onClick={() => {handlePrice_min(500000) ; handlePrice_max(699999)}}>
                        <input type="radio" name='price' id='500000'/>
                        <label for="500000">Từ 500,000đ - đến dưới 700,000đ</label>
                    </li>
                    <li onClick={() => {handlePrice_min(700000) ; handlePrice_max(1000000000)}}>
                        <input type="radio" name='price' id="700000"/>
                        <label for="700000">từ 700,000đ trở lên</label>
                    </li>
                    <input type="reset" value='Clear' onClick={() => {handlePrice_min('') ; handlePrice_max('')}}/> 
                    </form>

                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Tác giả
                </div>
                <ul>
                <form>
                    {dataAuth && dataAuth.map((value) => (
                            <li>
                                <input type="radio" name="auth" onClick={() => handleAuthor(value)}/>
                                <lable>{value}</lable>
                            </li>
                    ))}
                    <input type='reset' value='Clear' onClick={() => handleAuthor('')}></input>
                </form>
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Ngôn ngữ
                </div>
                <ul>
                <form>
                    {dataLanguage && dataLanguage.map((value) => (
                            <li>
                                <input type="radio" name="languages" onClick={() => handleLanguages(value)}/>
                                <lable>{value}</lable>
                            </li>

                    ))}
                    <input type='reset' value='Clear' onClick={() => handleAuthor('')}></input>

                </form>
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Nhà xuất bản
                </div>
                <ul>
                <form>
                    {dataNhaXB && dataNhaXB.map((value) => (
                            <li>
                                <input type="radio" name="nhaXB" onClick={() => handleNhaXB(value)}/>
                                <lable>{value}</lable>
                            </li>
                    ))}
                    <input type='reset' value='Clear' onClick={() => handleNhaXB('')}></input>
                </form>
                </ul>
            </div>
        </div>
    )
}