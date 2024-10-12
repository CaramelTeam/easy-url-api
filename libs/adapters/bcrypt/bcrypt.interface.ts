export interface BcryptAdapterInterface {
    encryptString(value: string): string;
    compare(value: string, hash: string): boolean;
}