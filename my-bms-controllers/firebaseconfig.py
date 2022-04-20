import pyrebase

firebaseConfig = {
    "apiKey": "AIzaSyA9a4NLpHV2u5xTCSn3R-sTHCLtE0HwNos",
    "authDomain": "mybms-6eda6.firebaseapp.com",
    "databaseURL": "https://mybms-6eda6-default-rtdb.firebaseio.com",
    "storageBucket": "mybms-6eda6.appspot.com",
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()