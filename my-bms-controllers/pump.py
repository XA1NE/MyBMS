###
# This is a class to control a pump.
# It is a subclass of the Chiller class.
# 
# @author K. Kawka
# @version 1.0
###

# Import Firebase Real-Time Database API
from firebaseconfig import *

import time

class Pump:

    # Initialize the Pump
    def __init__(self, pumpNum:int):
        self.__pumpName = f"Pump-{pumpNum}"
        self.__chillerName = f"Chiller-{pumpNum}"
        self.__pumpSpeed = 0 # 0hz or 50hz
        self.__mode = 0
        self.__runningState = 0
        self.__heartbeat = 0
    
    # Getter functions (internal values)
    @property
    def pumpName(self):
        return self.__pumpName
    @property
    def chillerName(self):
        return self.__chillerName

    # Getter functions (external values)
    def __getPumpVals(self):
        firebaseDataPump = db.child(self.__pumpName).get()
        return firebaseDataPump.val()

    def __getOtherPumpVals(self, otherPumpName:str):
        firebaseDataOtherPump = db.child(otherPumpName).get()
        return firebaseDataOtherPump.val()

    def __getChillerVals(self):
        firebaseDataChiller = db.child(self.__chillerName).get()
        return firebaseDataChiller.val()

    def __getOtherChillerVals(self, otherChillerName:str):
        firebaseDataOtherChiller = db.child(otherChillerName).get()
        return firebaseDataOtherChiller.val()

    ###
    # Main method to run the Pump.
    # This method is called by the main program (simulator.py).
    # It is responsible for updating the state of the Pump.
    #
    # @param otherPumpName: The name of the other Pump (Pump-1 = Primary, Pump-2 = Secondary).
    # @param otherChillerName: The name of the other Chiller (Chiller-1 = Primary, Chiller-2 = Secondary).
    # @return: None
    ###
    def run(self, otherPumpName:str, otherChillerName:str):
        pumpVals = self.__getPumpVals()
        otherPumpValues = self.__getOtherPumpVals(otherPumpName)
        chillerValues = self.__getChillerVals()
        otherChillerValues = self.__getOtherChillerVals(otherChillerName)

        self.__heartbeat = time.time()

        if(pumpVals['Mode'] == 0):
            self.__mode = 0
            self.__runningState = 0
            self.__pumpSpeed = 0
        
        elif(pumpVals['Mode'] == 1):
            self.__mode = 1
            self.__runningState = 1
            self.__pumpSpeed = 50

        elif(pumpVals['Mode'] == 2):
            self.__mode = 2

            if(chillerValues['Running State'] == 1):
                self.__runningState = 1
                self.__pumpSpeed = 50

            elif(chillerValues['Running State'] == 2):
                self.__runningState = 2
                self.__pumpSpeed = 0
            
            elif(chillerValues['Running State'] == 0):
                self.__runningState = 0
                self.__pumpSpeed = 0

            if(otherChillerValues['Running State'] == 1):
                if(otherPumpValues['Running State'] == 0):
                    self.__runningState = 1
                    self.__pumpSpeed = 50

        props = {
            'Pump Speed' : self.__pumpSpeed,
            'Mode' : self.__mode,
            'Running State' : self.__runningState,
        }

        # Update the Pump properties in the database
        db.child(self.__pumpName).update(props)

        # Update the Pump heartbeat in the Firebase Realtime Database
        db.child('Heartbeats').update({f"{self.__pumpName}-Heartbeat" : self.__heartbeat})

        print(f"*** {self.__pumpName} running... ***")
        print("Pump Mode: ", self.__mode)
        print("Pump Running State: ", self.__runningState)
        print(f"*** {self.__pumpName} updated. ***")
        print("\n")