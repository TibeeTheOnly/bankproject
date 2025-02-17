/**
 * Bank műveleteit végrehajtó osztály.
 */
export class Bank {

    constructor() {
        this.accounts = new Map();
    }

    /**
     * Új számlát nyit a megadott névvel, számlaszámmal, 0 Ft egyenleggel
     * @param {string} nev A számla tulajdonosának neve. Nem lehet null, nem lehet üres.
     * @param {string} szamlaszam A számla számlaszáma. Nem lehet null, nem lehet üres, egyedinek kell lennie.
     */
    ujSzamla(nev, szamlaszam) {
        if (!nev || !szamlaszam) {
            throw new Error("Name and account number cannot be null or empty");
        }
        if (this.accounts.has(szamlaszam)) {
            throw new Error("Account number must be unique");
        }
        this.accounts.set(szamlaszam, { nev, egyenleg: 0 });
    }

    /**
     * Lekérdezi az adott számlán lévő pénzösszeget
     * @param {string} szamlaszam A számla számlaszáma, aminek az egyenlegét keressük. Nem lehet null, nem lehet üres, léteznie kell.
     * @returns {number} A számlán lévő egyenleg
     */
    egyenleg(szamlaszam) {
        if (!szamlaszam || !this.accounts.has(szamlaszam)) {
            throw new Error("Account number cannot be null, empty, and must exist");
        }
        return this.accounts.get(szamlaszam).egyenleg;
    }
    
    /**
     * Egy létező számlára pénzt helyez
     * @param {string} szamlaszam A számla számlaszáma, amire pénzt helyez. Nem lehet null, nem lehet üres, léteznie kell.
     * @param {number} osszeg A számlára helyezendő pénzösszeg. Csak pozitív egész szám lehet.
     */
    egyenlegFeltolt(szamlaszam, osszeg) {
        if (!szamlaszam || !this.accounts.has(szamlaszam)) {
            throw new Error("Account number cannot be null, empty, and must exist");
        }
        if (typeof osszeg !== 'number' || osszeg <= 0) {
            throw new Error("Amount must be a positive number");
        }
        const account = this.accounts.get(szamlaszam);
        account.egyenleg += osszeg;
        this.accounts.set(szamlaszam, account);
    }

    /**
     * Átutalja a megadott összeget egyik számláról a másikra. Ha a forrás számlán nincs elég összeg, akkor nem történik utalás.
     * @param {string} honnan A forrás számla számlaszáma. Nem lehet null, nem lehet üres, léteznie kell.
     * @param {string} hova A cél számla számlaszáma. Nem lehet null, nem lehet üres, léteznie kell.
     * @param {number} osszeg Az átutalandó egyenleg. Csak pozitív egész szám lehet.
     * @returns {boolean} Az utalás sikeressége. True ha volt elég összeg a forrás számlán, különben false.
     */
    utal(honnan, hova, osszeg) {
        if (!honnan || !hova || !this.accounts.has(honnan) || !this.accounts.has(hova)) {
            throw new Error("Source and destination account numbers cannot be null, empty, and must exist");
        }
        if (typeof osszeg !== 'number' || osszeg <= 0) {
            throw new Error("Amount must be a positive number");
        }
        const sourceAccount = this.accounts.get(honnan);
        const destinationAccount = this.accounts.get(hova);
        if (sourceAccount.egyenleg < osszeg) {
            return false;
        }
        sourceAccount.egyenleg -= osszeg;
        destinationAccount.egyenleg += osszeg;
        this.accounts.set(honnan, sourceAccount);
        this.accounts.set(hova, destinationAccount);
        return true;
    }
}