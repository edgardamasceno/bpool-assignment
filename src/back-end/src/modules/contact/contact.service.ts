import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { exception } from 'console';
import { Model } from 'mongoose';
import { CreateContactDto, UpdateContactDto } from 'src/dtos/contact.dto';
import { Contact, ContactDocument } from 'src/schemas/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const { name, email, birth, occupation } = createContactDto;
      const createdContact = new this.contactModel({
        name,
        email,
        birth,
        occupation,
      });
      return createdContact.save();
    } catch (error) {
      return error;
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      return await this.contactModel.find().exec();
    } catch (error) {
      return error;
    }
  }

  async getContactByID(id: string): Promise<Contact> {
    try {
      const contact = await this.contactModel.findById(id).exec();

      if (contact === null) {
        throw new NotFoundException(
          'Operação cancelada. Contato não localizado.',
        );
      } else {
        return contact;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateContact(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    try {
      const updatedContact = await this.contactModel
        .findByIdAndUpdate(id, updateContactDto)
        .exec();

      if (updatedContact === null) {
        throw new NotFoundException(
          'Operação cancelada. Contato não localizado.',
        );
      } else {
        return updatedContact;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteContact(id: string) {
    try {
      const deletedContact = await this.contactModel
        .findOneAndDelete({ _id: id })
        .exec();
      if (deletedContact === null) {
        throw new NotFoundException(
          'Operação cancelada. Contato não localizado.',
        );
      } else {
        return deletedContact.remove();
      }
    } catch (error) {
      throw error;
    }
  }
}
