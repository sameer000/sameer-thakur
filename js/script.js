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
document.addEventListener('DOMContentLoaded', function () {

  function updateIndiaTime() {
    const timeEl = document.querySelector('.current-time');
    if (!timeEl) return;

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

    timeEl.innerHTML = `${time} IST`;
  }

  updateIndiaTime();
  setInterval(updateIndiaTime, 1000);

});
