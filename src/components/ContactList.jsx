import ContactCard from './ContactCard.jsx'
import Pagination from './Pagination.jsx'

const ContactList = ({ data, currentPage, getAllContacts }) => {
  const hasContacts = data?.content?.length > 0

  return (
    <div className='main'>
      {hasContacts ? (
        <ul className='contact__list'>
          {data.content.map((contact) => (
            <ContactCard contact={contact} key={contact.id} />
          ))}
        </ul>
      ) : (
        <div>No Contacts. Please add a new contact.</div>
      )}

      {hasContacts && data?.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={getAllContacts}
        />
      )}
    </div>
  )
}

export default ContactList
