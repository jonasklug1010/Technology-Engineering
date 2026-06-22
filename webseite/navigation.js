function getRoute(element) {
  const label = element.textContent.trim().replace(/\s+/g, ' ').toLowerCase();

  if (label.includes('alle alarme anzeigen')) return 'alarms.html';
  if (label.includes('dashboard') || label.includes('dash')) return 'dashboard.html';
  if (label.includes('runways') || label.includes('flight_takeoff')) return 'runways.html';
  if (label.includes('sensors') || label.includes('sensoren') || label.includes('router')) return 'sensors.html';
  if (label.includes('history') || label.includes('historie')) return 'history.html';
  if (label.includes('alarms') || label.includes('alarme') || label.includes('notifications_active')) return 'alarms.html';
  if (label.includes('settings') || label.includes('einstellungen')) return 'settings.html';

  return null;
}

function initResponsiveShell() {
  const style = document.createElement('style');
  style.textContent = `
    /* Anforderungen 1, 2 und 6: browserbasierte Responsive-Navigation ohne separate App. */
    @media (max-width: 767px) {
      body { padding-bottom: 72px; overflow-x: hidden; }
      body > aside[class*="w-64"] { display: none !important; }
      body > main { margin-left: 0 !important; padding-left: 0 !important; width: 100% !important; }
      header { padding-left: 16px !important; padding-right: 16px !important; }
      .top-action-icons { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  if (document.querySelector('[data-mobile-main-nav]')) return;

  const nav = document.createElement('nav');
  nav.className = 'md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-surface-container border-t border-outline-variant px-xs py-xs grid grid-cols-4 gap-xs';
  nav.setAttribute('aria-label', 'Mobile Hauptnavigation');
  nav.setAttribute('data-mobile-main-nav', '');
  nav.innerHTML = `
    <a class="flex flex-col items-center gap-1 text-on-surface-variant" href="dashboard.html">
      <span class="material-symbols-outlined">dashboard</span>
      <span class="text-[10px]">Dashboard</span>
    </a>
    <a class="flex flex-col items-center gap-1 text-on-surface-variant" href="sensors.html">
      <span class="material-symbols-outlined">router</span>
      <span class="text-[10px]">Sensoren</span>
    </a>
    <a class="flex flex-col items-center gap-1 text-on-surface-variant" href="history.html">
      <span class="material-symbols-outlined">history</span>
      <span class="text-[10px]">Historie</span>
    </a>
    <a class="flex flex-col items-center gap-1 text-on-surface-variant" href="settings.html">
      <span class="material-symbols-outlined">settings</span>
      <span class="text-[10px]">Einstellungen</span>
    </a>
  `;
  document.body.appendChild(nav);
}

const profileChoices = [
  { name: 'IT', subtitle: 'Technischer Betrieb', icon: 'dns', image: 'assets/profiles/it.png' },
  { name: 'Management', subtitle: 'Leitung', icon: 'business_center', image: 'assets/profiles/management.png' },
  { name: 'Winterdienst', subtitle: 'Einsatzleitung Schnee', icon: 'ac_unit', image: 'assets/profiles/winterdienst.png' },
  { name: 'Fluglotsen', subtitle: 'Tower / Funk', icon: 'settings_input_antenna', image: 'assets/profiles/fluglotsen.png' },
  { name: 'Controlling', subtitle: 'Kennzahlen', icon: 'query_stats', image: 'assets/profiles/controlling.png' },
  { name: 'Luftfahrtbehörde', subtitle: 'Aufsicht', icon: 'gavel', image: 'assets/profiles/luftfahrtbehoerde.png' },
  { name: 'Entwicklungsteam', subtitle: 'Software', icon: 'code', image: 'assets/profiles/entwicklungsteam.png' },
  { name: 'Sicherheitsabteilung', subtitle: 'Safety / Security', icon: 'shield', image: 'assets/profiles/sicherheitsabteilung.png' }
];

// Rollenmatrix: legt zentral fest, welche Bereiche, Inhalte und Aktionen pro Profil sichtbar oder erlaubt sind.
const roleRules = {
  IT: {
    pages: ['sensors', 'history', 'settings'],
    sections: ['sensor-map', 'sensor-defects', 'sensor-audit', 'sensor-details', 'sensor-history', 'technical-settings', 'alarm-logic', 'sensor-admin', 'api-backend', 'compliance', 'roles-admin', 'system-status'],
    actions: ['sensor-fix', 'add-sensor', 'edit-settings', 'save-logic', 'register-node', 'test-api', 'export-report', 'manage-roles'],
    summary: 'Technische Diagnose, Sensorstatus, Logs und Konfiguration. Keine operative Runway-Quittierung.'
  },
  Management: {
    pages: ['dashboard', 'history'],
    sections: ['overview-status', 'runway-status', 'forecast', 'weather-data', 'runway-map', 'risk-trend', 'flight-check', 'management-kpis', 'measurement-history', 'runway-history', 'alarm-history'],
    actions: ['view-report'],
    summary: 'Verdichtete Lage, Prognose und Historie zur Betriebsbewertung ohne operative oder technische Eingriffe.'
  },
  Winterdienst: {
    pages: ['dashboard', 'sensors', 'history'],
    sections: ['overview-status', 'runway-status', 'forecast', 'weather-data', 'runway-map', 'risk-trend', 'flight-check', 'management-kpis', 'sensor-map', 'sensor-details', 'measurement-history', 'runway-history', 'alarm-history'],
    actions: ['ack-warning', 'flight-check', 'runway-state', 'document-action'],
    summary: 'Live-Wetterdaten, kritische Bereiche und Warnungen für Einsatzplanung und dokumentierte Reaktion.'
  },
  Fluglotsen: {
    pages: ['dashboard', 'history'],
    sections: ['overview-status', 'runway-status', 'forecast', 'weather-data', 'runway-map', 'risk-trend', 'flight-check', 'management-kpis', 'runway-history', 'alarm-history'],
    actions: ['flight-check', 'comment-operation'],
    summary: 'Schnelle Betriebslage, Flugzeiten, Prognose und Warnungsgrund ohne technische Detailbearbeitung.'
  },
  Controlling: {
    pages: ['dashboard', 'history'],
    sections: ['overview-status', 'runway-status', 'forecast', 'weather-data', 'runway-map', 'risk-trend', 'flight-check', 'management-kpis', 'measurement-history', 'runway-history', 'alarm-history'],
    actions: ['view-report', 'export-report'],
    summary: 'Kennzahlen, Sperrzeiten, Fehlalarme und Kostenbetrachtung ohne operative Bedienung.'
  },
  Luftfahrtbehörde: {
    pages: ['history', 'settings'],
    sections: ['measurement-history', 'sensor-history', 'runway-history', 'alarm-history', 'compliance'],
    actions: ['view-report', 'export-report'],
    summary: 'Nachweis- und Kontrollsicht mit Leserechten, Auditdaten und Entscheidungsprotokollen.'
  },
  Entwicklungsteam: {
    pages: ['dashboard', 'sensors', 'history', 'settings'],
    sections: ['overview-status', 'runway-status', 'forecast', 'weather-data', 'runway-map', 'risk-trend', 'flight-check', 'management-kpis', 'sensor-map', 'sensor-defects', 'sensor-audit', 'sensor-details', 'measurement-history', 'sensor-history', 'runway-history', 'alarm-history', 'compliance', 'technical-settings', 'alarm-logic', 'sensor-admin', 'api-backend', 'roles-admin', 'system-status'],
    actions: ['ack-warning', 'flight-check', 'runway-state', 'document-action', 'document-decision', 'comment-operation', 'view-report', 'export-report', 'sensor-fix', 'add-sensor', 'edit-settings', 'save-logic', 'register-node', 'test-api', 'manage-roles', 'run-analysis'],
    summary: 'Vollzugriff für Entwicklung, Tests, Analyse, Konfiguration und technische Fehlersuche.'
  },
  Sicherheitsabteilung: {
    pages: ['dashboard', 'history', 'settings'],
    sections: ['overview-status', 'runway-status', 'forecast', 'weather-data', 'runway-map', 'risk-trend', 'flight-check', 'management-kpis', 'measurement-history', 'runway-history', 'alarm-history', 'alarm-logic', 'compliance'],
    actions: ['ack-warning', 'document-decision', 'runway-state', 'export-report'],
    summary: 'Risikobewertung, Alarmgründe und dokumentierte Entscheidungen ohne technische Admin-Funktionen.'
  }
};

function getStoredProfile() {
  return profileChoices.find((profile) => profile.name === localStorage.getItem('selectedProfile')) || profileChoices.find((profile) => profile.name === 'Fluglotsen') || profileChoices[0];
}

function getPageKey() {
  const fileName = window.location.pathname.split('/').pop() || 'dashboard.html';
  if (fileName.includes('start') || fileName.includes('index')) return 'start';
  if (fileName.includes('dashboard') || fileName.includes('Design')) return 'dashboard';
  if (fileName.includes('sensor')) return 'sensors';
  if (fileName.includes('history')) return 'history';
  if (fileName.includes('settings')) return 'settings';
  if (fileName.includes('alarm')) return 'history';
  return 'dashboard';
}

function getPageUrl(pageKey) {
  return {
    dashboard: 'dashboard.html',
    sensors: 'sensors.html',
    history: 'history.html',
    settings: 'settings.html'
  }[pageKey] || 'dashboard.html';
}

function getNavKey(element) {
  const route = getRoute(element);
  if (route?.includes('dashboard')) return 'dashboard';
  if (route?.includes('sensor')) return 'sensors';
  if (route?.includes('history')) return 'history';
  if (route?.includes('settings')) return 'settings';
  return null;
}

function includesAny(ruleValues, requiredValues) {
  return requiredValues.some((value) => ruleValues.includes(value));
}

function getRoleRule(profileName) {
  return roleRules[profileName] || roleRules.IT;
}

function ensureRoleSummary(profile, rule) {
  const contentRoot = document.querySelector('main > div[class*="p-md"], main > div[class*="overflow-y-auto"], main');
  if (!contentRoot) return;

  let summary = document.querySelector('[data-role-summary]');
  if (!summary) {
    summary = document.createElement('section');
    summary.setAttribute('data-role-summary', '');
    summary.className = 'bg-surface-container-low border border-outline-variant p-md rounded-lg';
    contentRoot.prepend(summary);
  }

  summary.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-sm">
      <div>
        <p class="font-label-caps text-label-caps text-secondary">Rollenbasierte Ansicht</p>
        <p class="text-sm text-on-surface-variant mt-xs">${rule.summary}</p>
      </div>
      <span class="inline-flex items-center gap-xs rounded-lg border border-outline-variant bg-surface-container px-sm py-xs text-xs font-bold text-on-surface">
        <span class="material-symbols-outlined text-sm">${profile.icon}</span>${profile.name}
      </span>
    </div>
  `;
}

