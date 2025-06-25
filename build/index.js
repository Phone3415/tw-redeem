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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplify = simplify;
var retry_1 = __importDefault(require("./retry"));
/**
 * @typedef {string} BahtAmount
 * @typedef {string} MobileNumber
 * @typedef {string | null} ProfilePicURL
 * @typedef {number} Timestamp
 * @typedef {string} VoucherCode
 */
/**
 * @typedef {Object} TicketInfo
 * @property {MobileNumber} mobile
 * @property {Timestamp} update_date
 * @property {BahtAmount} amount_baht
 * @property {string} full_name
 * @property {ProfilePicURL} profile_pic
 */
/**
 * @typedef {Object} VoucherData
 * @property {string} voucher_id
 * @property {BahtAmount} amount_baht
 * @property {BahtAmount} redeemed_amount_baht
 * @property {number} member
 * @property {string} status
 * @property {VoucherCode} link
 * @property {string} detail
 * @property {Timestamp} expire_date
 * @property {string} type
 * @property {number} redeemed
 * @property {number} available
 */
/**
 * @typedef {Object} Voucher
 * @property {{ message: string, code: string }} status
 * @property {{
 *   voucher: VoucherData,
 *   owner_profile: { full_name: string },
 *   redeemer_profile: { mobile_number: MobileNumber },
 *   my_ticket: TicketInfo,
 *   tickets: TicketInfo[]
 * }} data
 */
/**
 * @typedef {Object} simplifiedVoucher
 * @property {string} owner_full_name
 * @property {number} amount
 * @property {VoucherCode} code
 */
var Invalid;
(function (Invalid) {
    Invalid["NUMBER"] = "INVALID_NUMBER";
    Invalid["VOUCHER"] = "INVALID_VOUCHER";
})(Invalid || (Invalid = {}));
function fetchFailedMessage(response) {
    return "Network Error: ".concat(response.status, " ").concat(response.statusText);
}
function sendAPIRequest(mobile, voucher_hash) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://gift.truemoney.com/campaign/vouchers/".concat(voucher_hash, "/redeem"), {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({
                            mobile: mobile,
                            voucher_hash: voucher_hash,
                        }),
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error(fetchFailedMessage(response));
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
/**
 * ส่งคำขอไปยัง API เพื่อใช้ซองอั่งเปา
 *
 * @param {string} mobileNumber - หมายเลขบัญชี TrueMoney Wallet
 * @param {string} voucherLink - ลิงก์หรือโค้ดซองอั่งเปา
 * @returns {Promise<Voucher>} Promise ที่คืนข้อมูล Voucher
 *
 * @example
 * // ใช้ร่วมกับ @type เพื่อให้มี auto-complete
 * /** @type {Voucher} *\/
 * const result = await redeemVoucher("0382149845", "0197a3ca6ecb7b4aa07632f832159fc982S");
 * console.log(result.data.voucher.voucher_id);
 */
function redeemVoucher(mobileNumber, voucherLink) {
    return __awaiter(this, void 0, void 0, function () {
        var parts, part, matchedPart, voucherCode, jsonResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mobileNumber = mobileNumber.toString().trim();
                    if (mobileNumber.length === 0 || mobileNumber.match(/\D/)) {
                        throw Error(Invalid.NUMBER);
                    }
                    parts = voucherLink.toString().split("v=");
                    part = parts[1] || parts[0];
                    matchedPart = part.match(/[0-9A-Za-z]{35}/);
                    if (!matchedPart)
                        throw Error(Invalid.VOUCHER);
                    voucherCode = matchedPart[0];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, retry_1.default)(function () {
                            return sendAPIRequest(mobileNumber, voucherCode);
                        })];
                case 2:
                    jsonResponse = _a.sent();
                    if (jsonResponse.status.code === "SUCCESS") {
                        return [2 /*return*/, jsonResponse];
                    }
                    throw Error(jsonResponse.status.code);
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * ย่อการตอบกลับจาก API เพื่อให้ใช้งานง่ายขึ้น
 *
 * @param {Voucher} voucher - ผลลัพธ์สุดท้ายที่ได้จาก redeemVoucher
 * @returns {simplifiedVoucher} ข้อมูล Voucher แบบย่อ
 *
 * @example
 * const response = await redeemVoucher("0382149845", "0197a3ca6ecb7b4aa07632f832159fc982S");
 *
 * // ใช้ร่วมกับ @type เพื่อให้มี auto-complete
 * /** @type {simplifiedVoucher} *\/
 * const result = simplify(response);
 * console.log(result.owner_full_name);
 */
function simplify(voucher) {
    var data = voucher.data;
    return {
        owner_full_name: data.owner_profile.full_name,
        amount: Number(data.my_ticket.amount_baht),
        code: data.voucher.link,
    };
}
exports.default = redeemVoucher;
