import React from 'react';

const useTypingEffect = (words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) => {
  const [text, setText] = React.useState('');
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  React.useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) setTimeout(() => setIsDeleting(true), pauseTime);
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === '') { setIsDeleting(false); setWordIndex((i) => (i + 1) % words.length); }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);
  return text;
};

export default useTypingEffect;