function applyRoleNavigation(rule) {
  document.querySelectorAll('nav a').forEach((link) => {
    const navKey = getNavKey(link);
    if (!navKey) return;

    const isAllowed = rule.pages.includes(navKey);
    const container = link.closest('li') || link;
    container.classList.toggle('hidden', !isAllowed);
    link.setAttribute('aria-hidden', String(!isAllowed));
    link.tabIndex = isAllowed ? 0 : -1;
  });

  document.querySelectorAll('[data-mobile-main-nav]').forEach((nav) => {
    const visibleLinks = [...nav.querySelectorAll('a')].filter((link) => !link.classList.contains('hidden'));
    nav.style.gridTemplateColumns = `repeat(${Math.max(visibleLinks.length, 1)}, minmax(0, 1fr))`;
  });
}

function applyRoleSections(rule) {
  document.querySelectorAll('[data-role-section]').forEach((section) => {
    const requiredSections = section.dataset.roleSection.split(/\s+/).filter(Boolean);
    const isAllowed = includesAny(rule.sections, requiredSections);
    section.classList.toggle('hidden', !isAllowed);
    section.setAttribute('aria-hidden', String(!isAllowed));
  });
}

function applyRoleActions(rule) {
  document.querySelectorAll('[data-role-action]').forEach((element) => {
    const requiredActions = element.dataset.roleAction.split(/\s+/).filter(Boolean);
    const isAllowed = includesAny(rule.actions, requiredActions);

    element.disabled = !isAllowed;
    element.classList.toggle('opacity-40', !isAllowed);
    element.classList.toggle('cursor-not-allowed', !isAllowed);
    element.title = isAllowed ? '' : 'Für dieses Profil gesperrt';
    element.setAttribute('aria-disabled', String(!isAllowed));
  });
}

