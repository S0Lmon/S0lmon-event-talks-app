const talksData = '%%TALKS_DATA%%';

document.addEventListener('DOMContentLoaded', () => {
  const talks = JSON.parse(talksData);
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('search');

  const renderSchedule = (filteredTalks) => {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2024-01-01T10:00:00');

    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    filteredTalks.forEach((talk, index) => {
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime.getTime() + talk.duration * 60000);

      const timeSlot = document.createElement('div');
      timeSlot.classList.add('time-slot');

      const timeDiv = document.createElement('div');
      timeDiv.classList.add('time');
      timeDiv.textContent = `${formatTime(startTime)} - ${formatTime(endTime)}`;
      timeSlot.appendChild(timeDiv);

      const talkDiv = document.createElement('div');
      talkDiv.classList.add('talk');
      talkDiv.innerHTML = `
        <h2>${talk.title}</h2>
        <div class="speakers">${talk.speakers.join(', ')}</div>
        <p>${talk.description}</p>
        <div class="category">
          ${talk.category.map(cat => `<span>${cat}</span>`).join('')}
        </div>
      `;
      timeSlot.appendChild(talkDiv);

      scheduleContainer.appendChild(timeSlot);

      currentTime = new Date(endTime.getTime());

      if (index === 2) { // Lunch break after the 3rd talk
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000);
        const breakSlot = document.createElement('div');
        breakSlot.classList.add('time-slot');
        breakSlot.innerHTML = `
          <div class="time">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</div>
          <div class="break">Lunch Break</div>
        `;
        scheduleContainer.appendChild(breakSlot);
        currentTime = lunchEndTime;
      } else if (index < filteredTalks.length - 1) { // 10-minute break
        const breakStartTime = new Date(currentTime);
        const breakEndTime = new Date(breakStartTime.getTime() + 10 * 60000);
        const breakSlot = document.createElement('div');
        breakSlot.classList.add('time-slot');
        breakSlot.innerHTML = `
          <div class="time">${formatTime(breakStartTime)} - ${formatTime(breakEndTime)}</div>
          <div class="break">Break</div>
        `;
        scheduleContainer.appendChild(breakSlot);
        currentTime = breakEndTime;
      }
    });
  };

  renderSchedule(talks);

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
  });
});
