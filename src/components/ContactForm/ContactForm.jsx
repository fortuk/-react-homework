
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import { Form, FormLabel, Input } from './ContactForm.styled';
import { contactsOperations } from '../../redux/contacts';



export default function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.phonebook.items.contacts);
    const [form, setForm] = useState({
        name: "",
        number: "",
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };
    const { name, number } = form;

    const isUniqueContact = () => {
        const isExistContact = contacts.find(contact => contact.name === name);
        if (isExistContact) {
            Notify.failure("Contact is already exist");
        }
        return !isExistContact;
    };
    const validateForm = () => {
        if (!name || !number) {
            Notify.failure("Some field is empty");
            return false;
        }
        return isUniqueContact(name);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isValidateForm = validateForm();
        if (!isValidateForm) return;
        dispatch(
            contactsOperations.createContacts({ id: nanoid(10), name, number }),
            Notify.success("Contact is add phonebook"),
        );
        const resetForm = () => setForm({ name: "", number: "" });
        resetForm();
    };
    return (
        <Form onSubmit={handleSubmit}>
            <FormLabel>
                Name
                <Input
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    onChange={handleChange}
                    required
                />
            </FormLabel>
            <FormLabel>
                Phone Number
                <Input
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    onChange={handleChange}
                    required
                />
            </FormLabel>
            <button type="submit" className={s.button}>
                Add Contact
            </button>
        </Form>
    );
}