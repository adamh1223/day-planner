// Function to update the current date and time in the header
function updateDateTime() {
  const now = dayjs().format('MMMM D, YYYY h:mm A');
  document.getElementById('currentDateTime').textContent = now;
}

// Function to generate time blocks for each hour of the 24-hour day
function generateTimeBlocks() {
  const container = document.getElementById('timeBlocksContainer');
  const currentHour = dayjs().hour();

  for (let hour = 0; hour < 24; hour++) {
      const timeBlock = document.createElement('div');
      timeBlock.id = `hour-${hour}`;
      timeBlock.className = 'row time-block';
      
      if (hour < currentHour) {
          timeBlock.classList.add('past');
      } else if (hour === currentHour) {
          timeBlock.classList.add('present');
          // Adding an ID to the current hour block for the anchor link
          timeBlock.id = 'currentHour';
      } else {
          timeBlock.classList.add('future');
      }

      const hourLabel = dayjs().hour(hour).minute(0).format('H:mm');
      const timeLabel = document.createElement('div');
      timeLabel.className = 'col-2 col-md-1 hour text-center py-3';
      timeLabel.textContent = hourLabel;

      const textArea = document.createElement('textarea');
      textArea.className = 'col-8 col-md-10 description';
      textArea.rows = 3;
      textArea.value = localStorage.getItem(`hour-${hour}`) || '';

      const saveButton = document.createElement('button');
      saveButton.className = 'btn saveBtn col-2 col-md-1';
      saveButton.setAttribute('aria-label', 'save');
      saveButton.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';
      saveButton.addEventListener('click', function() {
          localStorage.setItem(`hour-${hour}`, textArea.value);
      });

      timeBlock.appendChild(timeLabel);
      timeBlock.appendChild(textArea);
      timeBlock.appendChild(saveButton);

      container.appendChild(timeBlock);
  }
}

// Initialize the page with current date and time, generate time blocks, and scroll to the current hour
document.addEventListener('DOMContentLoaded', function() {
  updateDateTime();
  generateTimeBlocks();
  setInterval(updateDateTime, 1000);

  // Scroll to the current hour block
  const currentHourElement = document.getElementById('currentHour');
  if (currentHourElement) {
      currentHourElement.scrollIntoView({ behavior: 'smooth' });
  }
});
