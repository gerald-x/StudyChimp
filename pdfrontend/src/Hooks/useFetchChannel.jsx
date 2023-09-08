import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchChannelName = (url, authToken=null) => {

const [channelData, setChannelData] = useState([]);
const [error, setError] = useState("");

useEffect(() => {
    const headers = authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
    
    async function fetchData() {
        fetch(url,{
        method: "GET",
        headers: headers,
        })
        .then(res => res.json())
        .then(data => {
            setChannelData(data);
        })
        .catch(err => {
            console.log(`The error says ${err}`)
            setError(err.message ? err.message : err.response.data.responseMessage)
        })

    }
fetchData();
}, [url, authToken]);
    return { channelData, error };
};


export const useFetchPost = (url, payload, authToken=null) => {
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const headers = authToken ? { 'Authorization': `Bearer ${window.localStorage.getItem("access_token")}` } : {};
        
        const fetchData = async () => {
            try {
              const response = await axios.post(url, payload, { headers });
              setPostData(response.data);
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
        }

        fetchData();
    }, [url, payload, authToken,]);
    return {loading , postData, error };
};


export const axiosPost = async (url, payload, authToken=null) => {
    const returnRes = {
        loading: true,
        response: null,
        error: null
    }
    
    const headers = authToken ? { 'Authorization': `Bearer ${window.localStorage.getItem("access_token")}` } : {};

    try {
        const response = await axios.post(url, payload, { headers });
        returnRes.loading = false
        returnRes.response = response.data;
    } catch (error) {
        returnRes.loading = false
        returnRes.error = error;
    } finally {
        returnRes.loading = false;
    }

    return returnRes
};