const Header = ({ toggleModal, nbOfContacts }) => {
  return (
    <header className='header'>
      <div className='container'>
        <h1 className='header__title'>Contact List ({nbOfContacts})</h1>
        <button
          onClick={() => toggleModal(true)}
          className='btn'
          aria-label='Add New Contact'
        >
          <i className='bi bi-plus-square'></i> Add New Contact
        </button>
      </div>
    </header>
  )
}

export default Header
