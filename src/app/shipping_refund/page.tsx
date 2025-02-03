export default function ShippingRefundPolicyPage() {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Shipping & Refund Policy</h1>
        <div className="space-y-8 text-lg text-gray-700">
          {/* Shipping Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
            <h3 className="text-xl font-semibold mt-4">Shipping Timeframe</h3>
            <p>We process and ship your orders within 1–2 business days. Delivery times vary based on your location.</p>
            <h3 className="text-xl font-semibold mt-4">Shipping Charges</h3>
            <p>Shipping costs are calculated at checkout based on the delivery address. Free shipping may be available during promotions.</p>
            <h3 className="text-xl font-semibold mt-4">International Shipping</h3>
            <p>We currently offer international shipping with additional charges. Customs duties may apply depending on your country's regulations.</p>
          </div>
  
          {/* Refund Section */}
          <div>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Policy</h2>
            <h3 className="text-xl font-semibold mt-4">Conditions for Returns</h3>
            <p>Items must be in their original condition with intact tags. Products that are visibly used, worn, or returned in poor condition will not qualify for a refund.</p>
            <h3 className="text-xl font-semibold mt-4">Refund for Free Product Deals</h3>
            <p>Orders placed during promotional offers like BOGO (Buy 1 Get 1 Free) or other similar deals that include free products are not eligible for returns or exchanges.</p>
            <h3 className="text-xl font-semibold mt-4">Refund Process</h3>
            <p>Once the return is approved, the refund will be processed within 30 working days to the original payment method.</p>
  
            <h3 className="text-xl font-semibold mt-4">Self-Shipping for Returns</h3>
            <p>If you need to return a product, you will need to ship the product(s) to the following address:</p>
            <p><strong>To G Clothing</strong><br />
              No 1/1 First Street<br />
              Lashme Nagar<br />
              PN Road, Tiruppur - 641602
            </p>
  
            <h4 className="text-lg font-semibold mt-4">Shipping Instructions</h4>
            <ul className="list-disc pl-6">
              <li>Pack the items securely to prevent loss or damage during transit.</li>
              <li>Include your Order ID and registered mobile number on the package.</li>
              <li>Ensure all items are in unused condition with tags and packaging intact.</li>
            </ul>
  
            <h3 className="text-xl font-semibold mt-4">Reporting Damages</h3>
            <p>If the product does not meet standards at delivery, notify us within 1 day via:</p>
            <ul className="list-disc pl-6">
              <li>Instagram DM: @to_g_mob</li>
              <li>WhatsApp: +91 9080560577</li>
            </ul>
            <p>Upon receiving the returned product, our team will inspect it and notify you about refund eligibility. Refunds are processed within 30 working days from confirmation.</p>
          </div>
        </div>
      </div>
    );
  }
  