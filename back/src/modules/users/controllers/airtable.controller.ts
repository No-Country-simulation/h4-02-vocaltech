import { Request, Response } from 'express';
import { userTable } from '../services/airtable.service';
import { User } from '../models/user.model';
import { contactTable } from '../services/airtable.service';
import { interactionTable } from '../services/airtable.service';

import { deleteUserById } from '../services/airtable.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = [];
    await userTable.select().eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const user: User = {
          id: record.id,
          name: record.get('name') as string,
          description: record.get('description') as string,
          email: record.get('email') as string,
          phone: record.get('phone') as string,
          company: record.get('company') as string,
          active: record.get('active') as boolean,
          type: record.get('type') as User['type'],
          password: record.get('password') as string,
        };
        users.push(user);
      });
      fetchNextPage();
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error('Airtable Error:', error);
    res.status(500).json({ message: 'Error fetching users from Airtable', error: (error as Error).message });
  }
};

//POST newUser
export const createUser = async (req: Request, res: Response) => {
    try {
      const { name, description, email, phone, company, active, type, password } = req.body;
  
      // Airtable expects the fields to be wrapped in a "fields" object
      const newRecord = await userTable.create({
          name,
          description,
          email,
          phone,
          company,
          active,
          type,
          password,
      });
  
      const createdUser = {
        id: newRecord.id,
        ...newRecord.fields,
      };
  
      res.status(201).json({
        message: 'User created successfully',
        user: createdUser,
      });
    } catch (error: any) {
      console.error('Error creating user:', error);
      res.status(500).json({
        message: 'Error creating user in Airtable',
        error: error.message,
      });
    }
  };

//EDIT user by id
export const updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, email, phone, company, active, type, password } = req.body;
  
      const updatedRecord = await userTable.update(id, {
        name,
        description,
        email,
        phone,
        company,
        active,
        type,
        password,
      });
  
      const updatedUser = {
        id: updatedRecord.id,
        ...updatedRecord.fields,
      };
  
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error: any) {
      console.error('Error updating user:', error);
  
      if (error.statusCode === 404) {
        return res.status(404).json({
          message: 'User not found',
          error: error.message,
        });
      }
  
      res.status(500).json({
        message: 'Error updating user in Airtable',
        error: error.message,
      });
    }
  };

  //DELETE user by id
  export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      await deleteUserById(id);
      return res.status(200).json({ message: `User with ID ${id} deleted successfully.` });
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      return res.status(500).json({ error: 'Failed to delete user.' });
    }
  };



export const getContacts = async (req: Request, res: Response) => {
    try {
      const records = await contactTable.select().all();
      const contacts = records.map(record => ({
        id: record.id,
        ...record.fields,
      }));
  
      res.status(200).json(contacts);
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({
        message: 'Error fetching contacts from Airtable',
        error: error.message,
      });
    }
  };

  export const getInteractions = async (req: Request, res: Response) => {
    try {
      const records = await interactionTable.select().all();
      const interactions = records.map(record => ({
        id: record.id,
        ...record.fields,
      }));
  
      res.status(200).json(interactions);
    } catch (error: any) {
      console.error('Error fetching Interactions:', error);
      res.status(500).json({
        message: 'Error fetching Interactions from Airtable',
        error: error.message,
      });
    }
  };

  