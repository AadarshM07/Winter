const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;
    
    return (
      <div
        className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
        style={{
          
          backgroundImage: 'linear-gradient(120deg, rgba(255, 215, 0, 0) 40%, rgba(255, 215, 0, 0.8) 50%, rgba(255, 215, 0, 0) 60%)',  // Golden gradient
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          animationDuration: animationDuration,
        }}
      >
        {text}
      </div>
    );
};

    
export default ShinyText;
    