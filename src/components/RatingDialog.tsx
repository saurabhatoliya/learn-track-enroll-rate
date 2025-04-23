
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: number) => void;
  currentRating: number | null;
  courseName: string;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  currentRating,
  courseName
}) => {
  const [rating, setRating] = useState<number>(currentRating || 70);

  const handleSubmit = () => {
    onSubmit(rating);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate Course: {courseName}</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Your Rating</span>
                <span className="text-sm font-medium">{rating}/100</span>
              </div>
              <Slider
                value={[rating]}
                min={0}
                max={100}
                step={1}
                onValueChange={(values) => setRating(values[0])}
                className="[&>span:first-child]:bg-education"
              />
            </div>
            
            <div className="grid grid-cols-5 text-xs text-center mt-2">
              <div>Very Poor</div>
              <div>Poor</div>
              <div>Average</div>
              <div>Good</div>
              <div>Excellent</div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-education text-white hover:bg-education-hover"
          >
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
