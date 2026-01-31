fetch('/components/header.html')
.then(res => res.text())
.then(data => {
document.getElementById('header').innerHTML = data
})

fetch('/components/footer.html')
.then(res => res.text())
.then(data => {
document.getElementById('footer').innerHTML = data
})

// current time
function updateIndiaTime() {
    const timeEl = document.querySelector('.current-time');

    const now = new Date();

    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    let time = now.toLocaleTimeString('en-IN', options)
      .replace(' ', '');

    timeEl.innerHTML = `${time} 🇮🇳`;
  }

  updateIndiaTime();

  setInterval(updateIndiaTime, 1000);
