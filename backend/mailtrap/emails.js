import { VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient } from "./mailtrap.config.js"
import { sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email , verificationToken) =>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender , 
            to:recipient , 
            subject:"verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}" , verificationToken),
            category:"Email Vertification"
        })

        console.log("Email sent successfully")
    } catch (error) {
        console.error('error : ' , error)
        throw new Error(`Error sending vertification email: ${error} `)
    }

}

export const sendWelcomeEmail = async(email , name ) =>{
    const recipient = [{email}]

    try {
        
const response = await mailtrapClient.send({

    from: sender,

    to: recipient,

    template_uuid: "35f77aa4-2551-4bac-b182-691ed5c68332",

    template_variables: {

      company_info_name: "HabitHub",

      name: name

    }

  })

  console.log("Email sent successfully"  , response)

    } catch (error) {
        console.error('error : ' , error)
        throw new Error(`Error sending vertification email: ${error} `)
    }
}


export const sendResetEmail = async(email , resetUrl ) =>{
    const recipient = [{email}]

     try {
        const response = await mailtrapClient.send({
            from:sender , 
            to:recipient , 
            subject:"Reset your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE .replace ("{resetURL}" , resetUrl),
            category:"Reset request"
        })

        console.log("Email sent successfully")
    } catch (error) {
        console.error('error : ' , error)
        throw new Error(`Error sending vertification email: ${error} `)
    }
}

export const sendSuccessResetEmail = async(email  ) =>{
    const recipient = [{email}]

     try {
        const response = await mailtrapClient.send({
            from:sender , 
            to:recipient , 
            subject:"Reset Password successfully",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password Reset"
        })

        console.log("Email sent successfully")
    } catch (error) {
        console.error('error : ' , error)
        throw new Error(`Error sending vertification email: ${error} `)
    }
}