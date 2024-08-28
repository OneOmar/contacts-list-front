import { Link } from 'react-router-dom'

const Contact = ({ contact }) => {
  const { id, photoUrl, name, title, email, address, phone, status } = contact

  const isActive = status === 'ACTIVE'
  const truncatedName = name.substring(0, 10)
  const truncatedEmail = email.substring(0, 20)
  const truncatedAddress = address.substring(0, 20)
  const avatarUrl = photoUrl || '/no-avatar.png'

  return (
    <Link to={`/contacts/${id}`} className='contact__item'>
      <div className='contact__item'>
        <div className='contact__header'>
          <div className='contact__image'>
            <img src={avatarUrl} alt={name} />
          </div>
          <div className='contact__details'>
            <h2 className='contact__name'>{truncatedName}</h2>
            <h3 className='contact__title'>{title}</h3>
          </div>
        </div>
        <div className='contact__body'>
          <ContactDetail iconClass='bi bi-envelope' detail={truncatedEmail} />
          <ContactDetail iconClass='bi bi-geo' detail={truncatedAddress} />
          <ContactDetail iconClass='bi bi-telephone' detail={phone} />
          <ContactDetail
            iconClass={`bi ${isActive ? 'bi-check-circle' : 'bi-x-circle'}`}
            detail={status}
          />
        </div>
      </div>
    </Link>
  )
}

const ContactDetail = ({ iconClass, detail }) => (
  <p>
    <i className={iconClass}></i> {detail}
  </p>
)

export default Contact
