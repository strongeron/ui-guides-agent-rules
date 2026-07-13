import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const triggerClass =
  'px-4 py-2 rounded-lg text-sm transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function IbelickAccessiblePrimitivesGood() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Open either one, then try Escape, Tab and clicking outside.
      </p>

      {/* Menu: a real Radix Popover. */}
      <Popover>
        <PopoverTrigger className={`${triggerClass} bg-primary text-primary-foreground hover:bg-primary/90`}>
          Open menu
        </PopoverTrigger>
        <PopoverContent align="start" className="w-48 p-2">
          {['Rename', 'Duplicate', 'Delete'].map((item) => (
            <button
              key={item}
              className="w-full text-left px-3 py-2 rounded text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item}
            </button>
          ))}
        </PopoverContent>
      </Popover>

      {/* Modal: a real Radix Dialog, which traps focus and returns it on close. */}
      <Dialog>
        <DialogTrigger className={`${triggerClass} bg-muted hover:bg-muted/80`}>Open modal</DialogTrigger>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>Modal title</DialogTitle>
            <DialogDescription>
              Tab around: focus stays inside. Escape closes it and returns focus to the trigger.
            </DialogDescription>
          </DialogHeader>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full px-3 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <DialogClose className={`${triggerClass} bg-primary text-primary-foreground hover:bg-primary/90`}>
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>

      <p className="text-xs text-success">
        Real primitives: the menu closes on Escape and click-outside, and the modal traps focus and hands it back to
        the trigger. None of that behaviour is hand-written
      </p>
    </div>
  );
}
