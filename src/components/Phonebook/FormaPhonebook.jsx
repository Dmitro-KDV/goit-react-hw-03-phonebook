import {Form, Label} from './Phonebook.stiled';
import { Component } from 'react'

const INITIAL_STATE = {
    name: '',
    number: '',
}

export class FormaPhonebook extends Component {
    state = INITIAL_STATE

    handleChange = evt => {
        const { name, value } = evt.target;
        this.setState({ [name]: value });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        if (!this.state.name.trim() || !this.state.number.trim()) 
            return this.setState(INITIAL_STATE);
        this.props.creatContacts(this.state);
        this.setState(INITIAL_STATE);
    };
      
    render() {
        return ( 
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Label>
                        Name
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </Label>
                    <Label>
                        Number
                        <input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            onChange={this.handleChange}
                            value={this.state.number}
                        />
                    </Label>
                    <button type="submit">Add contact</button>
                </Form>
            </div>
        );
    }
}