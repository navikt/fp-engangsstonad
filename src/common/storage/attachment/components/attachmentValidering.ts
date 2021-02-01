import { Attachment } from 'common/storage/attachment/types/Attachment';
import { bytesString } from 'common/util/filesize';

type SkjemaelementFeil = React.ReactNode | boolean;

export const validateAttachmentSize = (attachment: Attachment): SkjemaelementFeil => {
    //const attachments: Attachment = attachment;
    console.log('vas', attachment);
    console.log('vas.fs', attachment);
    console.log('showFileSize from vAS', bytesString(attachment.filesize));
    return undefined;
};
