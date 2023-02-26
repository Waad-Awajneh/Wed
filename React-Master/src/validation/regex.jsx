export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%-]).{8,24}$/;
export const Phone_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const Email_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
 export function isEmpty(myObj){
let flag=false
  const propertyNames = Object.keys(myObj);
  console.log(propertyNames);
  propertyNames.forEach((e)=>{ 
    
      if(myObj[e].trim()=="") {
        flag=true;} ;
  }
 
  )
  return flag
 }