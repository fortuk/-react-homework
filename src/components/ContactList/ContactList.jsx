import { useSelector } from 'react-redux';

import ContactListItem from './ContactListItem/ContactListItem';
import { ContactListBox } from './ContactList.styled';

export default function ContactList() {
    const contacts = useSelector(state => state.phonebook.items.contacts);
    const filterValue = useSelector(state => state.phonebook.filter);

    const isVisibleContacts = () =>
        contacts.filter(contact =>
            contact.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
    const filterContact = isVisibleContacts();

    return (
        <ContactListBox>
            {filterContact.map(contact => (
                <ContactListItem
                    name={contact.name}
                    number={contact.number}
                    key={contact.id}
                    id={contact.id}
                />
            ))}
        </ContactListBox>
    );
}
