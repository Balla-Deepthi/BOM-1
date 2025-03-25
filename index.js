let form=document.querySelector("form")
let input=document.getElementById("name")
form.addEventListener("submit",function(event)
{
    if(input.value=='')
    {
        event.preventDefault()
    }
    else
    {
        let arr =JSON.parse(localStorage.getItem("names")) ||[]
        arr.push(input.value)
        localStorage.setItem("names",JSON.stringify(arr))
        displayData()
    }
})
function displayData()
{
    let container=document.querySelector(".container")
    let data=JSON.parse(localStorage.getItem("names"))
    if(data=='')
    {
        container.innerHTML=`No data`
    }
    else
    {
      data.forEach(ele=>
      {
       let p=document.createElement("p")
       p.innerHTML=`Name: ${ele}`
       container.appendChild(p)
      }
      )
        
    }
   
}
window.addEventListener("DOMContentLoaded", function () {
    displayData();
})