export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };