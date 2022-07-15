import { useState, useEffect } from 'react'
// import httpRequest from '../utils/httpRequest'
import axios from 'axios'

function useProductFetch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setProducts([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'http://localhost:3006/api/product/grid',
            params: { q: query, page: pageNumber, limit: 3 },
            withCredentials: false,
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
            .then(res => {
                setProducts(prev => {
                    return [...prev, ...res.data.data]
                })

                setHasMore(res.data.currentPage.page < res.data.pages)
                setLoading(false)
            })
            .catch(e => {
                if (axios.isCancel(e)) return
                setError(true)
            })


        return () => cancel()
    }, [query, pageNumber])
    return [products, loading, error, hasMore]
}

export default useProductFetch

