export default function ApplicationLogo({ className = '' }) {
    return (
        // Substituímos o SVG cubico pela sua logo real
        <img
            src="/images/logo.png"
            alt="PomoTDL Logo"
            className={`h-20 w-auto ${className}`} // Usamos a className que o Layout passar (geralmente h-20)
        />
    );
}