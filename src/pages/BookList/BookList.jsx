import React, { useState } from 'react'
import SideBar from '../../compoments/SideBar/SideBar'
import ListBookDetail from '../../compoments/ListBookDetail/ListBookDetail'
import styles from './BookList.module.css'

export default function BookList() {
    const [category, setCategory] = useState('')
    const [price_min, setPrice_min] = useState('')
    const [price_max, setPrice_max] = useState('')
    const [author, setAuthor] = useState('')
    const [languages, setLanguage] = useState('')
    const [nhaXB, setNhaXB] = useState('')
    return (
        <div className={styles.BookList}>
            <SideBar category = {category} setCategory = {setCategory} price_min = {price_min} setPrice_min = {setPrice_min } price_max = {price_max} setPrice_max = {setPrice_max } author={author} setAuthor={setAuthor} languages={languages} setLanguage={setLanguage} nhaXB={nhaXB} setNhaXB={setNhaXB}/>
            <ListBookDetail category = {category} price_min = {price_min} price_max = {price_max} author = {author} languages = {languages} nhaXB={nhaXB}/> 
        </div>
    )
}
