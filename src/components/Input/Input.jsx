import './Input.css'

function Input({ type = "text", name, value, onChange }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        />
    );
}

export default Input;
