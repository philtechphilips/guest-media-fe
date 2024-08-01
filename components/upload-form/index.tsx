import React from 'react';

interface UploadPageProps {
  setUploadPageActive: () => void; // Proper type for the function
}

const UploadPage: React.FC<UploadPageProps> = ({ setUploadPageActive }) => {
  return (
    <div
      className="fixed top-0 right-0 w-full h-full bg-gray-100 animate-slideInFromRight z-[9999999]"
      onClick={setUploadPageActive}
    >
      UploadPage
    </div>
  );
};

export default UploadPage;
