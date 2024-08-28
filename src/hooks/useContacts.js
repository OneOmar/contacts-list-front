import { useState, useEffect, useCallback } from 'react'
import { getContacts, saveContact, updatePhoto as updatePhotoApi } from '../api/ContactService.js'
import { toastError, toastSuccess } from '../utils/toast.js'

export const useContacts = () => {
    const [data, setData] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])

    // Centralized error handling
    const handleError = (error, defaultMessage) => {
        console.error(defaultMessage, error)
        const message = error?.response?.data?.message || error.message || defaultMessage
        toastError(message)

        if (error?.response?.status === 400) {
            setErrors(error.response.data)
        }
    }

    // Fetch contacts data
    const fetchContacts = useCallback(async (page = 0, size = 10) => {
        setLoading(true)
        setCurrentPage(page)

        try {
            const data = await getContacts(page, size)
            setData(data)
            toastSuccess('Contacts retrieved!')
        } catch (error) {
            handleError(error, 'Error fetching contacts')
        } finally {
            setLoading(false)
        }
    }, [])

    // Save or update contact, including photo upload
    const saveOrUpdateContact = useCallback(async (contact, photoFile = null) => {
        setErrors({})

        try {
            const savedContact = await saveContact(contact)
            if (photoFile) {
                await updatePhoto(savedContact.id, photoFile)
            }
            fetchContacts(currentPage)
            toastSuccess('Contact saved successfully!')
            return true // Indicate success
        } catch (error) {
            handleError(error, 'Error saving contact')
            return false // Indicate failure
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, fetchContacts])

    // Internal helper to handle photo update
    const updatePhoto = async (id, photoFile) => {
        if (!photoFile) {
            toastError('No file selected for upload')
            return
        }

        const formData = new FormData()
        formData.append('photo', photoFile)

        try {
            updatePhotoApi(id, formData)
            toastSuccess('Photo updated successfully')
        } catch (error) {
            handleError(error, 'Error updating photo')
        }
    }

    return {
        data,
        currentPage,
        loading,
        errors,
        fetchContacts,
        saveOrUpdateContact,
    }
}
