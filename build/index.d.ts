export type BahtAmount = string;
export type MobileNumber = string;
export type ProfilePicURL = string | null;
export type Timestamp = number;
export type VoucherCode = string;
export interface TicketInfo {
    mobile: MobileNumber;
    update_date: Timestamp;
    amount_baht: BahtAmount;
    full_name: string;
    profile_pic: ProfilePicURL;
}
export interface VoucherData {
    voucher_id: string;
    amount_baht: BahtAmount;
    redeemed_amount_baht: BahtAmount;
    member: number;
    status: string;
    link: VoucherCode;
    detail: string;
    expire_date: Timestamp;
    type: string;
    redeemed: number;
    available: number;
}
export interface Voucher {
    status: {
        message: string;
        code: string;
    };
    data: {
        voucher: VoucherData;
        owner_profile: {
            full_name: string;
        };
        redeemer_profile: {
            mobile_number: MobileNumber;
        };
        my_ticket: TicketInfo;
        tickets: TicketInfo[];
    };
}
export interface simplifiedVoucher {
    owner_full_name: string;
    amount: number;
    code: VoucherCode;
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
declare function redeemVoucher(mobileNumber: MobileNumber, voucherLink: string): Promise<Voucher>;
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
export declare function simplify(voucher: Voucher): simplifiedVoucher;
export default redeemVoucher;
