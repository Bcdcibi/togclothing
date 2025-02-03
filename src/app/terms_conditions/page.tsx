import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <h2 className="text-2xl font-semibold mt-4">Bank Details for Refunds</h2>
        <p>The customer is responsible for providing accurate bank account details for refunds. Top G is not liable for errors in the provided details.</p>
        <h2 className="text-2xl font-semibold mt-4">Delivery Confirmation</h2>
        <p>If you’ve received a delivery confirmation but haven’t received the package, report it within 24 hours.</p>
        <h2 className="text-2xl font-semibold mt-4">Changes to Terms</h2>
        <p>We reserve the right to modify these Terms and Conditions at any time without prior notice.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
