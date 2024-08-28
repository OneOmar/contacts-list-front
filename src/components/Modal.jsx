export const Modal = ({ toggleModal }) => {
  return (
    <dialog className='modal' id='modal'>
      <div className='modal__header'>
        <h3>New Contact</h3>
        <i onClick={() => toggleModal(false)} className='bi bi-x-lg'></i>
      </div>
      <div className='divider'></div>
      <div className='modal__body'>
        <form>
          <div className='user-details'>
            <div className='input-box'>
              <span className='details'>Name</span>
              <input type='text' name='name' required />
            </div>
            <div className='input-box'>
              <span className='details'>Email</span>
              <input type='text' name='email' required />
            </div>
            <div className='input-box'>
              <span className='details'>Title</span>
              <input type='text' name='title' required />
            </div>
            <div className='input-box'>
              <span className='details'>Phone Number</span>
              <input type='text' name='phone' required />
            </div>
            <div className='input-box'>
              <span className='details'>Address</span>
              <input type='text' name='address' required />
            </div>
            <div className='input-box'>
              <span className='details'>Account Status</span>
              <input type='text' name='status' required />
            </div>
            <div className='file-input'>
              <span className='details'>Profile Photo</span>
              <input type='file' name='photo' required />
            </div>
          </div>
          <div className='form_footer'>
            <button
              onClick={() => toggleModal(false)}
              type='button'
              className='btn btn-danger'
            >
              Cancel
            </button>
            <button type='submit' className='btn'>
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
