import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const JobListingsPage = () =>{
const location = useLocation();
const {country, jobType, category} = location.state || {}
const [jobListings, setJobListings] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [page, setPage] = useState(1)

const BASE_URL = "https://api.adzuna.com/v1/api";
const API_KEY = "8c3fa43c6e834b72327f6b0d5d5b7b7f"; 
const APP_ID = "288e942a"; 

const fetchJobListings = async (country, page, filters) => {
    const { jobType, category } = filters || {};
    let url = `${BASE_URL}/jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${API_KEY}`;
    
   
    if (jobType) url += `&contract_type=${jobType}`;
    if (category) url += `&category=${category}`;
  try{
    setLoading(true)
    setError(null)
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("No Job Listings Found")
    }
    const data = await response.json();
    setJobListings(data.result || [])
  }catch(error){
    setError(error.message)
  }finally{
    setLoading(false)
  }
   
  };

}
export default JobListingsPage;