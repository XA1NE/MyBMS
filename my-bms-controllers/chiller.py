###
#
# This is a class that creates and controls a chiller unit.
#
# @author: XA1NE
#
###

# Import Firebase Real-Time Database API
from firebaseconfig import *

import time

class Chiller:

    # Initialize the Chiller
    def __init__(self, chillerNum:int):
        self.__chillerName = f"Chiller-{chillerNum}"
        self.__tempSensorSimulatorName = f"TempSensorSimulator-{chillerNum}"
        self.__mode = 0
        self.__runningState = 0
        self.__flowTemp = 0
        self.__returnTemp = 0
        
    # Getter function for the Chiller name
    @property
    def chillerName(self):
        return self.__chillerName

    # Getter functions (external values)
    def __getChillerVals(self):
        firebaseDataChiller = db.child(self.__chillerName).get()
        return firebaseDataChiller.val()

    def __getOtherChillerVals(self, otherChillerName:str):
        firebaseDataOtherChiller = db.child(otherChillerName).get()
        return firebaseDataOtherChiller.val()
    
    def __getTempSimDataVals(self):
        firebaseDataTemperatureSimData = db.child(self.__tempSensorSimulatorName).get()
        return firebaseDataTemperatureSimData.val()
    
    ###
    # Main method to run the Chiller.
    # This method is called by the main program (simulator.py).
    # It is responsible for updating the state of the Chiller.
    # @param otherChillerName: The name of the other Chiller (Chiller-1 = Primary, Chiller-2 = Secondary).
    # @return: None
    ###
    def run(self, otherChillerName:str):
        temperatureSimDataVals = self.__getTempSimDataVals()
        self.__flowTemp = temperatureSimDataVals['Flow Temperature']
        self.__returnTemp = temperatureSimDataVals['Return Temperature']

        currentChillerVals = self.__getChillerVals()
        otherChillerVals = self.__getOtherChillerVals(otherChillerName)

        self.__heartbeat = time.time()

        if(currentChillerVals['Mode'] == 0):
            self.__mode = 0
            self.__runningState = 0

        elif(currentChillerVals['Mode'] == 1):
            self.__mode = 1
            self.__runningState = 1

        elif(currentChillerVals['Mode'] == 2):
            self.__mode = 2

            if(otherChillerVals['Mode'] == 2 and self.chillerName == 'Chiller-1'):
                self.__runningState = 1
            else:
                self.__runningState = 2

            if (otherChillerVals['Mode'] == 0):
                self.__runningState = 1

            if (otherChillerVals['Mode'] == 1):
                self.__runningState = 2

            if(self.__flowTemp > 6 or self.__returnTemp > 11):
                self.__runningState = 1
            
        # Properties of the Chiller
        props = {
            'Mode' : self.__mode,
            'Running State' : self.__runningState,
            'Flow Temperature' : self.__flowTemp,
            'Return Temperature' : self.__returnTemp
        }

        # Update the Chiller state in the Firebase Realtime Database
        db.child(self.__chillerName).update(props)

        # Update the Chiller heartbeat in the Firebase Realtime Database
        db.child('Heartbeats').update({f"{self.__chillerName}-Heartbeat" : self.__heartbeat})

        # Print the Chiller state to the console
        print(f"*** {self.__chillerName} running... ***")
        print("Mode", self.__mode)
        print("Running State", self.__runningState)
        print(f"*** {self.__chillerName} updated. ***")
        print("\n")