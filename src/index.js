document.addEventListener('DOMContentLoaded', async () => {
    const countryList = document.getElementById('country-list');
    const selectedCountry = document.querySelector('.selected-country');
  
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();
  
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
      countries.forEach(country => {
        const countryItem = document.createElement('div');
        countryItem.classList.add('country-item');
        countryItem.innerHTML = `
          <span>${country.name.common}</span>
          <img src="${country.flags.svg}" alt="${country.name.common} flag" class="country-flag">
        `;
        countryItem.addEventListener('click', () => {
          selectedCountry.innerHTML = countryItem.innerHTML;
          countryList.style.display = 'none';
        });
        countryList.appendChild(countryItem);
      });
  
      selectedCountry.addEventListener('click', () => {
        countryList.style.display = countryList.style.display === 'block' ? 'none' : 'block';
      });
  
      document.addEventListener('click', (event) => {
        if (!event.target.closest('.country-dropdown')) {
          countryList.style.display = 'none';
        }
      });
  
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  });