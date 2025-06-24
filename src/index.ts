import retry from "./retry";

export type BahtAmount = string;
export type MobileNumber = string;
export type ProfilePicURL = string | null;
export type Timestamp = number;

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
  link: string;
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

enum Invalid {
  NUMBER = "INVALID_NUMBER",
  VOUCHER = "INVALID_VOUCHER",
}

function fetchFailedMessage(response: Response): string {
  return `Network Error: ${response.status} ${response.statusText}`;
}

async function sendAPIRequest(
  mobile: MobileNumber,
  voucher_hash: string
): Promise<Voucher> {
  const response = await fetch(
    `https://gift.truemoney.com/campaign/vouchers/${voucher_hash}/redeem`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mobile,
        voucher_hash,
      }),
    }
  );

  if (!response.ok) throw new Error(fetchFailedMessage(response));

  return response.json();
}

async function redeemVoucher(
  mobileNumber: MobileNumber,
  voucherLink: string
): Promise<Voucher> {
  mobileNumber = mobileNumber.toString().trim();
  if (mobileNumber.length === 0 || mobileNumber.match(/\D/)) {
    throw Error(Invalid.NUMBER);
  }

  //link: https://gift.truemoney.com/campaign/?v=0197a3ca6ecb7b4aa07632f832159fc982S
  const parts: string[] = voucherLink.toString().split("v=");
  const part: string = parts[1] || parts[0];

  const matchedPart: RegExpMatchArray | null = part.match(/[0-9A-Za-z]{35}/);
  if (!matchedPart) throw Error(Invalid.VOUCHER);

  const voucherCode: string = matchedPart[0];

  try {
    const jsonResponse = await retry(() =>
      sendAPIRequest(mobileNumber, voucherCode)
    );

    if (jsonResponse.status.code === "SUCCESS") {
      return jsonResponse;
    }

    throw Error(jsonResponse.status.code);
  } catch (error) {
    throw error;
  }
}

export default redeemVoucher;
