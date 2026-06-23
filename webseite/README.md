# VLP Coburg EDQC - Vereisungsmonitoring

Browserbasierte Weboberfläche zur Visualisierung eines Vereisungs- und Wetterrisikos am Verkehrslandeplatz Coburg-Brandensteinsebene (`EDQC`). Die Anwendung stellt Wetterdaten, Landebahnzustand, Sensorstatus, Prognosen, Alarmhistorie und rollenabhängige Ansichten in einem operativen Dashboard dar.

Die Oberfläche ist ein statischer HTML/CSS/JavaScript-Prototyp mit einem kleinen Python-Webserver. Sie dient zur Demonstration eines möglichen Monitoring-Systems und ersetzt keine reale Freigabeentscheidung für Start- oder Landebahnen.

## Projektziel

Das Projekt zeigt, wie verschiedene Nutzergruppen am Flugplatz eine gemeinsame Lageansicht nutzen können:

- Aktuelle Vereisungs- und Wetterlage anzeigen
- Prognostizierte Wettergefahren sichtbar machen
- Sensoren und technische Zustände prüfen
- Alarm- und Messhistorie nachvollziehen
- Rollenabhängige Ansichten und Rechte simulieren
- Entscheidungen dokumentierbar und nachvollziehbar machen

Wichtig: Die Anwendung gibt keine automatische Start- oder Landebahnfreigabe. Die finale Entscheidung bleibt immer bei einer autorisierten Person.

## Starten

Voraussetzung ist Python 3. Es werden keine zusätzlichen Python-Pakete für den Webserver benötigt.

Im Ordner `webseite` starten:

```bash
python3 app.py
```

Danach im Browser öffnen:

```text
http://127.0.0.1:8000/start.html
```

Wenn `/` oder `/index.html` aufgerufen wird, leitet `app.py` automatisch auf `start.html` um.

## Bedienung

Beim Start erscheint ein Profilbildschirm. Dort wird ein Profil ausgewählt und anschließend entsperrt.

Für den Prototyp gilt:

```text
Das Passwort entspricht dem Profilnamen.
```

Beispiele:

- Profil `Fluglotsen` -> Passwort `Fluglotsen`
- Profil `IT` -> Passwort `IT`
- Profil `Winterdienst` -> Passwort `Winterdienst`

Nach dem Entsperren öffnet sich abhängig vom Profil die passende Ansicht. Das gewählte Profil wird im Browser über `localStorage` gespeichert.

## Seitenübersicht

### `start.html`

Startbildschirm mit Profilauswahl. Hier werden die Rollen sichtbar, inklusive Profilbild, kurzer Beschreibung und Passwortfeld.

### `dashboard.html`

Zentrale Lageansicht. Enthält unter anderem:

- Betriebsübersicht mit Statuskacheln
- aktuelle Vereisungslage
- Wettergefahr in der Prognose
- Landebahnstatus mit Ampellogik
- Wetterdaten
- Regenradar für den Bereich Coburg / EDQC
- Startbahnübersicht `RWY 12/30`
- Risikotrend als Diagramm
- Flugplan-Sicherheitscheck
- Warnungs- und Quittierungsfunktionen

### `sensors.html`

Technische Sensoransicht. Enthält:

- geografische Sensorverteilung
- defekte Sensoren
- Sensor-Audit-Liste
- Zustandsmonitor
- Detaildaten und simulierte Messstellen
- Aktion zum Anlegen einer neuen Messstelle

### `history.html`

Historien- und Nachweisansicht. Enthält Messhistorie, Sensorhistorie, Runway-Historie und Alarmhistorie.

### `settings.html`

Systemeinstellungen. Enthält:

- Vereisungslogik
- Schwellenwerte
- installierte Sensoren
- Telemetry-Gateway
- Compliance-/Restriktionsbereich
- Audit-Export

### `alarms.html`

Alarmcenter mit aktuellen und historischen Warnungen. Diese Seite ist weiterhin als eigene Ansicht vorhanden, wird in der Rollenlogik aber teilweise über `history` behandelt.

### `runways.html`

Separate Startbahn-/Betriebszustandsseite. Sie enthält eine detailliertere Sicht auf `RWY 12/30` und Vorfeld/Rollwege.

## Rollen und Rechte

Die Rollensteuerung liegt in `navigation.js`. Dort wird festgelegt, welche Seiten, Abschnitte und Aktionen für ein Profil sichtbar oder bedienbar sind.

Vorhandene Profile:

- `IT`
- `Management`
- `Winterdienst`
- `Fluglotsen`
- `Controlling`
- `Luftfahrtbehörde`
- `Entwicklungsteam`
- `Sicherheitsabteilung`

Die Rollenlogik arbeitet mit drei Ebenen:

- `pages`: Welche Seiten ein Profil öffnen darf
- `sections`: Welche Inhaltsbereiche sichtbar sind
- `actions`: Welche Buttons und Aktionen bedienbar sind

HTML-Elemente können dafür Attribute verwenden:

