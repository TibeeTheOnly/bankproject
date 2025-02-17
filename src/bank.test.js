import { describe, it } from "vitest";
import { Bank } from "./bank.js";
import { expect } from "vitest";

describe("ujSzamla", () => {
    it("should create an account without errors", () => {
        const bank = new Bank();
        bank.ujSzamla("John Doe", "12345678-12345678");
    });

    it("should have zero balance after creation", () => {
        const bank = new Bank();
        bank.ujSzamla("John Doe", "12345678-12345678");
        expect(bank.egyenleg("12345678-12345678")).toBe(0);
    });

    it("should throw error on invalid accounts", () => {
        const bank = new Bank();
        expect(() => bank.ujSzamla(null, "12345678-12345678")).toThrowError("Name and account number cannot be null or empty");
        expect(() => bank.ujSzamla("John Doe", null)).toThrowError("Name and account number cannot be null or empty");
        expect(() => bank.ujSzamla("", "12345678-12345678")).toThrowError("Name and account number cannot be null or empty");
        expect(() => bank.ujSzamla("John Doe", "")).toThrowError("Name and account number cannot be null or empty");
    });

    it("should throw error on duplicate account numbers", () => {
        const bank = new Bank();
        bank.ujSzamla("John Doe", "12345678-12345678");
        expect(() => bank.ujSzamla("Jane Doe", "12345678-12345678")).toThrowError("Account number must be unique");
    });

    it("should throw error on invalid account number", () => {
        const bank = new Bank();
        expect(() => bank.egyenleg(null)).toThrowError("Account number cannot be null, empty, and must exist");
        expect(() => bank.egyenleg("")).toThrowError("Account number cannot be null, empty, and must exist");
        expect(() => bank.egyenleg("12345678-12345678")).toThrowError("Account number cannot be null, empty, and must exist");
    });
        
    it("should add balance to account", () => {
        const bank = new Bank();
        bank.ujSzamla("John Doe", "12345678-12345678");
        bank.egyenlegFeltolt("12345678-12345678", 1000);
        expect(bank.egyenleg("12345678-12345678")).toBe(1000);
    });

    it("should throw error on invalid amount", () => {
        const bank = new Bank();
        bank.ujSzamla("John Doe", "12345678-12345678");
        expect(() => bank.egyenlegFeltolt("12345678-12345678", null)).toThrowError("Amount must be a positive number");
        expect(() => bank.egyenlegFeltolt("12345678-12345678", -1000)).toThrowError("Amount must be a positive number");
        expect(() => bank.egyenlegFeltolt("12345678-12345678", 0)).toThrowError("Amount must be a positive number");
    });

    it("should transfer balance between accounts", () => {
        const bank = new Bank();
        bank.ujSzamla("John Doe", "12345678-12345678");
        bank.ujSzamla("Jane Doe", "87654321-87654321");
        bank.egyenlegFeltolt("12345678-12345678", 1000);
        bank.utal("12345678-12345678", "87654321-87654321", 500);
        expect(bank.egyenleg("12345678-12345678")).toBe(500);
        expect(bank.egyenleg("87654321-87654321")).toBe(500);
    });

});