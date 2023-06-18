import './App.css';
import contacts from './contacts.json';
import { useState } from 'react';

function App() {
  const [contactsInfo, setContacts] = useState(contacts.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(5));

  const addRandomContact = () => {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setContacts((previousContacts) => [...previousContacts, randomContact]);
    setRemainingContacts((previousRemainingContacts) =>
      previousRemainingContacts.filter((contact, index) => index !== randomIndex)
    );
  };

  const sortName = () => {
    const sortedContacts = [...contactsInfo].sort((contactA, contactB) => {
      return contactA.name.localeCompare(contactB.name);
    });

    setContacts(sortedContacts);
  };

  const sortPopularity = () => {
    const sortedContacts = [...contactsInfo].sort((contactA, contactB) => {
      return contactB.popularity - contactA.popularity;
    });

    setContacts(sortedContacts);
  };

  const deleteContact = (id) => {
    const updatedContacts = contactsInfo.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  }

  return (
    <div className="App">
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortName}>Sort by name</button>
      <button onClick={sortPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsInfo.map((contact) => (
            <tr key={contact._id}>
              <td>
                <img className='ProfilePhoto' src={contact.pictureUrl} alt="" />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🏆' : ''}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
