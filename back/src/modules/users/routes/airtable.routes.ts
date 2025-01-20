import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/airtable.controller';
import { getContacts } from '../controllers/airtable.controller'; // Import contact controller
import { getInteractions } from '../controllers/airtable.controller'; // Import Interactions controller

const router = Router();

// Route to fetch all users from Airtable
router.get('/Users', getUsers);
router.post('/Users', createUser); // Add a new user
router.put('/Users/:id', updateUser); //EDIT user
router.delete('/Users/:id', deleteUser); // DELETE user by ID
router.get('/Contacts', getContacts); // Add route for fetching contacts
router.get('/Interactions', getInteractions); // Add route for fetching Interactions

export default router;
