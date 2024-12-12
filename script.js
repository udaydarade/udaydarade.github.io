// for opening in android device, responsiveness
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // getting x icon from the icons website
    navbar.classList.toggle('active')

}
// logic for color change in nav bar icons after you change
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // remove toggle icon when scrolled or clicked.
    menuIcon.classList.remove('bx-x'); 
    navbar.classList.remove('active');

}

const form = document.getElementById("myForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const subject = document.getElementById("subject").value;
  const content =document.getElementById("content").value;

  // here you can get the input entered by the user but i couldn't find a way for sending email directly :( .

})

// const slider = document.querySelector('.slider-track');
// let offset = 0;
// const step = 300; // Adjust based on card width
// const maxOffset = slider.scrollWidth - slider.clientWidth;

// document.querySelector('.slider-btn.prev').addEventListener('click', () => {
//     offset = Math.max(offset - step, 0);
//     slider.style.transform = `translateX(-${offset}px)`;
// });

// document.querySelector('.slider-btn.next').addEventListener('click', () => {
//     offset = Math.min(offset + step, maxOffset);
//     slider.style.transform = `translateX(-${offset}px)`;
// });