```html
data-role-section="forecast risk-trend"
data-role-action="ack-warning document-decision"
```

Wenn eine Rolle nicht berechtigt ist, werden Bereiche ausgeblendet oder Aktionen deaktiviert.

## Navigation

Die Navigation wird zentral durch `navigation.js` ergänzt. Das Script:

- erkennt Navigationslinks anhand ihrer Labels und Icons
- setzt Links zu den richtigen HTML-Dateien
- ergänzt eine mobile Navigation
- fügt einen Shortcut zurück zum Startbildschirm ein
- lädt und aktualisiert das gewählte Profil
- wendet die Rollenrechte auf Seiten, Abschnitte und Aktionen an

## Projektstruktur

```text
webseite/
├── app.py
├── start.html
├── dashboard.html
├── sensors.html
├── history.html
├── settings.html
├── alarms.html
├── runways.html
├── navigation.js
├── favicon.svg
├── image.png
├── Design Webseite.html
├── design-system-starter.html
├── assets/
│   └── profiles/
│       ├── it.png
│       ├── management.png
│       ├── winterdienst.png
│       ├── fluglotsen.png
│       ├── controlling.png
│       ├── luftfahrtbehoerde.png
│       ├── entwicklungsteam.png
│       ├── sicherheitsabteilung.png
│       └── profile-contact-sheet.png
└── data/
    ├── sensors.py
    ├── _backend.py
    └── _demo.py
```

## Wichtige Dateien

### `app.py`

Kleiner Python-Webserver auf Basis von `http.server`.

Eigenschaften:

- Host: `127.0.0.1`
- Port: `8000`
- Webroot: Projektordner `webseite`
- `/` und `/index.html` öffnen automatisch `start.html`
- setzt `Cache-Control: no-store`, damit Änderungen beim Entwickeln schneller sichtbar werden

### `navigation.js`

Zentrale JavaScript-Datei für:

- Navigation
- mobile Navigation
- Profilwechsel
- Passwortdialog beim Profilwechsel
- Rollenrechte
- Sichtbarkeit von Abschnitten
- Aktivieren und Deaktivieren von Aktionen

### `data/sensors.py`

Kleiner Test-/Demoansatz für Sensorobjekte. Aktuell liefert `Sensor.all()` beispielhafte Sensoren zurück.

### `data/_backend.py`

Skizze für eine direkte API-Anbindung über `requests`. Diese Datei ist aktuell eher als Entwurf zu verstehen und nicht für die aktive Oberfläche erforderlich.

## Externe Ressourcen

Die Oberfläche lädt einige Ressourcen aus dem Internet:

- TailwindCSS über CDN
- Google Fonts
- Google Material Symbols
- Windy/Regenradar-Einbettung

Ohne Internet funktioniert die Grundnavigation weiterhin, aber Icons, Fonts, Tailwind-CDN und Regenradar können fehlen oder anders aussehen.

## Design

Das Interface verwendet ein dunkles, technisches Design mit:

- grünem Status für sichere Zustände
- gelben Warnhinweisen für beobachtete Risiken
- roten Warnhinweisen für kritische Zustände
- Karten, Tabellen und Diagrammen für operative Lesbarkeit
- responsiver Navigation für Desktop und mobile Ansichten

Die visuelle Richtung ist auf eine Leitstellen-/Monitoring-Oberfläche ausgelegt, nicht auf eine Marketingseite.

## Bekannte Grenzen

Der aktuelle Stand ist ein Prototyp:

- Daten sind überwiegend statisch oder simuliert
- Passwortprüfung ist nur eine Demo-Logik
- Es gibt keine echte Benutzerverwaltung
- Es gibt keine persistente Datenbank
- Sensoren und Backend sind nicht produktiv angebunden
- Wetter- und Radaransicht sind externe Einbettungen
- Entscheidungen und Quittierungen sind nur im Browser simuliert

## Weiterentwicklung

Sinnvolle nächste Schritte:

- echte API für Sensor- und Wetterdaten anbinden
- Passwortlogik durch echte Authentifizierung ersetzen
- Messwerte in einer Datenbank speichern
- Alarmquittierungen persistent dokumentieren
- echte Rollen und Nutzerkonten serverseitig prüfen
- Offline-Fallbacks für Fonts, Icons und Karten einbauen
- Tests für Navigation, Rollenlogik und kritische Workflows ergänzen

## Kurzfassung für die Abgabe

Dieses Projekt ist eine browserbasierte Monitoring-Oberfläche für Vereisungsrisiken am Verkehrslandeplatz Coburg-Brandensteinsebene. Es zeigt aktuelle Wetter- und Sensordaten, prognostizierte Risiken, Landebahnstatus, Alarmhistorie und rollenabhängige Ansichten. Die Anwendung unterstützt unterschiedliche Nutzergruppen wie Winterdienst, Fluglotsen, IT, Management und Aufsicht. Sie dient als Entscheidungsunterstützung und Visualisierung, trifft aber keine automatische Freigabeentscheidung.
