document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const form = document.getElementById('driver-form');
    const requestsDiv = document.getElementById('requests');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the form from refreshing the page
  
      const driverId = document.getElementById('driverId').value;
      const latitude = parseFloat(document.getElementById('latitude').value);
      const longitude = parseFloat(document.getElementById('longitude').value);
  
      socket.emit('registerDriver', {
        id: driverId,
        location: { type: 'Point', coordinates: [longitude, latitude] }
      });
  
      socket.on('newRequest', (data) => {
        const requestHtml = `
          <div class="request">
            <p>Request ID: ${data.requestId}</p>
            <p>Location: ${data.location.coordinates}</p>
            <button class="btn btn-success accept-btn" data-request-id="${data.requestId}">Accept</button>
            <button class="btn btn-danger decline-btn" data-request-id="${data.requestId}">Decline</button>
          </div>
        `;
        requestsDiv.innerHTML += requestHtml;
      });
  
      requestsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('accept-btn')) {
          const requestId = e.target.getAttribute('data-request-id');
          socket.emit('acceptRequest', { requestId, driverId });
        } else if (e.target.classList.contains('decline-btn')) {
          const requestId = e.target.getAttribute('data-request-id');
          socket.emit('declineRequest', { requestId, driverId });
        }
      });
    });
  });
  