// Function to update the current date and time in the header
function updateDateTime() {
  const now = dayjs().format('MMMM D, YYYY h:mm A');
  document.getElementById('currentDateTime').textContent = now;
}

// Function to update the current minute line position and display the current time
function updateCurrentMinuteLineAndTime() {
  const currentHour = dayjs().hour();
  const currentMinute = dayjs().minute();
  // Use percentage to determine line location
  const minutePercent = (currentMinute / 60) * 100;

  const currentHourBlock = document.getElementById(`hour-${currentHour}`);
  let currentMinuteLine = currentHourBlock.querySelector('.current-minute-line');

  if (!currentMinuteLine) {
      currentMinuteLine = document.createElement('div');
      currentMinuteLine.className = 'current-minute-line';
      currentHourBlock.appendChild(currentMinuteLine);
  }

  if (!currentTimeText) {
      currentTimeText = document.createElement('div');
      currentTimeText.className = 'current-time-text';
      currentHourBlock.appendChild(currentTimeText);
  }

  currentMinuteLine.style.top = `${minutePercent}%`;

  const currentTime = dayjs().minute(0).add(currentMinute, 'minute').format('h:mm A');
  currentTimeText.textContent = currentTime;
}

// Function to generate time blocks for each hour of the 24-hour day
function generateTimeBlocks() {
  const container = document.getElementById('timeBlocksContainer');
  const currentHour = dayjs().hour();
  // anchor is 2 hours behind current hour so the current hour is centered
  const anchorHour = (currentHour - 2 + 24) % 24;

  for (let hour = 0; hour < 24; hour++) {
      const timeBlock = document.createElement('div');
      timeBlock.id = `hour-${hour}`;
      timeBlock.className = 'row time-block';
      // Define past, present and future blocks
      if (hour < currentHour) {
          timeBlock.classList.add('past');
      } else if (hour === currentHour) {
          timeBlock.classList.add('present');
      } else {
          timeBlock.classList.add('future');
      }
      // Define the location of the anchor link
      if (hour === anchorHour) {
          timeBlock.id = 'anchorHour';
      }

      const hourLabel = dayjs().hour(hour).minute(0).format('H:mm');
      const timeLabel = document.createElement('div');
      timeLabel.className = 'col-2 col-md-1 hour text-center py-3';
      timeLabel.textContent = hourLabel;

      const textArea = document.createElement('textarea');
      // Stylize textArea with bootstrap
      textArea.className = 'col-8 col-md-10 description';
      textArea.rows = 3;
      textArea.value = localStorage.getItem(`hour-${hour}`) || '';

      // Stylize saveButton with boostap
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

// Initialize the page with current date and time, generate time blocks, and scroll to the anchor hour
document.addEventListener('DOMContentLoaded', function() {
  updateDateTime();
  generateTimeBlocks();
  updateCurrentMinuteLineAndTime();
  setInterval(updateDateTime, 1000);
  setInterval(updateCurrentMinuteLineAndTime, 10000); // Update the minute line and time every 10 seconds
});

// Function to update the current minute line position
function updateCurrentMinuteLineAndTime() {
  const currentHour = dayjs().hour();
  const currentMinute = dayjs().minute();
  const minutePercent = (currentMinute / 60) * 100;

  const currentHourBlock = document.getElementById(`hour-${currentHour}`);
  let currentMinuteLine = currentHourBlock.querySelector('.current-minute-line');

  if (!currentMinuteLine) {
      currentMinuteLine = document.createElement('div');
      currentMinuteLine.className = 'current-minute-line';
      currentHourBlock.appendChild(currentMinuteLine);
  }

  currentMinuteLine.style.top = `${minutePercent}%`; // Position the line according to the current minute

  const currentTime = dayjs().minute(0).add(currentMinute, 'minute').format('h:mm A');

}
