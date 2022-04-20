import { getDatabase, ref, get, set, onValue } from 'firebase/database';

const deviceStore = {
    retrieveDevice: async (deviceName, callback) => {
		const db = getDatabase();
		const tableRef = ref(db, deviceName);
		return await get(tableRef).then(callback);
	},
	retrieveAllDevices: async (callback) => {
		const db = getDatabase();
		const tableRef = ref(db);
		return await get(tableRef).then(callback);
    },
    updateDevice: async (deviceName, key, newValue) => {
        const db = getDatabase();
		const tableRef = ref(db, `${deviceName}/${key}`);
        return await set(tableRef, newValue);
    },
    onUpdateDevice: async (deviceName, callback) => {
		const db = getDatabase();
        const tableRef = ref(db, deviceName);
        return await onValue(tableRef, callback);
    }
}

export default deviceStore