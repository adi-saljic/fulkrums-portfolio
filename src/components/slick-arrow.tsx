export function SlickNextArrow(props: any) {
  const { className, onClick, disabled } = props;
  return (
    <button
      type="button"
      className={`${className} slick-next`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        border: '2px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <i className="fa-light fa-angle-right"></i>
    </button>
  );
}

export function SlickPrevArrow(props: any) {
  const { className, onClick, disabled } = props;
  return (
    <button
      type="button"
      className={`${className} slick-prev`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        border: '2px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <i className="fa-light fa-angle-left"></i>
    </button>
  );
}
