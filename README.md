# vaLittle
Lightweight validation plugin in pure js

## Example of ussage
```
 import { vaLittle } from "./scripts/vaLittle";

 (function() {

// Create new validation
  const form = new vaLittle;
  
// Set rules
    form.rules = {
      name:{
        required:true,
        text:true
      }
    };
    
// Set messages
    form.messages = {
      name:{
        required:"Pole wymagane",
        text:"Dozwolone jedynie małe i wielkie litery"
      }
    }
    
// Example form data - field_name:'value'
    const ContactFormData = {
      name:'test123'
    };
    
// Check data return object 
    console.log(form.check(ContactFormData));
    
  })();
```
## Return example
```
field_name:{
 email: false, // is error?
 errors: true, // is error?
 requireGroup: true, // is error?
 message: "Podaj e-mail lub telefon", // error message
 errors: true // if error 
},
errors:true // has any field error?
```
## Rules

### Custom Regex
As param set custom regular expession
```
  regex:'/^([a-zA-Z _-]+)$/'
```
### Text only
Accepts only upper and lower letters
```
  text:true
```
### Numbers Only
Accepts only numbers
```
  number:true
```
### Max value
Set max number value
```
  maxVal:5
```
### Min value
Set min number value
```
  minVal:5
```
### Min length
Set min field length
```
  min:5
```
### Max length
Set max field length
```
  max:5
```
### Require
Requires value
```
  require:true
```
### Require from group
Requires value from one or more input in group
```
  requireGroup:'group_name'
```
### Post Code
Requires a post code format XX-XXX
```
  postCode:true
```
### Phone
Requires a valid phone
```
  phone:true
```
### E-mail
Requires a valid e-mail
```
  email:true
```


