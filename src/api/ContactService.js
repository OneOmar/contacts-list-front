import axios from "axios"

const API_URL = 'http://localhost:8080/api/contacts'

// DRY Principle: Centralized the API call logic to avoid repetition.
const handleRequest = async (method, url, data = null, config = {}) => {
    try {
        console.log(`Requesting: ${url}`)
        const response = await axios({ method, url, data, ...config })
        console.log(`Response received:`, response.data)
        return response.data
    } catch (error) {
        console.error(`Error in request to ${url}:`, error)
        throw error
    }
}

export const saveContact = (contact) => handleRequest('post', API_URL, contact)

export const getContacts = (page = 0, size = 10) => handleRequest('get', `${API_URL}?page=${page}&size=${size}`)

export const getContact = (id) => handleRequest('get', `${API_URL}/${id}`)

export const updateContact = (contact) => handleRequest('put', API_URL, contact)

export const updatePhoto = (id, formData) => handleRequest('put', `${API_URL}/${id}/photo`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const deleteContact = (id) => handleRequest('delete', `${API_URL}/${id}`)
