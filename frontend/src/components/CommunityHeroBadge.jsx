function CommunityHeroBadge({ since, size = 'medium' }) {
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  const iconSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div 
      className={`inline-flex items-center ${sizeClasses[size]} bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-semibold shadow-lg`}
      title={`Community Hero${since ? ` since ${new Date(since).toLocaleDateString()}` : ''}`}
    >
      <span className={`mr-1 ${iconSize[size]}`}>🛡️</span>
      <span>Community Hero</span>
    </div>
  );
}

export default CommunityHeroBadge;
