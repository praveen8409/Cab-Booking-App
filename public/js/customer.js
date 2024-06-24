document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const form = document.getElementById('request-form');
    const statusDiv = document.getElementById('request-status');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the form from refreshing the page
  
      const customerId = document.getElementById('customerId').value;
      const latitude = parseFloat(document.getElementById('latitude').value);
      const longitude = parseFloat(document.getElementById('longitude').value);
  
      const response = await fetch('/customer/request-cab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: customerId,
          location: { type: 'Point', coordinates: [longitude, latitude] }
        })
      });
  
      const result = await response.json();
      statusDiv.textContent = result.message;
  
      if (response.ok) {
        socket.emit('requestStatus', customerId);
      }
    });
  
    socket.on('requestStatus', (data) => {
      if (data.status === 'accepted') {
        statusDiv.textContent = `Request accepted by driver ${data.driver.id}. Driver location: ${data.driver.location.coordinates}`;
      }
    });
  });
  