import { describe, it } from "node:test";

describe("ujSzamla", () => {
    it("should create an account without errors", () => {
        const bank = new Bank();
        bank.ujSzamla("John Doe", "12345678-12345678");
    });
});