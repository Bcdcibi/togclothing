export default function DeliveryInfoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Delivery Information</h1>
      <div className="space-y-8 text-lg text-gray-700">
        
        {/* Shipping Timeframe Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Timeframe</h2>
          <p>We process and ship orders within 1–2 business days from the time of purchase. Delivery times vary based on your location and shipping method selected at checkout.</p>
        </div>

        {/* Shipping Charges Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Charges</h2>
          <p>Shipping charges are calculated at checkout based on the delivery address, weight, and size of the package. We also offer free shipping during certain promotions or for orders above a specific amount.</p>
        </div>

        {/* International Shipping Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
          <p>We offer international shipping to most countries. Please note that international orders may incur additional duties or customs fees, which are the responsibility of the recipient. Shipping costs and delivery times for international orders will be calculated during checkout.</p>
        </div>

        {/* Delivery Process Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">How We Deliver</h2>
          <p>Once your order has been dispatched, we will send you an email with tracking information. You can track the status of your delivery on the carrier&apos;s website.</p> {/* Escape apostrophe */}
        </div>

        {/* Issues with Delivery Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Issues with Delivery</h2>
          <p>If you encounter any issues with your delivery, such as damaged goods or delays, please contact us immediately within 24 hours of receiving the package. You can reach us via:</p>
          <ul className="list-disc pl-6">
            <li>Instagram DM: <strong>@to_g_mob</strong></li>
            <li>WhatsApp: <strong>+91 9080560577</strong></li>
          </ul>
          <p>We&apos;ll work to resolve any issues and ensure you have a smooth shopping experience.</p> {/* Escape apostrophe */}
        </div>
        
        {/* Address Details for Returns Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Address for Returns</h2>
          <p>If you need to return an item, please send it to the following address:</p>
          <p><strong>To G Clothing</strong><br />
            No 1/1 First Street<br />
            Lashme Nagar<br />
            PN Road, Tiruppur - 641602
          </p>
        </div>
      </div>
    </div>
  );
}
