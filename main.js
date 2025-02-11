document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('registrationModal');
  const closeModalBtnEl = document.querySelector('.close-modal');
  const registrationFormEl = document.getElementById('registrationForm');
  const openModaBtnEl = document.getElementById('openModal');

  const updateCountdown = () => {
    const targetDate = new Date('2025-03-01T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document
        .querySelectorAll('#days')
        .forEach(el => (el.textContent = days.toString().padStart(2, '0')));
      document
        .querySelectorAll('#hours')
        .forEach(el => (el.textContent = hours.toString().padStart(2, '0')));
      document
        .querySelectorAll('#minutes')
        .forEach(el => (el.textContent = minutes.toString().padStart(2, '0')));
      document
        .querySelectorAll('#seconds')
        .forEach(el => (el.textContent = seconds.toString().padStart(2, '0')));
    }
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();

  const validateForm = form => {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }

      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.classList.add('error');
          isValid = false;
        }
      }

      if (input.type === 'checkbox' && !input.checked) {
        input.classList.add('error');
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;

    if (validateForm(form)) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      fetch('https://example.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          alert('Реєстрація успішна!');
          form.reset();
          document.getElementById('registrationModal');
        })
        .catch(error => {
          console.error('Помилка:', error);
          alert('Сталася помилка. Спробуйте пізніше.');
        });
    }
  };

  openModaBtnEl.addEventListener('click', () => {
    modalEl.style.display = 'block';
  });

  closeModalBtnEl.addEventListener('click', () => {
    modalEl.style.display = 'none';
  });

  registrationFormEl.addEventListener('submit', handleSubmit);
});
