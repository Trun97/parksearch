import './CheckboxItem.css';

function CheckboxItem({ label, value, checked, onChange }) {
    return (
        <label className="items">
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
}

export default CheckboxItem;
