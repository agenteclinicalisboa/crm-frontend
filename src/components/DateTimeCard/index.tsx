import { formatTime2 } from '@/app/core/shared/utils';

interface Props {
  item: { time: string; available: boolean };
  selected?: string;
  onSelect: () => void;
}

const DateTimeCard = ({ item, selected, onSelect }: Props) => {
  return (
    <button
      key={item.time}
      className={`rounded-xl p-3 text-center transition-all duration-300 ${
        selected === item.time
          ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
          : item.available
            ? 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
            : 'cursor-not-allowed bg-gray-100 text-gray-400'
      }`}
      disabled={!item.available}
      onClick={() => {
        onSelect();
      }}
    >
      <div className="text-sm font-medium">{formatTime2(item.time)}</div>
    </button>
  );
};

export { DateTimeCard };
