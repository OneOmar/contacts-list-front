import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { deleteContact, getContact } from '../api/ContactService'
import { toastSuccess } from '../utils/toast'

const initialContactState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  title: '',
  status: '',
  photoUrl: ''
}

export const ContactDetail = ({ getAllContacts, updateContact, errors }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [contact, setContact] = useState(initialContactState)
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchContactData(id)
  }, [id])

  const fetchContactData = async (contactId) => {
    try {
      const data = await getContact(contactId)
      setContact(data)
      toastSuccess('Contact retrieved!')
    } catch (error) {
      console.error('Error fetching contact:', error)
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await updateContact(contact, file)
      if (result) {
        toastSuccess('Contact updated!')
        navigate('/')
      }
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setContact((prevContact) => ({ ...prevContact, [name]: value }))
  }

  const handleFileSelect = () => document.getElementById('fileInput').click()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleDeleteContact = async () => {
    try {
      await deleteContact(id)
      toastSuccess('Contact deleted!')
      getAllContacts()
      navigate('/')
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  return (
    <>
      <Link to='/contacts' className='link'>
        <i className='bi bi-arrow-left'></i> Back to list
      </Link>
      <div className='profile'>
        <ProfileHeader
          photoUrl={contact.photoUrl}
          name={contact.name}
          onFileSelect={handleFileSelect}
          onFileChange={handleFileChange}
        />
        <ProfileSettings
          contact={contact}
          errors={errors}
          onInputChange={handleInputChange}
          onFormSubmit={handleFormSubmit}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </>
  )
}

const ProfileHeader = ({ photoUrl, name, onFileSelect, onFileChange }) => (
  <div className='profile__details'>
    <img src={photoUrl || '/no-avatar.png'} alt={`Profile photo of ${name}`} />
    <div className='profile__metadata'>
      <p className='profile__name'>{name}</p>
      <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MB</p>
      <button onClick={onFileSelect} className='btn'>
        <i className='bi bi-cloud-upload'></i> Change Photo
      </button>
      <input
        type='file'
        id='fileInput'
        style={{ display: 'none' }}
        onChange={onFileChange}
        accept='image/*'
      />
    </div>
  </div>
)

const ProfileSettings = ({
  contact,
  errors,
  onInputChange,
  onFormSubmit,
  onDeleteContact
}) => (
  <div className='profile__settings'>
    <form onSubmit={onFormSubmit} className='form'>
      <div className='user-details'>
        <input type='hidden' value={contact.id} name='id' />

        {formInputs.map((input) => (
          <FormInput
            key={input.name}
            label={input.label}
            name={input.name}
            value={contact[input.name]}
            onChange={onInputChange}
            required={input.required}
            error={errors[input.name]}
          />
        ))}
      </div>

      <div className='form_footer'>
        <button type='submit' className='btn'>
          Save
        </button>
        <button
          type='button'
          className='btn btn-danger'
          onClick={onDeleteContact}
        >
          Delete
        </button>
      </div>
    </form>
  </div>
)

// Define an array for the input fields data to reduce redundancy
const formInputs = [
  { label: 'Name', name: 'name', required: true },
  { label: 'Email', name: 'email', required: true },
  { label: 'Phone', name: 'phone', required: false },
  { label: 'Address', name: 'address', required: true },
  { label: 'Title', name: 'title', required: true },
  { label: 'Status', name: 'status', required: true }
]

const FormInput = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false
}) => (
  <div className='input-box'>
    <span className='details'>{label}</span>
    {name === 'status' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={error ? 'input-error' : ''}
      >
        <option value=''>Select Status</option>
        <option value='ACTIVE'>Active</option>
        <option value='INACTIVE'>Inactive</option>
      </select>
    ) : (
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={error ? 'input-error' : ''}
      />
    )}
    {error && <span className='error-message'>{error}</span>}
  </div>
)
