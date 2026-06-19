import React, { useState, useEffect } from 'react';

function DocumentHeader() {
  // 1. State for our document
  const [title, setTitle] = useState("Untitled Document");
  const [saveStatus, setSaveStatus] = useState("Saved to cloud");

  // 2. Mocking an auto-save feature when the title changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setSaveStatus("Saving...");
  };

  // Debounce the save status to switch back to "Saved" after 1 second of inactivity
  useEffect(() => {
    if (saveStatus === "Saving...") {
      const timer = setTimeout(() => setSaveStatus("Saved to cloud"), 1000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white shadow-sm font-sans">
      
      {/* ==========================================
          LEFT ZONE: Logo, Title, and Menu
          ========================================== */}
      <div className="flex items-center gap-4">
        
        {/* App Logo Slot */}
        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-xl cursor-pointer">
          D
        </div>

        {/* Document Details */}
        <div className="flex flex-col">
          {/* Editable Title */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="font-medium text-lg text-gray-800 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:bg-white rounded px-2 py-0.5 outline-none transition-all w-64"
            aria-label="Document Title"
          />
          
          {/* Minimalist Menu Bar */}
          <div className="flex gap-1 text-sm text-gray-600 mt-0.5 px-1">
            {['File', 'Edit', 'View', 'Insert', 'Format'].map((item) => (
              <button 
                key={item} 
                className="hover:bg-gray-100 px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          RIGHT ZONE: Status, Actions, and Profile
          ========================================== */}
      <div className="flex items-center gap-5">
        
        {/* Cloud Sync Status Indicator */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
           {saveStatus === "Saving..." ? (
             <span className="flex items-center gap-1">
               <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
               </svg>
               Saving...
             </span>
           ) : (
             <span className="flex items-center gap-1">
               ☁️ {saveStatus}
             </span>
           )}
        </div>

        {/* Collaboration Tools */}
        <div className="flex items-center gap-2">
          <button 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Comment History"
            title="Open comments"
          >
            💬
          </button>
          
          <button className="bg-[#c2e7ff] text-[#001d35] hover:bg-[#b3dcf4] px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2">
            🔒 Share
          </button>
        </div>

        {/* User Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all">
          JS
        </div>
        
      </div>
    </header>
  );
}

export default DocumentHeader;