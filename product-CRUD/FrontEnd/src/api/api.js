const BASE_URL = "http://localhost:8080/api/product"

export const getCategory = async()=>{
    const res = await fetch(`${BASE_URL}/Findcategory`)
    return res.json()
}

export const getallcategoryid = async(id)=>{
    const res = await fetch(`${BASE_URL}/getProduct/${id}`)
    return res.json()
}

export const getSingleProduct = async(id)=>{
    const res = await fetch(`${BASE_URL}/singleProductget/${id}`)
    return res.json()
}