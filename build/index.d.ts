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
declare function redeemVoucher(mobileNumber: MobileNumber, voucherLink: string): Promise<Voucher>;
export declare function simplify(voucher: Voucher): simplifiedVoucher;
export default redeemVoucher;
