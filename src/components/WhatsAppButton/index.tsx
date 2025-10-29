import { FaWhatsapp } from "react-icons/fa";

type WhatsAppButtonProps = {
  message?: string;
  children?: React.ReactNode;
  size: number;
  classes: string;

}

export function WhatsAppButton({
  message = "", 
  children = "",
  size,
  classes 
} : WhatsAppButtonProps) {
  const phone = "5561982134990"
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Botão de contato para o whatsapp"
      className={`bg-green-500 ${classes} items-center border-green-900 border-2 hover:opacity-80 transition gap-2 rounded-4xl inline-flex`}
    >
      <FaWhatsapp size={size} aria-hidden="true"  className="text-slate-50"/>
      {children}
    </a>
  );
}