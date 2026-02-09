import { ModalContainer } from '@/components/organisms/ModalPortal/ModalContainer';

export type ModalFrameProps = {
  children: React.ReactNode;
  onOverlayClick?: () => void;
};

export const ModalFrame = ({ children, onOverlayClick }: ModalFrameProps) => {
  return (
    <div className="pointer-events-auto flex items-center justify-center sm:w-[360px]">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/30"
        onClick={onOverlayClick}
      />
      <div className="relative">
        <ModalContainer>{children}</ModalContainer>
      </div>
    </div>
  );
};
