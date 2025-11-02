import { DateCardSkeleton } from '@/components/DateCard/skeleton';

interface Props {
  item: { value: string; label: string };
  selected?: string;
  onSelect: () => void;
}

const DateCard = ({ item, selected, onSelect }: Props) => {
  return (
    <button
      key={item.value}
      className={`rounded-xl p-3 text-center transition-all duration-300 ${
        selected === item.value
          ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
          : 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
      }`}
      onClick={() => {
        onSelect();
      }}
    >
      <div className="text-sm font-medium">{item.label}</div>
    </button>
  );
};

export { DateCard, DateCardSkeleton };
