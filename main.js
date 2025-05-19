// json string to object
const jsonstring='{"name":"arpit","age":30,"city":"newyork"}'
const jsonobject=JSON.parse(jsonstring)
// JSON.parse(): JavaScript ka built-in function hai jo ek JSON string ko ek real JavaScript object mein convert karta hai.(string to object)
console.log(jsonobject.name)


// object to json string
const objectToConvert={
    name:"alice",
    age:36
};
const json=JSON.stringify(objectToConvert)
console.log(json);
console.log("type is: " +typeof json);



