"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcrypt_1 = require("bcrypt");
var cors_1 = require("cors");
var jsonwebtoken_1 = require("jsonwebtoken");
var lowdb_1 = require("lowdb");
// Create a new instance of the LowDB database
var adapter = new lowdb_1.JSONFile('./database.json');
var db = new lowdb_1.Low(adapter);
// Set default values if the database is empty
function initDB() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.read()];
                case 1:
                    _a.sent();
                    db.data || (db.data = { users: [] }); // Set default structure
                    return [4 /*yield*/, db.write()];
                case 2:
                    _a.sent(); // Write defaults to the database
                    return [2 /*return*/];
            }
        });
    });
}
var app = (0, express_1.default)();
var jwtSecretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Initialize the database
initDB();
// Register endpoint
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userExists, hashedPassword, newUser, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                userExists = (_b = db.data) === null || _b === void 0 ? void 0 : _b.users.find(function (user) { return user.email === email; });
                if (userExists) {
                    return [2 /*return*/, res.status(400).json({ message: 'User already exists' })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _d.sent();
                newUser = {
                    id: Date.now(), // Use a more robust ID generation in production
                    email: email,
                    password: hashedPassword,
                };
                // Save user to the database
                (_c = db.data) === null || _c === void 0 ? void 0 : _c.users.push(newUser);
                return [4 /*yield*/, db.write()];
            case 3:
                _d.sent(); // Write to the database
                res.status(201).json({ message: 'User registered successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _d.sent();
                console.error('Error during registration:', error_1);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Log in endpoint
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid, token, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                user = (_b = db.data) === null || _b === void 0 ? void 0 : _b.users.find(function (user) { return user.email === email; });
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isPasswordValid = _c.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid credentials' })];
                }
                token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });
                res.status(200).json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                console.error('Error during login:', error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Verify JWT route
app.post('/verify', function (req, res) {
    var token = req.headers['jwt-token'];
    try {
        var verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        if (verified) {
            res.status(200).json({ status: 'logged in', message: 'success' });
        }
        else {
            res.status(401).json({ status: 'invalid auth', message: 'error' });
        }
    }
    catch (error) {
        res.status(401).json({ status: 'invalid auth', message: 'error' });
    }
});
// Check account existence route
app.post('/check-account', function (req, res) {
    var _a;
    var email = req.body.email;
    var user = (_a = db.data) === null || _a === void 0 ? void 0 : _a.users.find(function (user) { return user.email === email; });
    res.status(200).json({
        status: user ? 'User exists' : 'User does not exist',
        userExists: !!user,
    });
});
// Set up the Express server
var PORT = process.env.PORT || 3080;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
