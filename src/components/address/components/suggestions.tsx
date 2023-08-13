import { Suggestion } from '@/types';
import { Button } from '@nextui-org/button';
import { Skeleton } from '@nextui-org/skeleton';
import { useMemo } from 'react';

type SuggestionsProps = {
  data: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
};

const Suggestions: React.FC<SuggestionsProps> = ({ data, onSelect }) => {
  const items = useMemo(
    () => (
      <div className="flex flex-col items-start gap-2">
        {data.length > 0 &&
          data.map((suggestion) => (
            <Button
              key={suggestion.place_id}
              variant="ghost"
              className="w-full text-ellipsis"
              onClick={() => onSelect(suggestion)}
            >
              <span className="w-full text-left truncate hover:text-clip">
                {suggestion.text}
              </span>
            </Button>
          ))}
        {data.length === 0 &&
          Array.from(Array(5).keys()).map((_, index) => (
            <Skeleton key={index} className="rounded-lg w-full">
              <div className="h-10 rounded-lg bg-default-300"></div>
            </Skeleton>
          ))}
      </div>
    ),
    [onSelect, data]
  );

  return <div>{items}</div>;
};

export default Suggestions;
