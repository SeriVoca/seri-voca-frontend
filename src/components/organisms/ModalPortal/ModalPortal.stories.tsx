import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalPortal } from './ModalPortal';
import { useModalStore } from '@/store/useModalStore';

const meta: Meta<typeof ModalPortal> = {
  title: 'Organisms/ModalPortal',
  component: ModalPortal,
};

export default meta;
type Story = StoryObj<typeof ModalPortal>;

/* ---------------- helper ---------------- */

function ModalExample({ id }: { id: string }) {
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);

  return (
    <>
      <button onClick={() => open(id)} className="rounded bg-blue-600 px-4 py-2 text-white">
        Open Modal
      </button>

      <ModalPortal id={id}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Modal Title</h2>
          <p className="text-sm text-gray-600">ModalPortal + zustand + portal example</p>

          <div className="flex justify-end gap-2">
            <button onClick={() => close(id)} className="rounded px-3 py-1">
              Cancel
            </button>
            <button onClick={() => close(id)} className="rounded bg-red-500 px-3 py-1 text-white">
              Confirm
            </button>
          </div>
        </div>
      </ModalPortal>
    </>
  );
}

/* ---------------- stories ---------------- */

export const Default: Story = {
  render: () => <ModalExample id="storybook-modal" />,
};

export const MultipleModals: Story = {
  render: () => (
    <div className="flex gap-4">
      <ModalExample id="modal-a" />
      <ModalExample id="modal-b" />
    </div>
  ),
};
