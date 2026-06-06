import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import { useAppDispatch } from "../hooks/useRedux";
import { ratingRd as ratingAction } from "../store/slice/getProductSlice.js";
function Range() {
  const [rating, setRating] = useState(3.2);
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(rating, 500);

  useEffect(() => {
    dispatch(ratingAction(rating));
  }, [rating, dispatch, debouncedValue]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-full">
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full accent-amber-500"
        />

        <div
          className="absolute -top-5 -translate-x-1/2"
          style={{
            left: `${(rating / 5) * 100}%`,
          }}
        >
          <div className="relative">
            <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-semibold text-white">
              {rating.toFixed(1)}
            </div>

            <div className="absolute left-1/2 -bottom-0.5 h-1.5 w-1.5 bg-amber-500 rotate-45 -translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Range;
