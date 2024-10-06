interface IButton {
  onClick?: () => void;
  buttonType: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ onClick, buttonType, children }: IButton) {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonType === 'secondary' ? 'btn--secondary' : ''}`}
    >
      {children}
    </button>
  );
}
