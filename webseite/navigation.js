function getRoute(element) {
  const label = element.textContent.trim().replace(/\s+/g, ' ').toLowerCase();

  if (label.includes('alle alarme anzeigen')) return 'alarms.html';
  if (label.includes('dashboard') || label.includes('dash')) return 'dashboard.html';
  if (label.includes('runways') || label.includes('flight_takeoff')) return 'runways.html';
  if (label.includes('sensors') || label.includes('router')) return 'sensors.html';
  if (label.includes('alarms') || label.includes('notifications_active')) return 'alarms.html';

  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a, button').forEach((element) => {
    const href = getRoute(element);

    if (!href) return;

    if (element.tagName === 'A') {
      element.setAttribute('href', href);
      return;
    }

    element.addEventListener('click', () => {
      window.location.href = href;
    });
  });
});
