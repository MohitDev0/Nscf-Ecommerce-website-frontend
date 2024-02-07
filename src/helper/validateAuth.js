import { toast } from "react-hot-toast";
export const validateUser = (values) => {
   if (!values.email) {
      return toast.error("Email required");
   } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
   ) {
      return toast.error("Invalid Email address");
   } else if (!values.password) {
      return toast.error("Password Required");
   }

   if (values.updatePassword) {
      if (values.password !== values.confirmPassword) {
         return toast.error("Passwords does not match");
      }
   }


   if (values.SignPage) {
      if (!values.username) {
         return toast.error("Username required");
      } else if (values.password !== values.confirmPassword) {
         return toast.error("Passwords does not match");
      } else if (!values.otp) {
         return toast.error("OTP Required");
      } else if (values.otp.toString().length !== 6) {
         return toast.error("Enter Valid Otp");
      }
   }
}

export const validateNewUser = (error) => {
   switch (error) {
      case "Invalid Otp":
         toast.error("Invalid OTP");
         break;
      case "email already used":
         toast.error("Email Already used");
         break;
      case "username already found":
         toast.error("Username Already found");
         break;
      case "hash error":
         toast.error("Internal server error \n Try Again After Sometime");
         break;
      case "error in jwt token":
         toast.error("Internal server error \n Try Again After Sometime");
         break;
      case "error in signUp api":
         toast.error("Internal server error \n Try Again After Sometime");
         break;
      case "user not found":
         toast.error("User Not Found \n SignUp First");
         break;
      case "bcrypt error":
         toast.error("Sorry For The Inconvenience \n we are facing some problem \n Try Again After Sometime");
         break;
      case "password Invalid":
         toast.error("Invalid Password");
         break;
      case "password does not update":
         toast.error("Password does not update");
         break;
      case "error in login api":
         toast.error("Sorry For The Inconvenience \n we are facing some problem \n Try Again After Sometime");
         break;
      default:
         break;
   }
}
