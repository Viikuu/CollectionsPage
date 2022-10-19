const host = "http://localhost:3000";

const auth = "/api/auth";
const users = "/api/users"

const collection = "/api/collections";

const items = "/api/items";
const comments = "/api/comments";


const registerRoute = `${host + auth}/register`;
const loginRoute = `${host + auth}/login`;
const logoutRoute = `${host + auth}/logout`;

const allUsersRoute = `${host + users}/allusers`;
const blockUsersRoute = `${host + users}/blockusers`;
const unBlockUsersRoute = `${host + users}/unblockusers`;
const deleteUsersRoute = `${host + users}/`;
const currentlyLoggedUserRoute = `${host + users}/`;



export {
	host,
	registerRoute,
	loginRoute,
	logoutRoute,
	allUsersRoute,
	deleteUsersRoute,
	blockUsersRoute,
	currentlyLoggedUserRoute,
	unBlockUsersRoute,
};
