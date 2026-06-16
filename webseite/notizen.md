Funktionale Anforderungen Frontend
FF-01 Dashboard zur Anzeige der Messdaten
Das Frontend muss aktuelle Wetter- und Sensordaten übersichtlich darstellen.
Anzuzeigen:
•	Temperatur
•	Feuchtigkeit
•	Niederschlag
•	Taupunkt
•	Luftdruck
•	Niederschlagsart
Warum?
Winterdienst und Fluglotsen benötigen die Messwerte zur Beurteilung der aktuellen Situation.
 
FF-02 Anzeige des Vereisungsrisikos
Das Frontend muss das vom Backend berechnete Vereisungsrisiko anzeigen.
Mögliche Darstellung:
•	Grün = gering
•	Gelb = mittel
•	Rot = hoch
Warum?
Der Nutzer soll das Risiko sofort erkennen können, ohne einzelne Messwerte interpretieren zu müssen.
 
FF-03 Alarmierungsfunktion
Das Frontend muss Warnmeldungen bei kritischen Vereisungsrisiken ausgeben.
Anforderungen:
•	Visuelle Warnung
•	Akustische Warnung
•	Priorisierung der Warnstufe
Warum?
Die Bedienbarkeit fordert, dass Alarme auf mehreren Sinnen wahrnehmbar sind. 
 
FF-04 Anzeige der 30-Minuten-Prognose
Das Frontend muss die vom Backend berechnete Vereisungsprognose für mindestens 30 Minuten anzeigen.
Warum?
Fluglotsen und Winterdienst benötigen Vorlaufzeit zur Planung ihrer Maßnahmen. 
 
FF-05 Sensorstatus anzeigen
Das Frontend muss den Zustand aller Sensoren anzeigen.
Status:
•	Online
•	Offline
•	Fehlerhaft
•	Wartung
Warum?
Defekte Sensoren müssen schnell erkannt werden. 
 
FF-06 Historische Daten visualisieren
Das Frontend muss gespeicherte Messdaten grafisch darstellen.
Mögliche Ansichten:
•	Temperaturverlauf
•	Feuchtigkeitsverlauf
•	Vereisungsrisiko im Zeitverlauf
Warum?
Unterstützt Analyse und Nachvollziehbarkeit von Entscheidungen. 
 
FF-07 Alarmhistorie anzeigen
Das Frontend muss vergangene Warnungen anzeigen.
Informationen:
•	Zeitstempel
•	Warnstufe
•	Bahn
•	Ursache
Warum?
Die Luftfahrtbehörde fordert eine nachvollziehbare Protokollierung. 
 
FF-08 Rollenbasierte Benutzeroberfläche
Das Frontend muss unterschiedliche Benutzerrollen unterstützen.
Beispiele:
•	Fluglotse
•	Winterdienst
•	IT
•	Sicherheitsabteilung
Warum?
Nicht jeder Benutzer darf alle Informationen oder Einstellungen sehen. 
 
FF-09 Konfigurationsoberfläche
Das Frontend muss eine Oberfläche zur Anpassung von Warnschwellen bereitstellen.
Warum?
Das System soll konfigurierbar und an neue meteorologische Erkenntnisse anpassbar sein. 
 
FF-10 Log-Ansicht
Das Frontend muss Systemereignisse und Alarmprotokolle anzeigen.
Warum?
Unterstützt Fehlersuche, Audits und regulatorische Nachweise.


