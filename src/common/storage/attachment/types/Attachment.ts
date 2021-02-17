export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    error?: any;
}

export enum AttachmentType {
    TERMINBEKREFTELSE = 'terminbekreftelse',
    ADOPSJONBEKREFTELSE = 'adopsjonBekreftelse',
}

export enum Skjemanummer {
    TERMINBEKREFTELSE = 'I000062',
    ADOPSJONBEKREFTELSE = 'I000063',
}
