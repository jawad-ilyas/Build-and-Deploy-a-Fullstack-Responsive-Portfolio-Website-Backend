import { asyncHandler } from "../utilis/AsyncHandler.utilis.js"
import { ApiError } from "../utilis/ApiError.utilis.js"
import { ApiResponse } from "../utilis/ApiResponse.utilis.js"
import { Contact } from "../models/contact.model.js"


// ! create Contact 
const createContact = asyncHandler(async (req, res) => {


    const { contactName, contactEmail, contactMessage } = req.body;
    console.log("Contact Controller :: createContact :: contact name :: ", contactName)
    console.log("Contact Controller :: createContact :: contact email :: ", contactEmail)
    console.log("Contact Controller :: createContact :: contact Message :: ", contactMessage)


    if (
        [contactName, contactEmail].some(filed => !filed || filed.trim() === "")

    ) {
        new ApiResponse(404, "All Fields are required ")
    }


    const contact = await Contact.create(
        {
            contactName,
            contactEmail,
            contactMessage: contactMessage || ""  // Use an empty string if contactMessage is not provided
        }
    )

    res.status(201)
        .json(
            new ApiResponse(200, "New contact is created ", contact)
        )
})

// ! fetch Contact 
const fetchContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();


    res.status(200).
        json(
            new ApiResponse(200, "ALL Contacts Are fetched ", contacts)
        )
})

// ! update Contact 
// const updateContact = asyncHandler(async () => {

// })

// ! delete Contact 
const deleteContact = asyncHandler(async (req, res) => {


    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, " Delete Contact id is not presnt ")
    }

    const verifyContact = await Contact.findById({ _id: id })

    if (!verifyContact) {
        throw new ApiError(400, " Delete Contact id is not matched ")
    }


    const deleteContactDocument = await Contact.findByIdAndDelete(
        { _id: id }
    )


    res.status(200)
        .json(
            new ApiResponse(200, "Contact is delete ", deleteContactDocument)
        )

})


export { createContact, fetchContact, deleteContact }