import { Router } from 'https://deno.land/x/oak/mod.ts'
import { welcomeMessage, getContacts, getContact, addContacts, updateContacts, deleteContacts } from './controller.ts'

const router = new Router()

router.get('/', welcomeMessage) // done
    .get('/contacts', getContacts) //done
    .get('/contacts/:id', getContact) // done
    .post('/contacts', addContacts)
    .put('/contacts/:id', updateContacts)
    .delete('/contacts/:id', deleteContacts) //done

export default router