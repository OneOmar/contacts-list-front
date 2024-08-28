/**
 * ContactForm Component
 * @description Handles the creation and updating of a contact.
 * Includes form submission, input handling, and modal toggling.
 */

export const ContactForm = ({
  values,
  handleChange,
  handleFile,
  handleNewContact,
  toggleModal,
  errors
}) => {
  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleNewContact()
  }

  // Handles the cancellation of the form, closing the modal
  const handleCancel = () => toggleModal(false)

  return (
    <form onSubmit={handleSubmit}>
      <div className='user-details'>
        {/* Render each input field using the InputField component */}
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            value={values[field.name]}
            handleChange={handleChange}
            error={errors[field.name]}
            required={field.required}
          />
        ))}
        {/* Render file input for profile photo */}
        <FileInput label='Profile Photo' handleFile={handleFile} />
      </div>
      {/* Render form footer with Cancel and Save buttons */}
      <FormFooter onCancel={handleCancel} />
    </form>
  )
}

/**
 * Input fields configuration
 * @description An array of input field configurations used to generate the form fields dynamically.
 */
const inputFields = [
  { label: 'Name', name: 'name', required: true },
  { label: 'Email', name: 'email', required: true },
  { label: 'Title', name: 'title', required: true },
  { label: 'Phone Number', name: 'phone' },
  { label: 'Address', name: 'address', required: true },
  { label: 'Account Status', name: 'status', required: true }
]

/**
 * InputField Component
 * @description Renders a form input field, including validation error handling and conditional rendering for dropdowns.
 */
const InputField = ({
  label,
  name,
  value,
  handleChange,
  required = false,
  error
}) => (
  <div className='input-box'>
    <span className='details'>{label}</span>
    {/* Conditional rendering for dropdown if the input name is 'status' */}
    {name === 'status' ? (
      <select
        name={name}
        value={value}
        onChange={handleChange}
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
        onChange={handleChange}
        required={required}
        className={error ? 'input-error' : ''}
      />
    )}
    {/* Display error message if validation fails */}
    {error && <span className='error-message'>{error}</span>}
  </div>
)

/**
 * FileInput Component
 * @description Renders a file input field for uploading a profile photo.
 */
const FileInput = ({ label, handleFile }) => (
  <div className='file-input'>
    <span className='details'>{label}</span>
    <input type='file' onChange={handleFile} name='photo' />
  </div>
)

/**
 * FormFooter Component
 * @description Renders the form's footer with Cancel and Save buttons.
 */
const FormFooter = ({ onCancel }) => (
  <div className='form_footer'>
    <button onClick={onCancel} type='button' className='btn btn-danger'>
      Cancel
    </button>
    <button type='submit' className='btn'>
      Save
    </button>
  </div>
)
