interface CheckoutStepProps {
  num: number;
  label: string;
  active: boolean;
  done: boolean;
  onClick?: () => void;
}

const CheckoutStep: React.FC<CheckoutStepProps> = ({ num, label, active, done, onClick }) => {
  const getStepClass = () => {
    if (done) return 'step done';
    if (active) return 'step active';
    return 'step';
  };

  return (
    <div className={getStepClass()} onClick={onClick}>
      <div className="step-num">{done ? '✓' : num}</div>
      <div className="step-label">{label}</div>
    </div>
  );
};

export default CheckoutStep;
