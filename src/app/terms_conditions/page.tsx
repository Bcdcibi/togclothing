import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <div className="space-y-8 text-gray-700">
        <p className="text-sm mb-8">Last updated on 07-02-2025 18:06:44</p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Use of Website and Services</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>To access and use our Services, you agree to provide true, accurate, and complete information during registration and ensure responsible account use.</li>
            <li>No warranties or guarantees are provided regarding the accuracy, timeliness, or completeness of website content or Services.</li>
            <li>Your use of Services is at your own risk, and you&apos;re responsible for assessing if they meet your needs.</li>
            <li>All website content and Services are proprietary - you obtain no rights to our intellectual property.</li>
            <li>Unauthorized use may lead to legal action.</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Payments and Refunds</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>You agree to pay all charges associated with Services.</li>
            <li>Refunds may be available if we cannot provide the Service within specified timelines.</li>
            <li>Failure to claim refunds within the stipulated time makes you ineligible.</li>
            <li>Customers must provide accurate bank details - <strong>Togclothing</strong> is not liable for errors in provided details.</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Prohibited Activities</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>No unlawful use of website/Services as per Indian or local laws.</li>
            <li>Third-party links are governed by their own terms and policies.</li>
            <li>Initiating a transaction creates a legally binding contract.</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Delivery Confirmation</h2>
          <p>Report missing packages within <strong>24 hours</strong> of delivery confirmation.</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Force Majeure</h2>
          <p>We&apos;re not liable for failures due to events beyond our reasonable control.</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Governing Law</h2>
          <p>Governed by Indian law, with exclusive jurisdiction in Tiruppur, Tamil Nadu courts.</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Changes to Terms</h2>
          <p>We may modify these Terms at any time without notice.</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p>Reach out using contact details provided on our website for any queries.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
