export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-pomoblue-600 shadow-sm focus:ring-pomoblue-500 ' +
                className
            }
        />
    );
}
