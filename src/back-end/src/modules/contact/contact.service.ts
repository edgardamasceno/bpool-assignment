import { ForbiddenException, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
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
    console.log(updateContactDto._id, id, updateContactDto._id === id);

    try {
      if (updateContactDto._id === id) {
        console.log(updateContactDto._id, id, updateContactDto._id === id);
        const contact = await this.contactModel.findById(id).exec();
        if (contact) {
          const updatedContact = await this.contactModel
            .updateOne(updateContactDto)
            .exec();
          return updateContactDto;
        }
        throw new NotFoundException(
          'Operação cancelada. Contato não localizado.',
        );
      }
      throw new ForbiddenException('Operação cancelada. O campo _ID é imutável.');
    } catch (error) {
      throw error;
    }
  }

  async deleteContact(id: string) {
    try {
      const contact = await this.contactModel.findById(id).exec();
      if (contact === null) {
        throw new NotFoundException(
          'Operação cancelada. Contato não localizado.',
        );
      } else {
        const deletedContact = await this.contactModel
          .deleteOne({ _id: id })
          .exec();
        return contact;
      }
    } catch (error) {
      throw error;
    }
  }
}
