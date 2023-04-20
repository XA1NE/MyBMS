/**
 * IoT device data store
 * 
 * @author XA1NE
 * @params deviceName - device name
 * 
 */

import { getDatabase, ref, get, set, onValue } from 'firebase/database';

const deviceStore = {

    // Function gets a single device data from the database
    retrieveDevice: async (deviceName, callback) => {
		const db = getDatabase();
		const tableRef = ref(db, deviceName);
		return await get(tableRef).then(callback);
	},

    // Function gets all the devices data from the database
	retrieveAllDevices: async (callback) => {
		const db = getDatabase();
		const tableRef = ref(db);
		return await get(tableRef).then(callback);
    },

    // Function updates device data in the database
    updateDevice: async (deviceName, key, newValue) => {
        const db = getDatabase();
		const tableRef = ref(db, `${deviceName}/${key}`);
        return await set(tableRef, newValue);
    },

    // When value changes in the device data in the database this function is called
    onUpdateDevice: async (deviceName, callback) => {
		const db = getDatabase();
        const tableRef = ref(db, deviceName);
        return await onValue(tableRef, callback);
    }
}

export default deviceStore