import {createContext, useState ,useEffect } from 'react';

// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';


// import SHOP_DATA from '../shop-data.js';


// always after context there's provider 
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    
    const [categoriesMap , setcategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // } ,[]);

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoriesMap = await getCategoriesAndDocuments();
            // console.log(categoriesMap);
            setcategoriesMap(categoriesMap);
        }
        getCategoriesMap();
    } ,[]);

    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};