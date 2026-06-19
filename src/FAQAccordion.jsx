import { useState } from 'react';

export default function FAQAccordion() {
  // We store the INDEX of the currently open panel. 
  // If null, all panels are closed.
  const [openPanels, setOpenPanels] = useState([]);

  const faqs = [
    { question: "What is React?", answer: "A JavaScript library for building UIs." },
    { question: "What is an Accordion?", answer: "A collapsible UI component." },
    { question: "How does state work?", answer: "It holds data that changes over time." }
  ];

  // const handleToggle = (index) => {
  //   // If the user clicks the panel that is ALREADY open, we close it by setting state to null.
  //   // Otherwise, we set the state to the new index to open it.
  //   if (activeIndex === index) {
  //     setActiveIndex(null);
  //   } else {
  //     setActiveIndex(index);
  //   }
  // };

  const handleToggle = (clickedIndex) => {
    // 2. Check if the clicked panel is already in our list of open panels
    if (openPanels.includes(clickedIndex)) {
      // If it IS open, we close it by filtering it out of the array
      setOpenPanels(openPanels.filter((index) => index !== clickedIndex));
    } else {
      // If it is NOT open, we add it to the array, keeping the existing ones open
      setOpenPanels([...openPanels, clickedIndex]);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Frequently Asked Questions</h2>
      
      {faqs.map((faq, index) => {
        // 3. We check if THIS specific panel's index is currently inside our array
        const isOpen = openPanels.includes(index);

        return (
          <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
            <button 
              onClick={() => handleToggle(index)}
              style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '10px', 
                fontSize: '16px', 
                cursor: 'pointer',
                background: '#f4f4f4',
                border: 'none',
                textAlign: 'left'
              }}
            >
              {faq.question}
              <span>{isOpen ? '-' : '+'}</span>
            </button>

            {/* Conditionally render based on the new boolean */}
            {isOpen && (
              <div style={{ padding: '10px', background: '#fafafa', color: '#555' }}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}