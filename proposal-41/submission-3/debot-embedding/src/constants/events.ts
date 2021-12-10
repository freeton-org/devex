const DEBOT_PREFIX = 'DEBOT_';
const CLIENT_PREFIX = 'CLIENT_';
const WALLET_PREFIX = 'WALLET_';

export const EVENTS = {
	DEBOT: {
		RUN_FAILED: `${DEBOT_PREFIX}RUN_FAILED`,
		FUNCTION_CALLED: `${DEBOT_PREFIX}FUNCTION_CALLED`,
		FUNCTION_EXECUTED: `${DEBOT_PREFIX}FUNCTION_EXECUTED`,
		FUNCTION_EXECUTION_FAILED: `${DEBOT_PREFIX}FUNCTION_EXECUTION_FAILED`,
		SIGNING_BOX_REGISTRATION_CALLED: `${DEBOT_PREFIX}SIGNING_BOX_REGISTRATION_CALLED`,
		SIGNING_BOX_REGISTERED: `${CLIENT_PREFIX}SIGNING_BOX_REGISTERED`,
		SIGNING_BOX_REGISTRATION_FAILED: `${CLIENT_PREFIX}SIGNING_BOX_REGISTRATION_FAILED`,
		SIGNING_BOX_CALLED: `${DEBOT_PREFIX}SIGNING_BOX_CALLED`,
		APPROVE_CALLED: `${DEBOT_PREFIX}APPROVE_CALLED`,
	},
	WALLET: {
		CONNECTED: `${WALLET_PREFIX}CONNECTED`,
		CONNECTION_ERROR: `${WALLET_PREFIX}CONNECTION_ERROR`,
		PERMISSIONS_CHANGED: `${WALLET_PREFIX}PERMISSIONS_CHANGED`,
		DISCONNECTED: `${WALLET_PREFIX}DISCONNECTED`,
	},
	CLIENT: {
		EXECUTE_FUNCTION: `${CLIENT_PREFIX}EXECUTE_FUNCTION`,
		EXECUTE_APPROVE: `${CLIENT_PREFIX}EXECUTE_APPROVE`,
		REGISTER_SIGNING_BOX: `${CLIENT_PREFIX}REGISTER_SIGNING_BOX`,
	},
}