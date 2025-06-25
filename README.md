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
npm i tw-voucher
```

## Example

### JavaScript
```js
const twVoucher = require("tw-voucher");

/** @type {import("tw-voucher").Voucher} */
twVoucher("เบอร์", "อั่งเปา").then(console.log);
```

### Typescript
```ts
import twVoucher from "tw-voucher";

twVoucher("เบอร์", "อั่งเปา").then(console.log);
```
