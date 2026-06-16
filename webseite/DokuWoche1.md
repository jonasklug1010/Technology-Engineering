# Frontend-Entscheidungen – Vereisungserkennung Flughafen Coburg

## Aufgabe des Frontends

Das Frontend zeigt die Vereisungslage des Flugplatzes verständlich an. Es dient nicht zur automatischen Freigabe der Start- oder Landebahn, sondern nur zur Visualisierung der Daten.

## Hauptziel

Nutzer:innen sollen auf einen Blick erkennen:

* Wie hoch ist das aktuelle Vereisungsrisiko?
* Welche Messwerte sind kritisch?
* Wie sieht die 30-Minuten-Prognose aus?
* Funktionieren die Sensoren?
* Gibt es aktuelle Alarmierungen?

## Aufbau des Frontends

Das Frontend besteht aus drei Tabs:

1. Übersicht
2. Historie
3. Einstellungen

## Tabs 
1. Dashboard
    - aktuelle Frost (+ 30 min Prognose)
    - Systemstatus
    - aktuelle Messwerte
    - Alarme (Kurzvorschau)
    - alle Runways (Oberflächen Temp)
    - (Risikotrent)
2. Sensoren
    - Alle letzen Alamrs (History)
    - Wo sind die
    - welcher statur
3. Settings (Nur für Prototyp)
    - Konfigurierung der Sensoren

## Tab 1: Übersicht/Dashboard

Die Übersicht ist der wichtigste Bereich.

Sie enthält:

* großes Ampelsystem für das aktuelle Vereisungsrisiko
* aktuelle Sensorwerte
* 30-Minuten-Prognose
* Alarmierungen
* Sensorstatus
* Systemstatus
* Risikotrend

Die Übersicht soll so aufgebaut sein, dass die wichtigsten Informationen innerhalb weniger Sekunden erfassbar sind.

## Ampelsystem

Das Ampelsystem ist die zentrale Anzeige.

* Grün: kein Vereisungsrisiko
* Gelb: erhöhtes Risiko
* Rot: hohes Vereisungsrisiko
* Grau: Daten unsicher, veraltet oder Sensorfehler

Wichtig: Wenn Sensordaten fehlen oder veraltet sind, darf das System nicht einfach grün anzeigen.

## Angezeigte Werte auf der Übersicht

Auf der Übersicht werden diese Werte angezeigt:

* Oberflächentemperatur
* Lufttemperatur
* Luftfeuchtigkeit
* Oberflächenfeuchte
* Taupunkt
* Niederschlagsart
* Windgeschwindigkeit

Luftdruck wird nicht angezeigt, da er für die direkte Vereisungserkennung im Prototyp nicht zentral ist.

## 30-Minuten-Prognose

Die 30-Minuten-Prognose soll auf der Übersicht sichtbar sein.

Sie basiert auf externen Wetterdaten aus dem Internet und wird in das Ampelsystem übersetzt.

Beispielanzeige:

* Prognose in 30 Minuten: erhöhtes Risiko
* Sicherheit der Prognose: mittel

Die Prognose soll sichtbar sein, aber nicht dominanter als das aktuelle Risiko.

## Alarmierungen

Das Frontend zeigt Alarmierungen an, zum Beispiel:

* Vereisungsrisiko hoch
* Prognose: erhöhtes Risiko
* Sensordaten veraltet
* Sensor ausgefallen
* unplausible Messwerte

Alarme sollen deutlich sichtbar sein, aber nicht die komplette Oberfläche überladen.

## Sensorstatus

Jeder wichtige Sensor bekommt einen Status:

* OK
* verzögert
* ausgefallen
* unplausibel

Der Sensorstatus soll auf der Übersicht sichtbar sein, weil defekte Sensoren ein Sicherheitsrisiko darstellen.

## Tab 2: Historie

Die Historie ist nicht auf den ersten Blick nötig, aber abrufbar.

Sie zeigt:

* vergangene Messwerte
* Verlauf der Ampelstufen
* vergangene Alarmierungen
* Sensorfehler
* Datenverzögerungen

Ziel der Historie ist Nachvollziehbarkeit.

## Tab 3: Einstellungen

In den Einstellungen können für den Prototyp Grenzwerte angepasst werden.

Mögliche Einstellungen:

* Grenzwert Oberflächentemperatur
* Grenzwert Luftfeuchtigkeit
* Grenzwert Taupunkt-Abstand
* Aktualisierungsintervall
* Aktivieren/deaktivieren einzelner Sensoren
* Testmodus für Alarme

Wichtig: Die Einstellungen sind für den Prototyp sinnvoll, wären im echten Betrieb aber nur für berechtigte Personen erlaubt.

## Tab 4:


## Design-Prinzipien

Das Frontend soll:

* klar und schnell verständlich sein
* kritische Zustände deutlich hervorheben
* aktuelle Lage wichtiger darstellen als Historie
* Prognosen sichtbar, aber weniger dominant zeigen
* Sensorfehler nicht verstecken
* keine falsche Sicherheit erzeugen

## Offene Aufgaben für das Frontend-Team

* Wireframe für Übersicht erstellen
* Wireframe für Historie erstellen
* Wireframe für Einstellungen erstellen
* festlegen, welche Werte als Karten angezeigt werden
* festlegen, wie Alarmierungen aussehen
* festlegen, wie Sensorfehler dargestellt werden
* festlegen, wie die 30-Minuten-Prognose visuell dargestellt wird
* Datenstruktur mit Backend-Team abstimmen
* Beispielwerte für Demo definieren

## Gruppenbesprechung
- Welche Teile des Gesamtprojekts werden von uns gemacht:
    - Reiter: Dashboard-Übersicht | Historie | Einstellungen
    - Einbindung des Backends inkl. der Sensorwerte
    
- Gruppenregeln:


- Arbeitsabläufe


## Arbeitsbereich
# To do
- Abgleich, ob Liveanzeige durch Sensoren erreicht werden können 
- Wurde bei dem UI jeder stake holder mit rein genommen?