function roleAllowsAction(element, profile = getStoredProfile()) {
  const requiredActions = element.dataset.roleAction?.split(/\s+/).filter(Boolean) || [];
  return !requiredActions.length || includesAny(getRoleRule(profile.name).actions, requiredActions);
}

function applyRoleAccess(profile = getStoredProfile()) {
  const rule = getRoleRule(profile.name);
  const pageKey = getPageKey();

  if (pageKey === 'start') return;

  if (!rule.pages.includes(pageKey)) {
    window.location.href = getPageUrl(rule.pages[0]);
    return;
  }

  ensureRoleSummary(profile, rule);
  applyRoleNavigation(rule);
  applyRoleSections(rule);
  applyRoleActions(rule);
}

window.applyRoleAccess = applyRoleAccess;

function initStartScreenShortcut() {
  if (getPageKey() === 'start' || document.querySelector('[data-start-screen-shortcut]')) return;

  const headerRight = document.querySelector('header > div:last-child');
  if (!headerRight) return;

  const button = document.createElement('a');
  button.href = 'start.html';
  button.setAttribute('data-start-screen-shortcut', '');
  button.className = 'w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer active:scale-95 text-on-surface-variant';
  button.title = 'Zum Startbildschirm';
  button.setAttribute('aria-label', 'Zum Startbildschirm');
  button.innerHTML = '<span class="material-symbols-outlined">desktop_windows</span>';

  headerRight.prepend(button);
}

