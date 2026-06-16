# Test Zwecke

class Sensor():
    
    def __init__(self, id):
        self.id = id
    
    # Gibt zurück ob der Sensor Status aktiv ist
    def isActive(self) -> bool:
        return True
    
    # Gibt alle Sensoren zurück
    def all() -> list:
        return [
            Sensor(1),
            Sensor(2),
            Sensor(3)
        ]