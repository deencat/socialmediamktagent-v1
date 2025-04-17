import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { WidgetItem } from "./dashboard-grid";
import { cn } from "@/lib/utils";

interface WidgetConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widget: WidgetItem | null;
  onSave: (widgetId: string, config: { width: WidgetItem["width"] }) => void;
}

export function WidgetConfigModal({
  open,
  onOpenChange,
  widget,
  onSave,
}: WidgetConfigModalProps) {
  const [widthValue, setWidthValue] = React.useState<WidgetItem["width"]>(
    widget?.width || "small"
  );

  React.useEffect(() => {
    if (widget) {
      setWidthValue(widget.width);
    }
  }, [widget]);

  const handleSave = () => {
    if (widget) {
      onSave(widget.id, { width: widthValue });
      onOpenChange(false);
    }
  };

  if (!widget) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Widget Configuration</DialogTitle>
          <DialogDescription>
            Customize how this widget appears on your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width
            </Label>
            <Select
              value={widthValue}
              onValueChange={(value: WidgetItem["width"]) => setWidthValue(value)}
            >
              <SelectTrigger id="width" className="col-span-3">
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (1 column)</SelectItem>
                <SelectItem value="medium">Medium (2 columns)</SelectItem>
                <SelectItem value="large">Large (3 columns)</SelectItem>
                <SelectItem value="full">Full width</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            className={cn("mr-2", "border border-input bg-background hover:bg-accent hover:text-accent-foreground")} 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 