function requestProfilePassword(profile) {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 flex items-center justify-center bg-scrim/75 px-md';
    modal.style.zIndex = '9999';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <form class="w-full max-w-md rounded-xl border border-outline-variant bg-surface-container shadow-2xl overflow-hidden" data-password-form>
        <div class="flex items-center justify-between border-b border-outline-variant p-md">
          <div>
            <p class="font-label-caps text-label-caps text-secondary">Geschütztes Profil</p>
            <h2 class="font-headline-sm text-headline-sm text-on-surface">${profile.name}</h2>
          </div>
          <button class="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-surface-container-highest text-on-surface-variant" type="button" data-password-cancel aria-label="Abbrechen">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-md space-y-md">
          <label class="block">
            <span class="font-label-caps text-label-caps text-on-surface-variant">Passwort</span>
            <input class="mt-xs w-full rounded-lg border border-outline-variant bg-surface px-md py-sm text-on-surface outline-none focus:border-secondary" type="password" autocomplete="off" data-password-input>
          </label>
          <p class="hidden rounded-lg border border-error/30 bg-error-container/30 px-sm py-xs text-sm text-error" data-password-error>Falsches Passwort. Bitte erneut versuchen.</p>
          <button class="w-full rounded-lg bg-secondary px-md py-sm font-bold text-on-secondary hover:brightness-110 active:scale-[0.98] transition-all" type="submit">Bestätigen</button>
        </div>
      </form>
    `;

    const form = modal.querySelector('[data-password-form]');
    const input = modal.querySelector('[data-password-input]');
    const cancelButton = modal.querySelector('[data-password-cancel]');
    const error = modal.querySelector('[data-password-error]');

    function close(result) {
      modal.remove();
      resolve(result);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (input.value.trim() === profile.name) {
        close(true);
        return;
      }
      error.classList.remove('hidden');
      input.select();
      input.focus();
    });

    cancelButton.addEventListener('click', () => close(false));
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close(false);
    });
    modal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close(false);
    });

    document.body.appendChild(modal);
    input.focus();
  });
}

function createProfileModal(onSelect) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-scrim/70 px-md';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="w-full max-w-4xl rounded-xl border border-outline-variant bg-surface-container shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between border-b border-outline-variant p-md">
        <div>
          <p class="font-label-caps text-label-caps text-primary">Profil wechseln</p>
          <h2 class="font-headline-md text-headline-md text-on-surface">Rolle auswählen</h2>
        </div>
        <button class="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-surface-container-highest text-on-surface-variant" type="button" data-profile-close aria-label="Schließen">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sm p-md" data-profile-options></div>
    </div>
  `;

  const closeButton = modal.querySelector('[data-profile-close]');
  const optionGrid = modal.querySelector('[data-profile-options]');

  profileChoices.forEach((profile) => {
    const button = document.createElement('button');
    button.className = 'rounded-lg border border-outline-variant bg-surface p-md text-left hover:bg-surface-variant active:scale-[0.98] transition-all';
    button.type = 'button';
    button.innerHTML = `
      <img class="w-20 h-20 rounded-xl border border-outline-variant mb-sm object-cover bg-surface-container-high" alt="${profile.name} Profilbild" src="${profile.image}">
      <div class="flex items-center gap-xs text-on-surface">
        <span class="material-symbols-outlined text-sm">${profile.icon}</span>
        <span class="font-bold text-sm">${profile.name}</span>
      </div>
      <p class="text-[11px] text-on-surface-variant mt-xs">${profile.subtitle}</p>
    `;
    button.addEventListener('click', async () => {
      if (!await requestProfilePassword(profile)) return;
      onSelect(profile);
      closeProfileModal(modal);
    });
    optionGrid.appendChild(button);
  });

  closeButton.addEventListener('click', () => closeProfileModal(modal));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeProfileModal(modal);
  });

  document.body.appendChild(modal);
  return modal;
}

