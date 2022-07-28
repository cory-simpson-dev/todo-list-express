// assign variable to select all class fa-trash elements
const deleteBtn = document.querySelectorAll('.fa-trash')
// assign variable to select all class item span elements
const item = document.querySelectorAll('.item span')
// assign variable to select all class item span class completed elements
const itemCompleted = document.querySelectorAll('.item span.completed')

// make array out of deleteBtn elements and cycle through with forEach
Array.from(deleteBtn).forEach((element)=>{
    // add event listener to each element that runs deleteItem() on click
    element.addEventListener('click', deleteItem)
})

// make array out of item elements and cycle through with forEach
Array.from(item).forEach((element)=>{
    // add event listener to each element that runs markComplete() on click
    element.addEventListener('click', markComplete)
})

// make array out of itemCompleted elements and cycle through with forEach
Array.from(itemCompleted).forEach((element)=>{
    // add event listener to each element that runs markUnComplete() on click
    element.addEventListener('click', markUnComplete)
})

// make asynchronous function deleteItem() which is referenced above
async function deleteItem(){
    // assign variable to select inner text of this todo item
    const itemText = this.parentNode.childNodes[1].innerText
    // attempt to:
    try{
        // assign a variable to your fetch (which grabs deleteItem from server.js)
        const response = await fetch('deleteItem', {
            // identify method as delete
            method: 'delete',
            // assign type headers
            headers: {'Content-Type': 'application/json'},
            // create body property with value of JSON string
            body: JSON.stringify({
                // create property with value of variable above
              'itemFromJS': itemText
            })
          })
          console.log(response)
        //   assign variable to response in json upon receipt
        const data = await response.json()
        // console log that json data
        console.log(data)
        // refresh the page
        location.reload()
    // if something went wrong:
    }catch(err){
        // console log the issue
        console.log(err)
    }
}

// make asynchronous function markComplete() which is referenced above
async function markComplete(){
    // assign variable to select inner text of this todo item
    const itemText = this.parentNode.childNodes[1].innerText
    // attempt to:
    try{
        // assign a variable to your fetch (which grabs markComplete from server.js)
        const response = await fetch('markComplete', {
            // identify method as put
            method: 'put',
            // assign type headers
            headers: {'Content-Type': 'application/json'},
            // create body property with value of JSON string
            body: JSON.stringify({
                // create property with value of variable above
                'itemFromJS': itemText
            })
          })
          //   assign variable to response in json upon receipt
        const data = await response.json()
         // console log that json data
         console.log(data)
         // refresh the page
         location.reload()
     // if something went wrong:
     }catch(err){
         // console log the issue
         console.log(err)
     }
}

// make asynchronous function markUnComplete() which is referenced above
async function markUnComplete(){
    // assign variable to select inner text of this todo item
    const itemText = this.parentNode.childNodes[1].innerText
    // attempt to:
    try{
        // assign a variable to your fetch (which grabs markUnComplete from server.js)
        const response = await fetch('markUnComplete', {
            // identify method as put
            method: 'put',
            // assign type headers
            headers: {'Content-Type': 'application/json'},
            // create body property with value of JSON string
            body: JSON.stringify({
                // create property with value of variable above
                'itemFromJS': itemText
            })
          })
       // console log that json data
       console.log(data)
       // refresh the page
       location.reload()
    // if something went wrong:
    }catch(err){
       // console log the issue
       console.log(err)
   }
}