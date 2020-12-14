import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { CreateContactDto, UpdateContactDto } from 'src/dtos/contact.dto';
import { Contact } from 'src/schemas/contact.schema';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactsService: ContactService) {}

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.createContact(createContactDto);
  }

  @Get()
  async getContacts(): Promise<Contact[]> {
    return await this.contactsService.getContacts();
  }

  @Get(':id')
  async getContactById(@Param('id') id: string): Promise<Contact> {
    return await this.contactsService.getContactByID(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({transform: true}))
  async updateContact(@Param('id') id: string, @Body() updatedContact: UpdateContactDto): Promise<Contact> {
    return await this.contactsService.updateContact(id, updatedContact);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string): Promise<Contact> {
    return await this.contactsService.deleteContact(id);
  }

}
