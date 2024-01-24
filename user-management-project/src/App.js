"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const App = () => {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        fetchUsers();
    }, [page]);
    const fetchUsers = async () => {
        try {
            const response = await axios_1.default.get(`/api/users?page=${page}`);
            setUsers(response.data);
        }
        catch (error) {
            console.error('Error fetchign users: ', error);
        }
    };
    const createUser = async () => {
        try {
            await axios_1.default.post('/api/users', { name: 'New User' });
            fetchUsers();
        }
        catch (error) {
            console.error('Error creating user: ', error);
        }
    };
    const removeUser = async (userId) => {
        try {
            await axios_1.default.delete(`/api/users/${userId}`);
            fetchUsers();
        }
        catch (error) {
            console.log('Error removing user: ', error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "User Management" }), (0, jsx_runtime_1.jsx)("button", { onClick: createUser, children: "Create User" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setPage(page - 1), disabled: page === 1, children: "Previous Page" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setPage(page + 1), children: "Next Page" }), (0, jsx_runtime_1.jsx)("ul", { children: users.map((user) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { onClick: () => removeUser(user.id), children: "Remove" }) }, user.id))) })] }));
};
exports.default = App;
