import { useRef, useState, useCallback } from 'react'
import { useContacts } from './hooks/useContacts.js'
import Header from './components/Header.jsx'
import ContactList from './components/ContactList.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import { ContactDetail } from './components/ContactDetail.jsx'
import Loading from './components/Loading.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const initialValues = {
    name: '',
    email: '',
    title: '',
    phone: '',
    address: '',
    status: ''
  }

  const [values, setValues] = useState(initialValues)
  const [file, setFile] = useState(null)
  const modalRef = useRef()

  const {
    data,
    currentPage,
    loading,
    errors,
    fetchContacts,
    saveOrUpdateContact
  } = useContacts()

  const handleChange = useCallback((event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }))
  }, [])

  const handleFile = useCallback((event) => {
    setFile(event.target.files[0])
  }, [])

  const handleNewContact = useCallback(async () => {
    const isSuccess = await saveOrUpdateContact(values, file)
    if (isSuccess) {
      toggleModal(false)
    }
  }, [values, file, saveOrUpdateContact, toggleModal])

  const toggleModal = useCallback((show) => {
    if (show) {
      modalRef.current.showModal()
    } else {
      modalRef.current.close()
    }
  }, [])

  return (
    <>
      <Header
        toggleModal={toggleModal}
        nbOfContacts={data?.totalElements || 0}
      />
      <main className='main'>
        <div className='container'>
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path='/' element={<Navigate to='/contacts' />} />
              <Route
                path='/contacts'
                element={
                  <ContactList
                    data={data}
                    currentPage={currentPage}
                    getAllContacts={fetchContacts}
                  />
                }
              />
              <Route
                path='/contacts/:id'
                element={
                  <ContactDetail
                    getAllContacts={fetchContacts}
                    updateContact={saveOrUpdateContact}
                    errors={errors}
                  />
                }
              />
            </Routes>
          )}
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className='modal' id='modal'>
        <div className='modal__header'>
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className='bi bi-x-lg'></i>
        </div>
        <div className='divider'></div>
        <div className='modal__body'>
          <ContactForm
            values={values}
            handleChange={handleChange}
            handleFile={handleFile}
            handleNewContact={handleNewContact}
            toggleModal={toggleModal}
            errors={errors}
          />
        </div>
      </dialog>
      <ToastContainer />
    </>
  )
}

export default App
