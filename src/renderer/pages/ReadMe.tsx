export const ReadMe = () => {
  return (
    <div className="w-full m-5">
      <div className="flex flex-col justify-center text-white gap-5">
        <h2 className="text-4xl font-bold mt-5">Covered Functionality</h2>
        <div className="flex flex-col gap-5 mt-2">
          <ul className="list-disc list-inside">
            <li>Search by hitting enter</li>
            <li>Validation on input</li>
            <li>Search by clicking the button search feed</li>
            <li>Save the last 5 searches</li>
            <li>Display the last 5 searches</li>
            <li>By clicking in the last 5 searches, it will search again</li>
            <li>Get more tweets by clicking the button "Load more tweets"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
