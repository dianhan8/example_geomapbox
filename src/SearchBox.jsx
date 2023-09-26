import { useForm, Controller } from "react-hook-form";

export const SearchBox = ({ onApply }) => {
  const form = useForm();

  return (
    <div>
      <Controller
        name="search"
        control={form.control}
        render={({ field }) => (
          <input
            className="px-4 py-2 text-lg bg-[#e3e3e3] rounded-lg"
            placeholder="Search"
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />

      <button
        className="px-4 py-2 ml-2 bg-green-500 text-white rounded-lg"
        onClick={form.handleSubmit(onApply)}
      >
        Search
      </button>
    </div>
  );
};
