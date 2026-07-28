import React, { useState, useEffect } from 'react';

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  sources: string[];
  fallbackNode?: React.ReactNode;
  alt?: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export function SmartImage({
  sources,
  fallbackNode,
  alt = 'Image',
  className = '',
  referrerPolicy = 'no-referrer',
  onError,
  ...props
}: SmartImageProps) {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // Réinitialiser l'état si les sources changent
  const sourcesKey = Array.isArray(sources) ? sources.join('|') : '';
  useEffect(() => {
    setCurrentSourceIndex(0);
    setHasFailedAll(false);
  }, [sourcesKey]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Appeler le onError transmis par les props s'il existe
    if (onError) {
      onError(e);
    }

    if (currentSourceIndex < sources.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  if (hasFailedAll || !sources || sources.length === 0) {
    if (fallbackNode) {
      return <>{fallbackNode}</>;
    }
    return (
      <div
        className={`bg-slate-100 flex items-center justify-center text-slate-400 text-xs text-center p-2 rounded-lg ${className}`}
      >
        {alt || 'Image non disponible'}
      </div>
    );
  }

  return (
    <img
      src={sources[currentSourceIndex]}
      alt={alt}
      className={className}
      referrerPolicy={referrerPolicy}
      onError={handleError}
      {...props}
    />
  );
}

