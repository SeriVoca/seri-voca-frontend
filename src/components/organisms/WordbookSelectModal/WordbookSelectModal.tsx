import type { Wordbook } from '@/domain/wordbook';
import { ModalPortal } from '../ModalPortal/ModalPortal';
import { WordbookSelectModalContent } from './WordbookSelectModalContent';

export type WordbookSelectModalProps = {
  id: string;
  wordbooks: Wordbook[];
  handleSelectTargetWordbook: (wordbook: Wordbook) => Promise<void> | void;
};

export const WordbookSelectModal = ({
  id: wordbookSelectModalId,
  wordbooks: myWordbooks,
  handleSelectTargetWordbook,
}: WordbookSelectModalProps) => {
  return (
    <ModalPortal id={wordbookSelectModalId}>
      <WordbookSelectModalContent
        wordbooks={myWordbooks}
        handleSelectTargetWordbook={handleSelectTargetWordbook}
      />
    </ModalPortal>
  );
};
