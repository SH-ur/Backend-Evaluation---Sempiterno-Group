const regexp = new RegExp(process.env.DATEREGEXP);
    
const dateRegex= (input2Validate: string)=>{
const validate = regexp?.test(input2Validate);
    if (!validate)
      return {
        status: "error",
        message: "The Available Date Input must be of the format YYYY-MM-DD",
      }
    else return null;  
}

export default dateRegex;
