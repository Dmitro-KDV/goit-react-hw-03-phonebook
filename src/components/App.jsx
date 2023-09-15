import {FormaPhonebook} from 'components/Phonebook/FormaPhonebook'
import {Contacts} from 'components/Phonebook/Contacts'
import {Filter} from 'components/Phonebook/Filter'
import {Container} from './Phonebook/Phonebook.stiled';
import { nanoid } from "nanoid";
import { Component } from 'react'

const INITIAL_STATE = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
}

export class App extends Component {

  state = {
    ...INITIAL_STATE,
    filter: null,
  }

  componentDidMount() {
    const parsedSettings = localStorage.getItem('contacts');
    if (parsedSettings && JSON.parse(parsedSettings).length) {
      this.setState({contacts: JSON.parse(parsedSettings)})
    }
  }

  componentDidUpdate(_, prevState) {
    console.log(prevState)
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  creatContacts = (body) => {
    const  isAlredyContacts = this.state.contacts.find(el => el.name === body.name);
    if (isAlredyContacts) return alert(`${body.name} is alredy in contacts.`)
    
    const newContacts = {
      ...body,
      id: nanoid(),
    }
    this.setState((prev) => ({
      contacts: [newContacts, ...prev.contacts],
    }))
  }

  handDelete = (id) =>  {
    if (this.state.filter) {
      this.setState((prev) => ({
        filter: prev.contacts.filter((el) => el.id !== id),
      }));
    } else {
      this.setState((prev) => ({
        contacts: prev.contacts.filter((el) => el.id !== id),
      }));
    }
  }

  filterContacts = (filterName) => {
    this.setState((prev) => ({
      filter: prev.contacts.filter((el) => el.name.toLowerCase().includes(filterName.toLowerCase())),
    }));
  }

  render() {
      return (
          <Container>
              <h2>Phonebook</h2>
              <FormaPhonebook creatContacts={this.creatContacts}/>
              <h2>Contacts</h2>
              <Filter filterContacts={this.filterContacts}/>
              <Contacts contact={this.state} handDelete={this.handDelete}/>
          </Container>
      );
  }
};
