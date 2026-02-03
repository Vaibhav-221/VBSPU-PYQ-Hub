document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".b1");
  
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.href = "semester.html";
      });
    } else {
      console.log("PYQs button not found");
    }
  });

document.addEventListener("DOMContentLoaded", ()=>{
const pyq = document.querySelector(".nav-btn")

if(pyq){
  pyq.addEventListener("click", ()=>{
    window.location.href = "semester.html"
  })
}
})
  

document.addEventListener("DOMContentLoaded", ()=>{
  const pyq = document.querySelector(".nav-home")
  
  if(pyq){
    pyq.addEventListener("click", ()=>{
      window.location.href = "index.html"
    })
  }
  })
    

  document.addEventListener("DOMContentLoaded", ()=>{
    const pyq = document.querySelector(".script-btn")
    
    if(pyq){
      pyq.addEventListener("click", ()=>{
        window.location.href = "contact.html"
      })
    }
    })
      