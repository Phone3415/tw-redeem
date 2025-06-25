# Redeem อั่งเปา TrueMoney Wallet ด้วย Node.js

 - เขียนขึ้นโดยใช้ Typescript
 - มี Type Safety
 - ไม่ปิดกั้นข้อมูล Response
 - สามารถใช้ได้ทั้งโค๊ดอั่งเปาและ URL
 - ดึงข้อมูลด้วย Regex ป้องกันการ Inject
 - มีฟังชั่นสำหรับ Simplify ข้อมูล Response
 - มีการลองซ้ำกรณีเน็ตช้าหรือระบบล่ม
 - Auto-Complete สำหรับ Ts และ Js

## Installation
```sh
npm i @phone3415/tw-redeem
```

## Example

### JavaScript
```js
const twVoucher = require("@phone3415/tw-redeem");

/** @type {import("@phone3415/tw-redeem").Voucher} */
twVoucher("เบอร์", "อั่งเปา").then(console.log);
```

### Typescript
```ts
import twVoucher from "@phone3415/tw-redeem";

twVoucher("เบอร์", "อั่งเปา").then(console.log);
```
