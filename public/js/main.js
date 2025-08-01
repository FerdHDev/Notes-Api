// Navbar Toggle for Mobile
document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation Delay for Steps
document.querySelectorAll('.step-card').forEach((card, index) => {
    card.style.setProperty('--i', index);
});

// Back-to-Top Button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// CSS for Back-to-Top Button
const style = document.createElement('style');
style.innerHTML = `
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #FF6F61;
    color: #F8F9FA;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    width: fit-content;
    transition: opacity 0.3s ease;
  }
  .back-to-top:hover {
    background: #4682B4;
  }
`;
document.head.appendChild(style);

document.querySelector("span.toggle-password i").addEventListener("click", (e) => {
    const pwdEle = document.querySelector(".password-wrapper #password");
    e.preventDefault()
    pwdEle.type === "password" ? pwdEle.type = "text" : pwdEle.type = "password"
})
