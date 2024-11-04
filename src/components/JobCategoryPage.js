import React from "react";
import { useState, useLocation } from "react";
import { Link } from "react-router-dom";

const JobCategoryPage =() =>{
    const location = useLocation();
    const { country, jobType } = location.state || {};
    const [categories, setCategories] = useState()

    const fetchComponents =(categories) =>{
        
    }
}
export default JobCategoryPage;