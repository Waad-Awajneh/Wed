function Checkbox(props) {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          id="customCheckLogin"
          type="checkbox"
          className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
          style={{ transition: "all .15s ease" }}
        />
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {props.data}
        </span>
      </label>
    </div>
  );
}

export default Checkbox;
