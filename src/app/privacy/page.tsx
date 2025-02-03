import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information.</p>
        <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
        <p>We collect personal information such as your name, address, phone number, and email for the purpose of fulfilling orders and communicating with you.</p>
        <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2>
        <p>Your information is used solely for processing your orders and improving our services. We do not share your data with third parties unless required by law.</p>
        <h2 className="text-2xl font-semibold mt-4">Data Protection</h2>
        <p>We take reasonable measures to protect your data. However, we cannot guarantee complete security due to the nature of the internet.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
