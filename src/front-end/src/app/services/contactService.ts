import { Dispatch, SetStateAction } from 'react';
import { IContact } from '../interfaces';

export async function getContacts(): Promise<Array<IContact>> {
  return fetch(`${process.env.REACT_APP_BASEURL}contact/`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error.body));
}

export async function viewContact(id: string): Promise<IContact> {
  return fetch(`${process.env.REACT_APP_BASEURL}contact/${id}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error.body));
}

export async function editContact(
  id: string,
  contact: IContact,
  errorHandler: Dispatch<SetStateAction<string[] | []>>
): Promise<IContact> {
  return fetch(`${process.env.REACT_APP_BASEURL}contact/${id}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((response) => {
          if (response.message instanceof String) {
            errorHandler([response.message]);
          } else if (response.message instanceof Array) {
            errorHandler(response.message);
          }
        });
      }
      return response.json();
    })
    .catch((error) => console.log(error.body));
}

export async function newContact(
  contact: IContact,
  errorHandler: Dispatch<SetStateAction<string[] | []>>
): Promise<IContact> {
  if (contact === null) {
    contact = {
      _id: '',
      name: '',
      email: '',
      birth: new Date(),
      occupation: 'Selecione',
    };
  }

  return fetch(`${process.env.REACT_APP_BASEURL}contact/`, {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((response) => {
          if (response.message instanceof String) {
            errorHandler([response.message]);
          } else if (response.message instanceof Array) {
            errorHandler(response.message);
          }
        });
      }
      return response.json();
    })
    .catch((error) => console.log);
}

export async function deleteContact(id: string): Promise<IContact> {
  return fetch(`${process.env.REACT_APP_BASEURL}contact/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error.body));
}