function openProfileModal(modal) {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProfileModal(modal) {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function initSharedProfiles() {
  const triggers = document.querySelectorAll('[data-profile-trigger]');
  if (!triggers.length) return;

  let modal;

  function applyProfile(profile) {
    localStorage.setItem('selectedProfile', profile.name);
    triggers.forEach((trigger) => {
      const image = trigger.querySelector('[data-profile-image]');
      const name = trigger.querySelector('[data-profile-name]');

      if (image) {
        image.src = profile.image;
        image.alt = `${profile.name} Profil`;
      }

      if (name) {
        name.textContent = profile.name;
      }
    });
    applyRoleAccess(profile);
    window.dispatchEvent(new CustomEvent('profile-changed', { detail: profile }));
  }

  triggers.forEach((trigger) => {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.addEventListener('click', () => {
      if (!modal) modal = createProfileModal(applyProfile);
      openProfileModal(modal);
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!modal) modal = createProfileModal(applyProfile);
        openProfileModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal) closeProfileModal(modal);
  });

  applyProfile(getStoredProfile());
}

document.addEventListener('DOMContentLoaded', () => {
  initResponsiveShell();
  initStartScreenShortcut();

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

  initSharedProfiles();
  applyRoleAccess(getStoredProfile());

  document.addEventListener('click', (event) => {
    const restrictedElement = event.target.closest('[data-role-action]');
    if (!restrictedElement || roleAllowsAction(restrictedElement)) return;

    event.preventDefault();
    event.stopPropagation();
    applyRoleAccess(getStoredProfile());
  }, true);

  document.addEventListener('submit', (event) => {
    const restrictedSubmit = event.submitter?.closest('[data-role-action]');
    if (!restrictedSubmit || roleAllowsAction(restrictedSubmit)) return;

    event.preventDefault();
    event.stopPropagation();
    applyRoleAccess(getStoredProfile());
  }, true);
});
