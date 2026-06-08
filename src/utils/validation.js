const validator = require("validator")

const validationSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body

    if(!firstName || !lastName){
        throw new Error("name is not valid")
    } else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    } else if (!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }

}

const validateMyEditProfileData = (req) => {
    const allowedEditFields = ["firstName", 'lastName', "emailId", "about", "photoUrl","age","gender","skills"]

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))

    return isEditAllowed
}

const validateNewPassword = (req) => {
    const {newPassword} = req.body

    if (!validator.isStrongPassword(newPassword)){
        throw new Error("Please enter a strong password")
    }
    

}

module.exports = {
    validationSignupData,
    validateMyEditProfileData,
    validateNewPassword
}