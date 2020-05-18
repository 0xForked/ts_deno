import Contact from './contact.ts'

let data: Array<Contact> = [{
    id: "1",
    name: "Unke Marungke",
    email: "unke@sample.id",
},{
    id: "2",
    name: "Felix Hartono",
    email: "fhartono@sample.id",
},{
    id: "3",
    name: "Bayu Sabel",
    email: "bayu_s@sample.id",
}]

const welcomeMessage = ({response }: {response: any}) => {
    response.body = "Welcome to example REST API with deno and oak!";
}

const getContacts = ({ response }: { response: any }) => {
    response.body = data
}

const getContact = ({ params, response }: { params: { id: string }; response: any }) => {
    const contact: Contact | undefined = searchContactById(params.id)
    if (contact) {
        response.status = 200
        response.body = data[0]
    } else {
        response.status = 404
        response.body = { message: `Contact not found.` }
    }
}

const addContacts = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body({
        contentTypes: {
          text: ["application/javascript"],
        },
    })
    const contact: Contact = body.value
    data.push(contact)
    response.body = { message: 'OK' }
    response.status = 200
}

const updateContacts = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
    let contact: Contact | undefined = searchContactById(params.id)
    if (contact) {
      const body = await request.body()
      const updateInfos: { author?: string; title?: string } = body.value
      contact = { ...contact, ...updateInfos}
      data = [...data.filter(contact => contact.id !== params.id), contact]
      response.status = 200
      response.body = { message: 'OK' }
    } else {
      response.status = 404
      response.body = { message: `Contact not found` }
    }
}

const deleteContacts = ({ params, response }: { params: { id: string }; response: any }) => {
    data = data.filter(contact => contact.id !== params.id)
    response.body = { message: 'OK' }
    response.status = 200
}

const searchContactById = (id: string): ( Contact | undefined ) => data.filter(data => data.id === id )[0]

export { welcomeMessage, getContacts, getContact, addContacts, updateContacts, deleteContacts }